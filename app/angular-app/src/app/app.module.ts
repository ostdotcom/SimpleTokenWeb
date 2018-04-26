import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { RowComponent } from './table/row/row.component';
import { TabledataService } from './tabledata.service';
import { RowDetailComponent } from './table/row-detail/row-detail.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { OstHttp } from './ost-http.service';
import { HeaderComponent } from './table/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    RowComponent,
    RowDetailComponent,
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
      },
      {
        path: 'row/:id',
        component: RowDetailComponent
      },
    ])
  ],
  providers: [TabledataService ,  OstHttp],
  bootstrap: [AppComponent]
})
export class AppModule { }
