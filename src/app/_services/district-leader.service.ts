import { Injectable } from '@angular/core';
import { EmployerDetail } from '../_models/employer-detail';
import { UserDetail } from '../_models/user-detail';
import {Observable} from 'rxjs/Observable';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { FormControl,AbstractControl } from '@angular/forms'; 
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { getDistrictLeaderData } from './data.service';
import { getCorporateDataURL } from './data.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DistrictLeaderService {
 
 public external_URLParams : string;
 constructor(private http: HttpClient) { }

 getCorporateData(status :string){

   return this.http.get(getCorporateDataURL +'?status=' + status)
      .map(data => {
        console.log(data);
        return data;
      });

 }

//  getCorporatePastClinicData(){

//     return this.http.get(getCorporatePastDataURL)
//       .map(data => {
//         console.log(data);
//         return data;
//       });

//  }

//   getCorporateCancelledClinicData(){

//     return this.http.get(getCorporateCancelledDataURL)
//       .map(data => {
//         console.log(data);
//         return data;
//       });

//  }

  getDistictLeaderData(portalURLParams : string , status:string){

      console.log(getDistrictLeaderData +'?user_ard=' + portalURLParams +'&status=' + status);
    return this.http.get(getDistrictLeaderData +'?' + portalURLParams +'&status=' + status )
      .map(data => {
        console.log(data);
        return data;
      });
//    return this.http
//       .get(getDistrictLeaderData).map((res: Response) => res); 
 }
     
  }
