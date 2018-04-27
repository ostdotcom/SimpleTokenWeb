import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OstHttp } from './ost-http.service';


import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { RowComponent } from './kyc_user_row/row.component';
import { TabledataService } from './tabledata.service';
import { PaginationComponent } from './pagination/pagination.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { HeaderComponent } from './kyc_user_header/header.component';
import { AppConfigService } from './app-config.service';
import { EntityConfigService } from './entity-config.service';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    RowComponent,
    PaginationComponent,
    DashboardComponent,
    FilterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'admin/new-dashboard',
        component: DashboardComponent
      }
    ])
  ],
  providers: [TabledataService ,  OstHttp, AppConfigService, EntityConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
