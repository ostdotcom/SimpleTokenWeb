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


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    RowComponent,
    RowDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'admin/dashboard',
        component: TableComponent
      },
      {
        path: 'row/:id',
        component: RowDetailComponent
      },
    ])
  ],
  providers: [TabledataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
