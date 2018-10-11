import { Injectable } from '@angular/core';
import * as PDFJS from 'pdfjs-dist';

@Injectable()
export class OstPdfService {
   
  constructor() { 
    (PDFJS as any).GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.489/pdf.worker.min.js" ; 
  }

  isValidPdf ( src ){
   return (PDFJS as any).getDocument( src ) ; 
  }

}
