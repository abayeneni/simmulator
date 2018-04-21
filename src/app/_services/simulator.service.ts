import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';


import {storeFeedURL} from './data.service';


@Injectable()
export class SimulatorService {

  formValid: boolean = true;
  selectedClinicType = '';  // URL to web api
  updatedVaccinationList = [];
  selectedUserType = '';
  selectedClinicReqquestType = '';


  constructor(private http: HttpClient) {
  }

  addMultipleClinics(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http
      .post(storeFeedURL, JSON.stringify(data), httpOptions).map((res: Response) => res);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      //   // TODO: better job of transforming error for user consumption
      //   this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
