import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OstHttp } from './ost-http.service';


import { AppComponent } from './app.component';
import { TableComponent } from './ost-table/table.component';
import { RowComponent } from './kyc-user-row/row.component';
import { TabledataService } from './tabledata.service';
import { OstPaginationComponent } from './ost-pagination/pagination.component';
import { KycUserDashboardComponent } from './kyc-user-dashboard/dashboard.component';
import { HeaderComponent } from './kyc-user-header/kyc-user-header.component';
import { AppConfigService } from './app-config.service';
import { EntityConfigService } from './entity-config.service';
import { OstFiltersComponent } from './ost-filters/ost-filters.component';
import { OstSelectComponent } from './ost-select/ost-select.component';
import { OstSortingsComponent } from './ost-sortings/ost-sortings.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    RowComponent,
    OstPaginationComponent,
    KycUserDashboardComponent,
    HeaderComponent,
    OstFiltersComponent,
    OstSortingsComponent,
    OstSelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'admin/new-dashboard',
        component: KycUserDashboardComponent
      }
    ])
  ],
  providers: [TabledataService, OstHttp, AppConfigService, EntityConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
