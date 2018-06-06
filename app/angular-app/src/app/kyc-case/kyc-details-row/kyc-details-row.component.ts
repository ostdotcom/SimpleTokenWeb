import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
declare var $: any;


@Component({
  selector: 'kyc-details-row',
  templateUrl: './kyc-details-row.component.html',
  styleUrls: ['./kyc-details-row.component.scss']
})
export class KycDetailsRowComponent implements OnInit {
  @Input() row;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  closeModalEvent(){
    $("#detailsModal").off("hidden.bs.modal").on("hidden.bs.modal", () => {
      this.router.navigate(['/admin/case-id/', this.row.id]);
    });
    $("#detailsModal").modal("hide");

  }

}
