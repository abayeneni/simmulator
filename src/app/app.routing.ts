import { RouterModule, Routes } from '@angular/router';



import {DashboardComponent} from './dashboard/dashboard.component'
import {StoreFeedComponent} from './store-feed/store-feed.component';
import {CapacityFeedComponent} from './capacity-feed/capacity-feed.component'
import {WorkRequestFeedComponent} from './work-request-feed/work-request-feed.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'store-feed', component:StoreFeedComponent},
  { path: 'capacity-feed', component: CapacityFeedComponent},
  { path: 'work-request-feed', component: WorkRequestFeedComponent}
];

export const AppRouting = RouterModule.forRoot(routes ,{useHash:true});

