import { OstHttp } from "../ost-http.service";
import { Input, Output, EventEmitter, Component} from '@angular/core';

@Component({})

export class RowBaseComponent {

    @Input('rowUpdateUrl') rowUpdateUrl? ; 

    constructor(private http : OstHttp){

    }

    deleteStatusConfig = {
        isProcessing    : false ,
        hasError        : false,
        errMsg          : "Something went wrong, please try again"
    };

    updateStatusConfig = {
        isProcessing    : false ,
        hasError        : false,
        errMsg          : "Something went wrong, please try again"
    };

    cachedRow:Object ; 

    cacheInitialValue( row ){
        this.cachedRow = Object.create( row ); 
    }

    updateRow( params ){
        this.updateStatusConfig.isProcessing = true; 
        this.http.post( this.rowUpdateUrl , params ).subscribe(
            response => {
                let res = response.json();
                this.onUpdateScuccess(res);
            },
            error => {
                let err = error.json();
                this.onUpdateError(err, params)
            }
        )
    }

    onUpdateScuccess(res) {
        if( res && res.success ){
            this.updateStatusConfig.isProcessing = false; 
            this.updateStatusConfig.hasError = false; 
        }  
    }

    onUpdateError(err, params){
        this.updateStatusConfig.isProcessing = false; 
        this.updateStatusConfig.hasError = true; 
        params['row'] = this.cachedRow ; 
        if(err && err['display_text']) {
            this.updateStatusConfig.errMsg =  err['display_text']; 
        }
    }

    /**
     * deleteRowEvent is the custom event name like click or change
     * Its created of type EventEmitter
     * This is of type output so its available to all parent component
     * @Output('deleteRowEvent') , this is an alias, like and event name contract for other components
     * actual deleteRowEvent name can be changed internally. 
     **/
    @Output('deleteRowEvent') deleteRowEvent = new EventEmitter();

     /**
     * onDelete is the function called on delete row click like u can call other functions on click , change etc
     * Internal it emits and event which can be than listend by the parent components , or any other components 
     * emit has have only one argument, so data is wrapped in an object and passed.
     **/
    onDelete( row ) {
        this.deleteRowEvent.emit( {
            "row" : row , 
            "status" : this.deleteStatusConfig
        } );
    }

}