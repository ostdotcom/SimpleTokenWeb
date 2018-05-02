import { Component, OnInit } from '@angular/core';
import { EntityConfigService } from '../entity-config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( private entityConfigService : EntityConfigService ) {}

  tableType = 'dashboard';

  ngOnInit() {}

   onFilterChange(  ) {
   
   }

   onSortChange(  ){
   
   }

   onPageChange ( ){

   }
   
   getOptionValues( entity ){
     return this.entityConfigService.getEntityConfig(entity)['values'];
   }

}
