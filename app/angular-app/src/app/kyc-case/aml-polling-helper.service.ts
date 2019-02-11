import { Injectable } from '@angular/core';
import {OstHttp} from "../services/ost-http.service";

//TODO: Create a base class for polling and extend wherever required
@Injectable()
export class AmlPollingHelperService {

  constructor( private http: OstHttp ) {}

  pollingApi      : string = null ;
  pollingInterval : number = 5000;
  data            : object = null;
  pollingMethod   : string = "get";
  maxRetry        : number = 5;
  currentRetry    : number = 0;

  private pollXhr   : any    = null;
  private isPolling : boolean = false ; // To check if already polling
  private shouldPoll: boolean = false ; // To check for next polling

  startPolling (  ) {
    if ( this.isPolling ) {
      console.log("Polling Already in Progress");
      return false;
    }
    console.log("Polling has been started");
    this.shouldPoll = true;
    this.isPolling = true;
    this.currentRetry = 0;
    this.poll(  );
  }

  stopPolling() {
    this.shouldPoll = false;
    this.isPolling = false;
    console.log("Polling has been stopped");
  }

  onPollingSuccess( res ){
    //Owerwrite from outside
  }

  onPollingError( err ){
    //Owerwrite from outside
  }


  getData() {
    return this.data || {} //Overwrite from outside
  }

  isPollingStarted(){
    return this.isPolling ;
  }

  private poll( ) {

    if ( this.pollXhr ) {
      console.log("Polling request already in progress.");
      return false;
    }

    var params = this.getParams( );

    this.pollXhr = this.http[this.pollingMethod](this.pollingApi, params ).subscribe( response => {
      let res = response.json();
      if(res.success){
        this.onSuccess( res );
      } else {
        this.onError( res );
      }
    }, error => {
      let err = error.json();
      this.currentRetry++;
      this.onError( err );
    });

  }

  private getParams(  ){
    if(this.pollingMethod == "get"){
      return { params : this.getData( ) };
    }else {
      return this.getData( ) ;
    }
  }

  private onSuccess( res ){
    this.onPollingSuccess(res );
    this.onPollComplete();
  }

  private onError( res ){
    this.onPollingError( res );
    this.onPollComplete();
  }

  private onPollComplete(  ) {
    this.pollXhr = null;
    if( !this.isMaxRetries() ){
      this.scheduleNextPoll( );
    }
  }

  private isMaxRetries() {
    return this.currentRetry > this.maxRetry ;
  }

  private scheduleNextPoll(  ) {
    var oThis = this;
    if ( !oThis.shouldPoll  ) {
      oThis.isPolling = false;
      console.log("scheduleNextPoll :: Not scheduling next poll. shouldPoll is false");
      return;
    }

    console.log("scheduleNextPoll :: Next Poll Scheduled");

    setTimeout(function () {
      oThis.poll(  );
    }, oThis.pollingInterval );

  }

}
