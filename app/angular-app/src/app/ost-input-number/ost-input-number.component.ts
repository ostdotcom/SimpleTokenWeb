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

  @Input() _modelValue : number = 0;
  @Input('min') minValue : number = 0;
  @Input('max') maxValue : number = 0;

  //disables the arrow used for increment/decrement
  minDisabled : boolean = false;
  maxDisabled : boolean = false;

  get modelValue() {
    return this._modelValue;
  }

  set modelValue(val) {
    this._modelValue = val;
    this.propagateChange(this._modelValue);
    this.setMinDisabled();
    this.setMaxDisabled();
  }

  constructor() { }

  writeValue(value: any) {
    if (value !== undefined) {
      this.modelValue = value;
    }
  }

  propagateChange = (_: any) => {};
  onTouchedCallback = () => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouchedCallback = fn;
  }

  increment(){
    if( this.modelValue >= this.minValue && this.modelValue < this.maxValue) {
      this.modelValue++;
      this.onTouchedCallback();
    };
  }

  decrement(){
    if( this.modelValue <= this.maxValue && this.modelValue > this.minValue) {
      this.modelValue--;
      this.onTouchedCallback();
    };
  }

  setMinDisabled(){
    this.minDisabled = this.modelValue == this.minValue;
  }

  setMaxDisabled(){
    this.maxDisabled = this.modelValue == this.maxValue;
  }

  //Set touched on keyup
  onKeyUp() {
    this.onTouchedCallback();
  }


}
