import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'update-ethaddress',
  templateUrl: './update-ethaddress.component.html',
  styleUrls: ['./update-ethaddress.component.scss']
})
export class UpdateEthaddressComponent implements OnInit {

  constructor() { }

  @Output("closeEthAddressEvent") closeEthAddressEvent =  new EventEmitter();

  ngOnInit() {
  }

  updateEthAddress(updateEthAdressForm){
    console.log("updateEthAdressForm---" , updateEthAdressForm);
  }

  hideEthAddress(){
    this.closeEthAddressEvent.emit("closeEthAddress");
  }

}
