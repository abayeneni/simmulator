import { Injectable } from '@angular/core';
import { EmployerDetail } from '../_models/employer-detail';
import { UserDetail } from '../_models/user-detail';
import {Observable} from 'rxjs/Observable';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { FormControl,AbstractControl } from '@angular/forms'; 
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { checkEmailforUpdateURL } from './data.service';
import { getEmployerURL } from './data.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AccountService {
 
 
  constructor(private readonly http: HttpClient) { }


          isEmailTaken(value: string,name: string) {
    return this.http.get<boolean>(checkEmailforUpdateURL +'?value=' + value+'&name='+ name);
  }
  

getuserdetails(id:string) {
  return this.http.get<EmployerDetail>(getEmployerURL+'?value='+ id);
  
}




     
  }
