import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import {ClinicData} from '../_models/clinic-data';
import { HttpClient, HttpHeaders} from '@angular/common/http';
//import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/Rx';
import { getVaccinationByClientTypeURL } from './data.service';


@Injectable()
export class ClientTypeVaccinationService {

  private timeout;
  //listarr=["Pneumovax 23 (Pneumonia)","Prevnar 13 (Pneumonia)","Boostrix (Tdap)","Zostavax (Shingles)","Shingrix (Shingles)"];
  constructor(private readonly http: HttpClient) { }

  getVaccinationList(clientType: string) {
    // console.log("inside getVaccinationlist"+clientType);
    // //return this.http.get<ClinicData>("" +'?value=' + clientType);
    // return this.listarr;
    console.log("inside list");
    let vacc:string[];
   return this.http
    .get(getVaccinationByClientTypeURL+'?value=SL').map((res: Response) => res);
    
    // subscribe(data => {
    //   let responseJson = data.json();
    //   console.log("Inside Response.....");
    //   console.log(responseJson);});



  }

 


}
