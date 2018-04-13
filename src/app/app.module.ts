import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { PaginationModule, TabsModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { HeaderComponent } from './_directives/header/header.component';
import { FooterComponent } from './_directives/footer/footer.component';
import { NavbarComponent } from './_directives/navbar/navbar.component';
import { ShowErrorsComponent } from './_directives/show-errors.component';
import { AlertComponent } from './_directives/alert/alert.component';
import { Ng2TableModule } from './_directives/ng2-table/ng-table-module';

import { SimulatorService } from './_services/simulator.service';
import { SharedService } from './_services/shared.service';

import { FakeBackendProvider } from './_helpers/fake-backend';
import { DatePipe } from '@angular/common';

import { OrderBy } from './_directives/orderBy';
import { Format } from './_directives/format';
import { ClinicRequestsTableComponent } from './_directives/clinic-requests-table/clinic-requests-table.component';


import {ClinicRequestMultipleComponent} from './_directives/clinic-request-multiple/clinic-request-multiple.component'

import { StoreFeedComponent } from './store-feed/store-feed.component';
import { DataTablesModule } from 'angular-datatables';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CapacityFeedComponent } from './capacity-feed/capacity-feed.component';
import { WorkRequestFeedComponent } from './work-request-feed/work-request-feed.component';


@NgModule({
  declarations: [
    AppComponent,
    OrderBy,
    Format,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ShowErrorsComponent,
    AlertComponent,
    StoreFeedComponent,
    DashboardComponent,
    CapacityFeedComponent,
    WorkRequestFeedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouting,
    OrderModule,
    NgxPaginationModule,
//    PopupModule.forRoot()
    Ng2TableModule,
    PaginationModule.forRoot(),
    TabsModule,
    MyDateRangePickerModule,
    DataTablesModule,
    
    
  ],
  providers: [
    SharedService,
    SimulatorService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

