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

  @Input('textToAppend') textToAppend : string = '';
  @Input() _modelValue : number = 0;

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

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  increment(){
    this.modelValue++;
  }

  decrement(){
    this.modelValue--;
  }


}
