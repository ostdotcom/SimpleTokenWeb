import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'case-breadcrumb',
  templateUrl: './case-breadcrumb.component.html',
  styleUrls: ['./case-breadcrumb.component.scss']
})
export class CaseBreadcrumbComponent implements OnInit {

  constructor( public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
