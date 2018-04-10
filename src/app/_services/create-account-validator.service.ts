import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { checkEmailURL } from './data.service';
import { checkUserNameURL } from './data.service';

@Injectable()
export class CreateAccountValidatorService {

  private timeout;

  constructor(private readonly http: HttpClient) { }

  isUsernameTaken(value: string) {
    return this.http.get<boolean>(checkUserNameURL +'?value=' + value);
  }

  isEmailTaken(value: string) {
    return this.http.get<boolean>(checkEmailURL +'?value='+ value);
  }


}
