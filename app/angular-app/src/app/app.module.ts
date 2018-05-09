import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OstHttp } from './ost-http.service';


import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { RowComponent } from './kyc-user-row/row.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './kyc-user-header/header.component';
import { AppConfigService } from './app-config.service';
import { EntityConfigService } from './entity-config.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarSearchComponent } from './navbar-search/navbar-search.component';
import { KycCaseComponent } from './kyc-case/kyc-case.component';
import { KycLogRowComponent } from './kyc-log-row/kyc-log-row.component';
import { KycLogHeaderComponent } from './kyc-log-header/kyc-log-header.component';
import { RequestStateHandlerComponent } from './request-state-handler/request-state-handler.component';
import { RequestStateHandlerService } from './request-state-handler.service';
import { OstOptionsComponent } from './ost-options/ost-options.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { OstHeaderComponent } from './ost-header/ost-header.component';
import { KycDetailsHeaderComponent } from './kyc-details-header/kyc-details-header.component';
import { KycDetailsRowComponent } from './kyc-details-row/kyc-details-row.component';
import { BaseModalComponent } from './base-modal/base-modal.component';
import { LogModalComponent } from './log-modal/log-modal.component';
import { DuplicateDetailsModalComponent } from './duplicate-details-modal/duplicate-details-modal.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReportIssuesComponent } from './report-issues/report-issues.component';
import { UpdateEthaddressComponent } from './update-ethaddress/update-ethaddress.component';
import { UserDashBoardHeaderComponent } from './admin-dashboard/user-dash-board-header/user-dash-board-header.component';
import { UserDashBoardRowComponent } from './admin-dashboard/user-dash-board-row/user-dash-board-row.component';
import { OstRowComponent } from './table/ost-row/ost-row.component';
import { InviteUserModalComponent } from './invite-user/invite-user-modal/invite-user-modal.component';
import { DeleteUserModalComponent } from './admin-dashboard/delete-user-modal/delete-user-modal.component';
import { ResendInviteModalComponent } from './admin-dashboard/resend-invite-modal/resend-invite-modal.component';
import { ResetMfaModalComponent } from './admin-dashboard/reset-mfa-modal/reset-mfa-modal.component';
import { ReopenCaseModalComponent } from './kyc-case/reopen-case-modal/reopen-case-modal.component';
import { RetryModalComponent } from './kyc-case/retry-modal/retry-modal.component';
import { QualifyActionModalComponent } from './kyc-case/qualify-action-modal/qualify-action-modal.component';
import { DenyActionModalComponent } from './kyc-case/deny-action-modal/deny-action-modal.component';
import { OstAlertComponent } from './ost-alert/ost-alert.component';




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
    RequestStateHandlerComponent,
    OstOptionsComponent,
    InviteUserComponent,
    OstHeaderComponent,
    KycDetailsHeaderComponent,
    KycDetailsRowComponent,
    BaseModalComponent,
    LogModalComponent,
    DuplicateDetailsModalComponent,
    AdminDashboardComponent,
    ReportIssuesComponent,
    UpdateEthaddressComponent,
    UserDashBoardHeaderComponent,
    UserDashBoardRowComponent,
    OstRowComponent,
    InviteUserModalComponent,
    DeleteUserModalComponent,
    ResendInviteModalComponent,
    ResetMfaModalComponent,
    ReopenCaseModalComponent,
    RetryModalComponent,
    QualifyActionModalComponent,
    DenyActionModalComponent,
    OstAlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'admin/dashboard',
        component: DashboardComponent
      },
      {
        path: 'admin/case-id/:id',
        component: KycCaseComponent
      },
      {
        path: 'admin/admin-user/dashboard',
        component: AdminDashboardComponent
      },
    ]),
    ReactiveFormsModule
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
                RequestStateHandlerService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
