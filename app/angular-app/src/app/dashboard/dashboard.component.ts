import { Component, OnInit } from '@angular/core';
import { EntityConfigService } from '../entity-config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private entityConfigService : EntityConfigService ) {}

  tableType = 'dashboard';

  config = {
    tableDataUrl : 'api/admin/kyc/dashboard/'
  };

  ngOnInit() {}

   onFilterChange( values ) {
    console.log("Filter Values",  values);
   }

   onSortChange( values ){
    console.log("Sorting Values",  values);
   }

   getOptionValues( entity ){
     return this.entityConfigService.getEntityConfig(entity)['values']; 
   }

}
