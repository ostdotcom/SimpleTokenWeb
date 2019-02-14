import {Component, Input, forwardRef, EventEmitter, Output} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ost-toggle',
  templateUrl: './ost-toggle.component.html',
  styleUrls: ['./ost-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OstToggleComponent),
      multi: true
    }
  ]
})
export class OstToggleComponent implements ControlValueAccessor {

  _modelValue : number = 0;

  @Input('labelTxt') labelTxt : string = '';

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


}
