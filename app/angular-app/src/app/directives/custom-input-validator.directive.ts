import { Directive, Input, forwardRef, ElementRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

function validateMinMax(min, max) {
  return (c: FormControl) => {
    let value = c.value;

    if( min && value < min ){
      return {
        min :{
          valid: false,
          requiredLength: min
        }
      }
    } else if( max && value > max ){
      return {
        max :{
          valid: false,
          requiredLength: max
        }
      }
    }
    return null;
  };
}

@Directive({
  selector: '[customInputValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CustomInputValidatorDirective), multi: true }
  ]
})
export class CustomInputValidatorDirective {

  validator: Function;

  constructor(private el: ElementRef) {
    let elAttr = el.nativeElement.attributes,
        min = elAttr.min && elAttr.min.value || 0,
        max = elAttr.max && elAttr.max.value || 0;
    this.validator = validateMinMax(min, max);
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
