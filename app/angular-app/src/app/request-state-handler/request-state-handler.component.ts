import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'request-state-handler',
  templateUrl: './request-state-handler.component.html',
  styleUrls: ['./request-state-handler.component.scss']
})
export class RequestStateHandlerComponent implements OnInit {

  constructor() { }

  //State handler inputs 
  @Input('isProcessing') isProcessing: boolean = false; 
  @Input('hasError') hasError: boolean = false; 
  @Input('noResult') noResult?: boolean = false; 

  //Data show inputs and defaults
  @Input('errorMessage') errorMessage?: string; 
  @Input('noResultMessage') noResultMessage?: string; 
 
  //Icons show flags
  @Input('isErrorIcon') isErrorIcon?: boolean = true; 
  @Input('isNoResultIcon') isNoResultIcon?: boolean = true;

  ngOnInit() {
  }

  isRequestStatus(){
    return this.isProcessing || this.hasError || this.noResult ; 
  }

}
