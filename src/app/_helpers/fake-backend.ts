import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { State } from '../_models/state';

import { TableData } from './demo-data';
import { CancelledClinics } from './cancelled-clinics';
import { PastClinics } from './past-clinics';
import { ClinicData } from '../_models/clinic-data';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {
            console.log("Here.. " + request.url);
            if (request.url.match(/\/CVS\/getStoreClinicRequestData/) && request.method === 'GET') {
                let data: ClinicData = new ClinicData();
                data.userType = "E";
                data.contactFullName = "Ding Dong";
                return Observable.of(new HttpResponse({ status: 200, body: data }));
            }

            if (request.url.match(/\/ClinicSummary\/getallClinics\/upcomingclinics/) && request.method === 'GET') {
                return Observable.of(new HttpResponse({ status: 200, body: TableData }));
            }

            if (request.url.match(/\/CreateClinic\/CVS\/getClientTypeVaccination/) && request.method === 'GET') {
                let vaccList = ['Pneumovax 23 (Pneumonia)',
                'Prevnar 13 (Pneumonia)',
                'Boostrix (Tdap)',
                'Zostavax (Shingles)',
                'Shingrix (Shingles)'];
                return Observable.of(new HttpResponse({ status: 200, body: vaccList }));
            }

            if (request.url.match(/\/CVS\/getStoreClinicRequests/) && request.method === 'GET') {
                return Observable.of(new HttpResponse({ status: 200, body: TableData }));
            }

            if (request.url.match(/\/CreateClinic\/getCorporateClinicRequests/) && request.method === 'GET') {
                return Observable.of(new HttpResponse({ status: 200, body: TableData }));
            }

            if (request.url.match(/\/CreateClinic\/getDistrictLeaderData/) && request.method === 'GET') {
                return Observable.of(new HttpResponse({ status: 200, body: TableData }));
            }

            if(request.url.match(/\/getallClinics\/upcomingclinics/)  && request.method === 'GET') {
                return Observable.of(new HttpResponse({ status: 200, body: TableData }));
            }

            if (request.url.match(/\/CVS\/getClinicRequests/) && request.method === 'GET') {
                return Observable.of(new HttpResponse({ status: 200, body: TableData }));
            }
            if (request.url.endsWith('/CVS/getCancelledClinicRequests') && request.method === 'GET') {
                return Observable.of(new HttpResponse({ status: 200, body: CancelledClinics }));
            }
            if (request.url.endsWith('/CVS/getPastClinicRequests') && request.method === 'GET') {
                return Observable.of(new HttpResponse({ status: 200, body: PastClinics }));
            }
            
            if (request.url.match(/\/employer\/checkUsername/) && request.method === 'GET') {
                // find user by id in users array
                let urlParts = request.url.split('/');
                let lastPart = urlParts[urlParts.length - 1];
                let value = lastPart.split("?")[1].split("=")[1];
                let duplicateUser = users.filter(user => { return user.userId === value }).length;
                if (duplicateUser) {
                    return Observable.of(new HttpResponse({ status: 200, body: true }));
                }
                return Observable.of(new HttpResponse({ status: 200, body: false }));
            }

            if (request.url.endsWith('/CVS/getStatesList') && request.method === 'GET') {
                let states: State[] =
                    [new State(1, 'Arizona'),
                    new State(2, 'Alaska'),
                    new State(3, 'Florida'),
                    new State(4, 'Hawaii')];
                return Observable.of(new HttpResponse({ status: 200, body: states }));
            }

            // authenticate
            if (request.url.endsWith('/CVS/login') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.userId === request.body.userId && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        userId: user.userId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };

                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return Observable.throw('UserID or password is incorrect');
                }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            // get user by id
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return Observable.of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            // create user
            if (request.url.endsWith('/employer/createAccount') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body.param1;

                console.log(newUser);

                // validation
                let duplicateUser = users.filter(user => { return user.userId === newUser.userId; }).length;
                if (duplicateUser) {
                    return Observable.throw('UserID "' + newUser.userId + '" is already taken');
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return Observable.of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            // pass through any requests not handled above
            return next.handle(request);

        })

            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .materialize()
            .delay(500)
            .dematerialize();
    }
}

export let FakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};