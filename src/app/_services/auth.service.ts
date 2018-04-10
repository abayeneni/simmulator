import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { loginURL } from './data.service';
import { getUserRoleURL } from './data.service';
import { forgotPwdURL } from './data.service';

@Injectable()
export class AuthService {
  
  public userId = '';
  public storeId ='';
  public corp_userId = '';
  public dl_userId = '';
  public clinicID = '';
  public user ='';
  constructor(private http: HttpClient) { }

  login(userId: string, password: string) {

    return this.http.post<any>(loginURL, { userId: userId, password: password })
      .map(user => {
        console.log(user);
        return user;
      });

  }

  forgotPwd(userId: string) {
    
      return  this.http.get<any>(forgotPwdURL +'?value='+ userId);
   }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  
      userAuthentication(portalURLParams :string){
    //return this.http.get<boolean>(checkUserNameURL +'?value=' + value);
  /// var params = '?user_ard=' + user_ard + '&user_firstname=' + user_firstname + '&user_lastname=' + user_lastname + '&user_role=' + user_rolename + '&user_firstname=' + user_firstname +
    // ("portalURLParams " + user_ard );
		// ("portalURLParams " + user_firstname );
		// ("portalURLParams " + user_lastname );
		// ("portalURLParams " + user_role );
		// System.out.println("portalURLParams " + user_id );
		// System.out.println("portalURLParams " + store_id );
    console.log(getUserRoleURL +'?user_ard=' + portalURLParams);
    return this.http.get(getUserRoleURL +'?' + portalURLParams )
      .map(userRole => {
        console.log(userRole);
        return userRole;
      });
  }
}