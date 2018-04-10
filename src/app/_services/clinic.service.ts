import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ClinicData} from '../_models/clinic-data';

import { storeClinicRequestsURL, getUpcomingClinicsURL,getPastClinicsURL ,updateClinicRequestStatCdURL} from './data.service';
import { getStoreClinicRequestDataURL } from './data.service';
import { getStoreClinicRequestDataConfirmedURL } from './data.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ClinicService {

  formValid: boolean = true;
  selectedClinicType = '';  // URL to web api
  updatedVaccinationList = [];
  selectedUserType = '';
  selectedClinicReqquestType = '';
  

  constructor(
    private http: HttpClient
  ) { }

  getAllUpcomingClinics(userid:string) {
    console.log("getAllUpcomingClinics....Service call.");
    console.log(getUpcomingClinicsURL);
    return this.http.get(getUpcomingClinicsURL+'?value='+ userid).map((res: Response) => res);
    
  }
  getAllPastClinics(userid:string) {
    
    return this.http.get(getPastClinicsURL+'?value='+ userid).map((res: Response) => res);
  }
  getClinicRequests(portalURLParams :string , status :string){
    console.log(storeClinicRequestsURL + '?' + portalURLParams);
   return this.http
      .get(storeClinicRequestsURL + '?' + portalURLParams +'&status=' + status).map((res: Response) => res); 
 }

    getStoreClinicRequestData(portalURLParams :string , status: string){
    console.log(getStoreClinicRequestDataURL +'?clinic_id=' + portalURLParams);
    return this.http.get(getStoreClinicRequestDataURL +'?clinic_id=' + portalURLParams +'&status=' + status)
      .map(data => {
        debugger;
        console.log(data);
        return data;
      });
  }


   updateClinicRequestStatCd(data: ClinicData){
     debugger;
     console.log("updating status and pharma info");
     console.log(data);
     return this.http.post(updateClinicRequestStatCdURL , data).map((res: Response) => res);

   }
     getStoreClinicRequestDataConfirmed(portalURLParams :string){
    console.log(getStoreClinicRequestDataConfirmedURL +'?clinic_id=' + portalURLParams);
    return this.http.get(getStoreClinicRequestDataConfirmedURL +'?clinic_id=' + portalURLParams )
      .map(data => {
        console.log(data);
        return data;
      });
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


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/