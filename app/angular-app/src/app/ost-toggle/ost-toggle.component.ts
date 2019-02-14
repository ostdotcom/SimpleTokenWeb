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

  private _modelValue : number = 0;  //Private model

  @Input('labelTxt') labelTxt : string = '';
  
  //Inner model Getter
  get modelValue() {
    //Storing it in private value to avoid recursive call of get Private model
    return this._modelValue;
  }
  
  //Inner model Setter
  set modelValue(val) {
    //As we get it we need to set it as well Private model
    this._modelValue = val ;
    //Propagate event to outer element ngModel.
    this.onChangeCallback( val );
  }

  constructor() { }

  writeValue(value: any) {
    //Setting initially value on load , can be also done by Init
    if (value !== undefined) {
      this.modelValue = value;
    }
  }

  onChangeCallback = (_: any) => {};
  onTouchedCallback = () => {};  //Not used anywhere as interface has mandatory

  registerOnChange(fn) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn) { //Required as interface has mandatory
    this.onTouchedCallback = fn;
  }


}
