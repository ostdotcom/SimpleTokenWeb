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
  @Input() minValue : number = 0;
  @Input() maxValue : number = 0;

  get modelValue() {
    return this._modelValue;
  }

  set modelValue(val) {
    this._modelValue = val;
    this.propagateChange(this._modelValue);
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
    if( this.modelValue == this.maxValue) return;
    this.modelValue++;
  }

  decrement(){
    if( this.modelValue == this.minValue) return;
    this.modelValue--;
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }


}
