import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'report-issues',
  templateUrl: './report-issues.component.html',
  styleUrls: ['./report-issues.component.scss']
})
export class ReportIssuesComponent implements OnInit {

  constructor() { }

  @Output('closeReportIssueEvent') closeReportIssueEvent =  new EventEmitter(); 

  ngOnInit() {
  }

  onReportIssue( reportIssue ){
    console.log( "reportIssue----" , reportIssue ) ; 
  }

  hideReportIssue(){
    this.closeReportIssueEvent.emit("reportIssueClose"); 
  }
}
