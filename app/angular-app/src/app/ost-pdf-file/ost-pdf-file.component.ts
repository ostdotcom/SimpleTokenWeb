import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OstPdfService } from "../services/ost-pdf.service"; 
import { RequestStateHandlerService } from "../services/request-state-handler.service"; 

@Component({
  selector: 'ost-pdf-file',
  templateUrl: './ost-pdf-file.component.html',
  styleUrls: ['./ost-pdf-file.component.scss']
})

export class OstPdfFileComponent implements OnInit {

  constructor(  private domSanitizer: DomSanitizer , 
                private ostPdfService : OstPdfService ,
                private stateHandler : RequestStateHandlerService ) { }

  @Input('src') src: string = null ; 
  iframeSrc: any = null ;

  isProcessing  : boolean = true ; 
  hasError      : boolean = false ; 


  ngOnInit() {
    this.ostPdfService.isValidPdf( this.src ).then( ( pdf ) => {
      this.stateHandler.updateRequestStatus( this , false , false );
      this.iframeSrc = this.bypassSecurityTrustResourceUrl( this.src );
    } , (error) => {
      this.stateHandler.updateRequestStatus( this , false , true );
    })
  }

  bypassSecurityTrustResourceUrl(url){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
