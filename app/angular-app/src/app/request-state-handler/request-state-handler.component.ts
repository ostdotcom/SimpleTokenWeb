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
  @Input('hasWarning') hasWarning?: boolean = false;

  //Icons show flags
  @Input('isProcerssingIcon') isProcessingIcon?: boolean = true;
  @Input('isErrorIcon') isErrorIcon?: boolean = true;
  @Input('isWarningIcon') isWarningIcon?: boolean = true;

  //Data inputs
  @Input('processingMessage') processingMessage?: string;
  @Input('errorMessage') errorMessage?: string;
  @Input('warningMessage') warningMessage?: string;

  ngOnInit() {
  }

  isRequestStatus(){
    return this.isProcessing || this.hasError || this.hasWarning ;
  }

}
