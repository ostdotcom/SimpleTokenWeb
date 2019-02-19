import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ost-input-number',
  templateUrl: './ost-input-number.component.html',
  styleUrls: ['./ost-input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OstInputNumberComponent),
      multi: true
    }
  ]
})
export class OstInputNumberComponent implements ControlValueAccessor {

  innerModel : number = 0;  //Inner model

  @Input('min') minValue : number ;
  @Input('max') maxValue : number ;
  @Input('step') step    : number = 1;

  //disables the arrow used for increment/decrement
  minDisabled : boolean = false;
  maxDisabled : boolean = false;

  constructor() { }

  ngOnInit(){
    this.minValue = this.minValue && Number( this.minValue ) ;
    this.maxValue = this.maxValue && Number( this.maxValue ) ;
    this.step     = this.step && Number( this.step ) ;
  }

  writeValue(value: any) { //Will update the inner input field text for View
    console.log("writeValue" , value );
    if (value !== undefined) {
      this.innerModel = value;
      this.setMinDisabled();
      this.setMaxDisabled();
    }
  }

  onChangeCallback = (_: any) => {};
  onTouchedCallback = () => {};

  //Triggerd when input value is changed from view
  registerOnChange(fn) {
    this.onChangeCallback = fn;
  }

  //Triggerd when input value is touched in view
  registerOnTouched(fn) {
    this.onTouchedCallback = fn;
  }

  increment(){
    if( this.innerModel < this.maxValue) {
      this.innerModel += this.step ;
      this.onModelChange();
    };
  }

  decrement(){
    if( this.innerModel > this.minValue) {
      this.innerModel -= this.step ;
      this.onModelChange();
    };
  }

  setMinDisabled(){
    this.minDisabled = this.innerModel == null || this.innerModel <= this.minValue ;
  }

  setMaxDisabled(){
    this.maxDisabled = this.innerModel == null || this.innerModel >= this.maxValue ;
  }

  //Set touched on keyup
  onKeyUp() {
    this.onModelChange();
  }

  //Inner code logic nothing to do with Interface
  //Not implemented by set and getter function as onTouchedCallback shouldnt be call there and i dont like it.
  onModelChange(){
    this.setMinDisabled();
    this.setMaxDisabled();
    this.onTouchedCallback();
    this.onChangeCallback( this.innerModel );
  }

}
