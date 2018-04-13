import {Router, NavigationEnd, ActivatedRoute, Params} from '@angular/router';
import {OnInit, Component} from '@angular/core';
import 'rxjs/add/operator/filter';
import {DOCUMENT} from '@angular/common';

import { role_portalUser } from './_models/roles';
import { role_corporateUser } from './_models/roles';


@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html'
})
export class AppComponent {

  title = 'app';

   constructor(private router: Router) {}


  ngOnInit() {
  }

  }
