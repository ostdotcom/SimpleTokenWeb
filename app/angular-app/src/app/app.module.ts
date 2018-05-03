import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { HeaderComponent } from './kyc_user_header/header.component';
import { AppConfigService } from './app-config.service';
import { EntityConfigService } from './entity-config.service';
import { KycHeaderComponent } from './kyc-header/kyc-header.component';
import { KycSearchComponent } from './kyc-search/kyc-search.component';


export function entityServiceFactory(entityConfigService: EntityConfigService): Function {
  return () => entityConfigService.load();
}


@NgModule({
  declarations: [
    AppComponent,
    KycHeaderComponent,
    TableComponent,
    RowComponent,
    PaginationComponent,
    DashboardComponent,
    HeaderComponent,
    KycHeaderComponent,
    KycSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'admin/new-dashboard',
        component: DashboardComponent
      },
      {
        path: 'admin/case-id/:id',
        component: DashboardComponent
      },
    ])
  ],
  providers: [  EntityConfigService,
                {
                  // Provider for APP_INITIALIZER
                  provide: APP_INITIALIZER,
                  useFactory: entityServiceFactory,
                  deps: [EntityConfigService],
                  multi: true
                },
                TabledataService,
                OstHttp,
                AppConfigService,
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
