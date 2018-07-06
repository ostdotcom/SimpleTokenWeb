import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OstHttp } from './services/ost-http.service';


import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { RowComponent } from './kyc-user-dashboard/kyc-user-row/row.component';
import { PaginationComponent } from './table/pagination/pagination.component';
import { DashboardComponent } from './kyc-user-dashboard/dashboard.component';
import { HeaderComponent } from './kyc-user-dashboard/kyc-user-header/header.component';
import { AppConfigService } from './services/app-config.service';
import { EntityConfigService } from './services/entity-config.service';
import { NavbarComponent } from './navbar/navbar.component';
import { OstSearchComponent } from './ost-search/search.component';
import { KycCaseComponent } from './kyc-case/kyc-case.component';
import { KycLogRowComponent } from './kyc-case/kyc-log-row/kyc-log-row.component';
import { KycLogHeaderComponent } from './kyc-case/kyc-log-header/kyc-log-header.component';
import { RequestStateHandlerComponent } from './request-state-handler/request-state-handler.component';
import { RequestStateHandlerService } from './services/request-state-handler.service';
import { OstOptionsComponent } from './ost-options/ost-options.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { OstHeaderComponent } from './table/ost-header/ost-header.component';
import { KycDetailsHeaderComponent } from './kyc-case/kyc-details-header/kyc-details-header.component';
import { KycDetailsRowComponent } from './kyc-case/kyc-details-row/kyc-details-row.component';
import { BaseModalComponent } from './table-modal-base/base-modal.component';
import { LogModalComponent } from './kyc-case/log-modal/log-modal.component';
import { DuplicateDetailsModalComponent } from './kyc-case/duplicate-details-modal/duplicate-details-modal.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReportIssuesComponent } from './report-issues/report-issues.component';
import { UpdateEthaddressComponent } from './update-ethaddress/update-ethaddress.component';
import { UserDashBoardHeaderComponent } from './admin-dashboard/user-dash-board-header/user-dash-board-header.component';
import { UserDashBoardRowComponent } from './admin-dashboard/user-dash-board-row/user-dash-board-row.component';
import { OstRowComponent } from './table/ost-row/ost-row.component';
import { InviteUserModalComponent } from './invite-user/invite-user-modal/invite-user-modal.component';
import { OstAlertComponent } from './ost-alert/ost-alert.component';
import { KycCaseActionModalComponent } from './kyc-case/kyc-case-action-modal/kyc-case-action-modal.component';
import { AdminDashboardModalComponent } from './admin-dashboard/admin-dashboard-modal/admin-dashboard-modal.component';
import { ScrollTopService } from './services/scroll-top.service';
import { FormErrorHandlerService } from './services/form-error-handler.service';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageUserHeaderComponent } from './manage-user/manage-user-header/manage-user-header.component';
import { ManageUserRowComponent } from './manage-user/manage-user-row/manage-user-row.component';
import { ManageUserModalComponent } from './manage-user/manage-user-modal/manage-user-modal.component';
import { PageBaseComponent } from './page-base-component/page-base-component.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminSettingMenusComponent } from './admin-settings/admin-setting-menus/admin-setting-menus.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordModalComponent } from './profile/change-password-modal/change-password-modal.component';
import { DevelopersIntegrationComponent } from './developers-integration/developers-integration.component';
import { OstFormErrorHandlerComponent } from './ost-form-error-handler/ost-form-error-handler.component';




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
    OstSearchComponent,
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
    OstAlertComponent,
    KycCaseActionModalComponent,
    AdminDashboardModalComponent,
    ManageUserComponent,
    ManageUserHeaderComponent,
    ManageUserRowComponent,
    ManageUserModalComponent,
    PageBaseComponent,
    AdminSettingsComponent,
    AdminSettingMenusComponent,
    ProfileComponent,
    ChangePasswordModalComponent,
    DevelopersIntegrationComponent,
    OstFormErrorHandlerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([

      {
        path: 'admin',
        component: AdminSettingsComponent,
        children: [
          {
            path: 'settings/admin',
            component: AdminDashboardComponent
          },
          {
            path: 'settings/user',
            component: ManageUserComponent
          },
          {
            path:'settings/profile',
            component: ProfileComponent
          },
          {
            path: 'settings/developer-integrations',
            component: DevelopersIntegrationComponent
          }
       ]

      },
      {
        path: 'admin/dashboard',
        component: DashboardComponent
      },
      {
        path: 'admin/case-id/:id',
        component: KycCaseComponent
      }


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
                RequestStateHandlerService,
                ScrollTopService,
                FormErrorHandlerService

            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
