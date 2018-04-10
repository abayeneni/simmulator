import {Router, NavigationEnd, ActivatedRoute, Params} from '@angular/router';
import {OnInit, Component} from '@angular/core';
import 'rxjs/add/operator/filter';
import {DOCUMENT} from '@angular/common';

import { AuthService } from './_services/auth.service';
import { DistrictLeaderService } from './_services/district-leader.service';
import { role_portalUser } from './_models/roles';
import { role_corporateUser } from './_models/roles';


@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html'
})
export class AppComponent {

  title = 'app';
  portalURL : string;
  isRedirected = false;
  // params: {
  //   user_ard: string;
  //   user_firstname: string;
  //   user_lastname: string;
  //   user_role: string;
  //   user_id: string;
  //   store_id : string
  // }
  storeUserURl = '/store-user/upcoming';
  corporateUserURL = '/corporate-user/upcoming';
    //districtLeaderURL = '/district-leader';
    districtLeaderURL = '/district-leader/upcoming';
   constructor(private router: Router , private authService : AuthService, private districtLeaderService : DistrictLeaderService) {}


  ngOnInit() {
  //  this.router.events
  // .filter((event) => event instanceof NavigationEnd)
  // .subscribe((event) => {
  //   console.log('NavigationEnd:', event);
  //   var event_data=JSON.stringify(event);
  //   var parsed_event_data = JSON.parse(event_data);
  //   console.log('parsed_event_data' , parsed_event_data);
  //   if(parsed_event_data.url != undefined){
  //   var url_params = parsed_event_data.url.split('/?')[1]

  if(window.location.href != undefined){
    var url_params = window.location.href.split('/?')[1];   
    // var params =  this.getDataFromUrl(url_params);
    // var test = this.getJsonFromUrl(params);
    // var storeId_json = JSON.stringify(test);
    // var test2 = JSON.parse(storeId_json);
    // this.authService.storeId = atob(test2.store_id);
     
    
   


    //this.portalURL = event.url;
    console.log(atob("cGFzc3dvcmQ="));
    console.log('url_params' , url_params);
    if(url_params != undefined){
    // var params =  this.getDataFromUrl(url_params);
    // console.log('params' , params);
    // var splitData = url_params.split("&");
    // var role = splitData[3];
    // console.log('role' , role);
    //console.log('json_data',json_data);
    //console.log('json stringify',JSON.stringify(json_data));

   // var tests = '?user_ard=' +json_data.user_ard + '&user_firstname=' + user_firstname + '&user_lastname=' + user_lastname + '&user_role=' + user_rolename + '&user_firstname=' + user_firstname +
    // ("portalURLParams " + user_ard );
		// ("portalURLParams " + user_firstname );
		// ("portalURLParams " + user_lastname );
		// ("portalURLParams " + user_role );
		// System.out.println("portalURLParams " + user_id );
		// System.out.println("portalURLParams " + store_id );
      this.authService.userAuthentication(url_params)
      .subscribe(
        userData=>{
          console.log('userData' , userData);
          var store_user_data = JSON.stringify(userData);
          var store_user = JSON.parse(store_user_data);
          if(store_user.role == role_portalUser){
            this.districtLeaderService.external_URLParams = url_params;
          this.router.navigate([this.storeUserURl]);
          var params =  this.getDataFromUrl(url_params);
          var storeId = this.getJsonFromUrl(params);
          var storeId_json = JSON.stringify(storeId);
          var test2 = JSON.parse(storeId_json);
          this.authService.storeId = atob(test2.store_id);

          }else if(store_user.role == role_corporateUser){    
             this.router.navigate([this.corporateUserURL]);
            var params =  this.getDataFromUrl(url_params);
            var corp_userId = this.getJsonFromUrl(params);
            var corp_userId_json = JSON.stringify(corp_userId);
            var corp_userId_string = JSON.parse(corp_userId_json);
            this.authService.corp_userId = atob(corp_userId_string.user_id);
            
          }else{
            this.districtLeaderService.external_URLParams = url_params;
            this.router.navigate([this.districtLeaderURL]);
            var params =  this.getDataFromUrl(url_params);
            var dl_userId = this.getJsonFromUrl(params);
            var dl_userId_json = JSON.stringify(dl_userId);
            var dl_userId_string = JSON.parse(dl_userId_json);
            debugger;
            console.log('dl_userId_string' , dl_userId_string);
            this.authService.dl_userId = atob(dl_userId_string.user_id);
                    }
          },
            error => {
            console.log('error', error);
          });
    }
    }
  }

  getJsonFromUrl(inputURL : string) {
  var query = inputURL;
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
 getDataFromUrl(inputURL) {
  var query = inputURL;
  var result = {};
  var final ="";
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    final= final+ item[0] +'='+item[1]+ '&';
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return final;
}

  }
