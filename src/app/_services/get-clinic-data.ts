import { Injectable } from '@angular/core';

import {ClinicData} from '../_models/clinic-data';
import { HttpClient, HttpHeaders} from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/Rx';
import { getClinicData } from './data.service';
import { ClinicDataView } from '../_models/clinic-data-view';


@Injectable()
export class ClinicDataService {

  private timeout;
 
  constructor(private readonly http: HttpClient) { }

  getClinicdetails(id:string) {
    return this.http.get<ClinicDataView>(getClinicData+'?value='+ id);
    
  }


  

 


}
