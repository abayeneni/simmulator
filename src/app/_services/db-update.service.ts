import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClinicData} from '../_models/clinic-data';
import { ClinicDataView} from '../_models/clinic-data-view';
import { EmployerDetail } from '../_models/employer-detail';
import {ClinicSummary} from '../_models/clinic-summary';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { corporateURL } from './data.service';
import { clinicURL } from './data.service';
import { createAccountURL } from './data.service';
import { editAccountURL } from './data.service';
import {getUpcomingClinicsURL} from './data.service';
import {updateclinicURL} from './data.service';

@Injectable()
export class DbUpdateService {

  constructor(private http: HttpClient) { }

  createAccount(employer:EmployerDetail) {
    console.log("Creating New Account..");
    console.log(employer);
    debugger;
    return this.http.post(createAccountURL, employer);
  }
  editAccount(employer: EmployerDetail) {
    console.log("Updating Account..");
    console.log(employer);
    debugger;
    return this.http.post(editAccountURL, employer);
  }


  addClinic(data: ClinicData) {
    console.log("Adding Store Clinic..");
    console.log(data);

    return this.http
      .post(clinicURL, data).map((res: Response) => res);
  }
  //  addClientClinic(data: ClinicData) {
  //   console.log("Adding Store Clinic..");
  //   console.log(data);

  //   return this.http
  //     .post(clinicURL, data).map((res: Response) => res);
  // }
  updateClinic(data: ClinicDataView) {
    console.log("Adding Store Clinic..");
    console.log(data);

    return this.http
      .post(updateclinicURL, data).map((res: Response) => res);
  }
  addCorporate(data: ClinicData) {
    console.log("Adding Corporate Clinic..");
    debugger;
    return this.http
      .post(corporateURL, data).map((res: Response) => res); //corporateURL 
  }

  getAllClinics(userid:string,data:string) : Observable<ClinicSummary[]>{

  
    
      return this.http.get<ClinicSummary[]>(getUpcomingClinicsURL+'?value='+ userid);
    
 
   
  }


  /**
   *
   * @return {any}- List of Tenants
   */
//   getTenants(start: number, limit: number, currentpage: number) {
//     let tenantURL = tenantUrl + '?action=read&searchfld=' + '&limit=' + limit + '&start=' + start + '&page=' + currentpage;
//     return this.http.get(tenantURL)
//       .map((res: Response) => res.json()
//       );
//   }
//   getTenantsBySearchFiled(searchField: string) {
//     let tenantURL = tenantUrl + '?action=read&searchfld=' + searchField + '&limit=1000';
//     return this.http.get(tenantURL)
//       .map((res: Response) => res.json()
//       );
//   }


//   editTenant(data: URLSearchParams) {
//     return this.http
//       .post(tenantUrl, data).map((res: Response) => res
//       );
//   }
}
