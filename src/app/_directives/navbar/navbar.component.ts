import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class NavbarComponent implements OnInit {
  @Input() menuList: any = [];
  @Input() showUserBadge: boolean = false;
  @Input() showStoreNumber: boolean = false;
  @Input() showUserSettings: boolean = false;
  @Input() showCorpUserBadge: boolean = false;
  @Input() showDlNumber: boolean = false;

  @Input() shortName: string;
  @Input() userId: string;
  shortCorpName: string = "RV";
  corpUserId: string = "UserID1234";
  storeNumber: string = "1201";
  dlUserId : string;

  constructor(private route: ActivatedRoute, private router: Router, private elRef: ElementRef , private authservice : AuthService) {
    this.route.params.subscribe(params => {
      if (this.userId === undefined || this.userId == '') {
        this.userId = params['username'];
        this.authservice.userId = this.userId;
      }
      console.log("nav bar");
      console.log(this.userId);
    });
  }

  ngOnInit() {

    this.storeNumber = this.authservice.storeId;
    this.corpUserId = this.authservice.corp_userId;
    this.dlUserId = this.authservice.dl_userId;

  }
  accountSettings() {
    console.log("inside account settings")
    console.log(this.userId);
    this.router.navigate(['/client-user/edit-account', { username: this.userId }]);
  }

  showDropdown(event) {
    console.log(event);
    let currentDisp = event.srcElement.nextElementSibling.style.display;
    event.srcElement.nextElementSibling.style.display = (currentDisp == 'block') ? 'none' : 'block';
  }
  onClick(event) {
    if (event.target.className != 'dropdown-toggle') {
      let dropdownElem = this.elRef.nativeElement.querySelector('.dropdown-menu');
      if (dropdownElem.style.display == 'block')
        dropdownElem.style.display = 'none';
    }
  }
  subMenuClicked(event) {
    let clsName = event.srcElement.parentElement.parentElement.parentElement.className;
    if(clsName.indexOf("active") == -1) {
      event.srcElement.parentElement.parentElement.parentElement.className += " active";
    }
  }
  menuClicked(event) {
    let dropdownMenuElem = this.elRef.nativeElement.querySelector('.dropdown-toggle').parentElement;
    if(dropdownMenuElem.className.indexOf("active") != -1) {
      dropdownMenuElem.className = "dropdown";
    }
  }
}
