import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OstHttp } from './ost-http.service';


import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { RowComponent } from './kyc_user_row/row.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './kyc_user_header/header.component';
import { AppConfigService } from './app-config.service';
import { EntityConfigService } from './entity-config.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarSearchComponent } from './navbar-search/navbar-search.component';
import { KycCaseComponent } from './kyc-case/kyc-case.component';
import { KycLogRowComponent } from './kyc-log-row/kyc-log-row.component';
import { KycLogHeaderComponent } from './kyc-log-header/kyc-log-header.component';
import { OstSelectComponent } from './ost-select/ost-select.component';



export function entityServiceFactory(entityConfigService: EntityConfigService): Function {
  return () => entityConfigService.load();
}


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    RowComponent,
    PaginationComponent,
    DashboardComponent,
    HeaderComponent,
    NavbarComponent,
    NavbarSearchComponent,
    KycCaseComponent,
    KycLogRowComponent,
    KycLogHeaderComponent,
    OstSelectComponent
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
        component: KycCaseComponent
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
                OstHttp,
                AppConfigService,
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
