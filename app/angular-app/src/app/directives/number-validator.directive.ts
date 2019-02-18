import {Directive, forwardRef, OnInit, Input} from '@angular/core';
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
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => NumberValidatorDirective), multi: true }
  ]
})
export class NumberValidatorDirective implements OnInit {

  validator: Function;
  @Input('min') min ;
  @Input('max') max ;

  ngOnInit(){
    this.validator = validateMinMax(this.min, this.max);
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
