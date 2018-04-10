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




import { AlertService } from './_services/alert.service';
import { AuthService } from './_services/auth.service';
import { StatesListService } from './_services/states-list.service';
import { DbUpdateService } from './_services/db-update.service';
import { ClinicService } from './_services/clinic.service';
import { SharedService } from './_services/shared.service';

import { CreateAccountValidatorService } from './_services/create-account-validator.service';
import { ClinicDataService} from './_services/get-clinic-data';
import { DistrictLeaderService } from './_services/district-leader.service';
import { ReportDataService } from './_services/report.service';
import { FakeBackendProvider } from './_helpers/fake-backend';
import { ClinicRequestComponent } from './_directives/clinic-request/clinic-request.component';
import { ViewClinicRequestComponent} from './_directives/client-view-clinic-request/view-clinic-request.component';
import { AccountService } from './_services/account.service';
import { ClientTypeVaccinationService } from './_services/clienttype-vaccination.service';
import { DatePipe } from '@angular/common';

import { OrderBy } from './_directives/orderBy';
import { Format } from './_directives/format';
import { ClinicRequestsTableComponent } from './_directives/clinic-requests-table/clinic-requests-table.component';
//import {PopupModule} from 'ng2-opd-popup';


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
  providers: [StatesListService, 
    DbUpdateService,
    AccountService,
    AlertService, 
    AuthService, 
    ClinicService, 
    CreateAccountValidatorService,
    ClientTypeVaccinationService,
    ClinicDataService,
    DistrictLeaderService,
    ReportDataService,
    SharedService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

