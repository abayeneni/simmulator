import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `<header> 
  <div class="container-fluid row"> 
    <div class="logo col-sm-2"><img src="{{logoUrl}}"></div> 
    <h1 class="logo-title col-sm-8">{{appName}}</h1> 
    <div *ngIf="showLogout" class="logout pull-right col-sm-2">Logout &nbsp;<span class="glyphicon glyphicon-log-out"></span></div>
  </div> 
</header>`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() appName: string = 'Simulation Application';
  @Input() logoUrl: string = './assets/images/cvs_health_logo.png';
  @Input() showLogout: boolean = false;
  
  constructor() {
  }

  ngOnInit() {
  }

}
