import { Component, OnInit, Input , EventEmitter, Output, ElementRef} from '@angular/core';
declare var $:any; 

@Component({
  selector: 'ost-slider',
  templateUrl: './ost-slider.component.html',
  styleUrls: ['./ost-slider.component.scss']
})

export class OstSliderComponent implements OnInit {

  constructor( public elRef : ElementRef ) { }

  @Input('name')      name      : string; 
  @Input('min')       min       : number  = 0; 
  @Input('max')       max       : number  = 0;
  @Input('step')      step      : number  = 1;
  @Input('value')     value     : number  = 0;
  @Input('tooltip')   tooltip   : string  = 'show' ;
  @Input('disabled')  disabled  : boolean = false; 
  @Input('class')     className : string  = null; 
  @Input('postfix')   postfix   : string  = null;
  @Input('prefix')    prefix    : string  = null;

  @Input('initSlider') isInitSlider:boolean = true ; 
 
  @Output('sliderValChange') sliderValChange = new EventEmitter();
  
  slider; 
  sliderValue; 

  ngOnInit() {
    if(!this.name){
      throw "No name set for slider" ; 
    }

    if(this.isInitSlider){
      this.initSlider();
    }
  }

  ngOnChanges( changes ){
    let valueObj      = changes['value'],
        currentValue  = valueObj && valueObj['currentValue'],
        previousValue = valueObj && valueObj['previousValue']
        ;
    if( currentValue != previousValue ){
      this.setValue( currentValue  ); 
    }
  } 

  initSlider() {
    setTimeout( ()=> {
      let jSlider = this.elRef.nativeElement.querySelector('.ost-slider'); 
      this.slider = $(jSlider).bootstrapSlider({
        min: this.min, 
        max : this.max,
        step : this.step,
        value : this.value,
        tooltip: this.tooltip,
      }) ; 

      if(this.disabled) {
        this.disableSlider(); 
        return false; 
      }

      this.slider.on('change' ,  () => {
        let currentVal =  this.getValue();
        if( currentVal != this.value ){
          this.value = currentVal; 
          this.sliderValChange.emit( currentVal );
        }
      })
    }, 100 )
  }

  disableSlider(){
    if( this.slider ){
      this.slider.bootstrapSlider( 'disable' ); 
    }
  }

  enableSlider(){
    if( this.slider ){
      this.slider.bootstrapSlider( 'enable' ); 
    }
  }

  setValue( value ){
    if( this.slider ){
      this.slider.bootstrapSlider('setValue' , value ); 
    }
  }

  getValue( ){
    return this.slider && this.slider.bootstrapSlider('getValue'); 
  }

}
