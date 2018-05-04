import {Component, OnInit, Input, TemplateRef, ContentChild} from '@angular/core';
import {OstHttp} from '../ost-http.service';
import {Http, RequestOptionsArgs, ResponseContentType} from '@angular/http';
import { RequestStateHandlerService } from '../request-state-handler.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  constructor(private http: OstHttp, private stateHandler: RequestStateHandlerService) {
  }

  // Decide row template according to parent
  @ContentChild('rowData') rowTemplate: TemplateRef<any>;

  //Mandatory input options
  @Input('dataUrl') dataUrl: string;

  //Optional input options
  @Input('pageNumber') pageNumber?: number ;
  @Input('filterForm') filterForm?: any = null;
  @Input('sortForm') sortForm?: any = null;
  @Input('config') config?: object = null;
  @Input('deleteRowUrl') deleteRowUrl?: string = null;
  @Input('getDataOnInit') getDataOnInit?: boolean = true;

  rows: Array<any> = [];
  errMsg: string ;
  isProcessing: boolean = false;
  hasError: boolean = false;
  noResultFound: boolean =false;
  filtersObserver: any; 
  sortObserver: any; 
  metaData: object;

  ngOnInit() {
    this.configOverWrites();
  }

  ngOnDestroy() {
    this.unBindTableChangeEvents();
  }

  ngAfterContentInit() {
    setTimeout(() => {
      if (this.getDataOnInit) {
        this.getTableData();
      }
      this.bindTableChangeEvents();
    }, 100);
  }

  configOverWrites() {
    if (!this.config) return;
    let oThis = this,
      config = this.config
    ;
    Object.assign(oThis, config);
  }

  bindTableChangeEvents() {
    this.bindFilters();
    this.bindSorting();
  }

  unBindTableChangeEvents() {
    this.unBindFilters();
    this.unBindSorting();
  }

  bindFilters() {
    if (!this.filterForm) return;
    this.filtersObserver = this.filterForm.valueChanges.subscribe(() => {
      this.onFilter();
    });
  }

  bindSorting() {
    if (!this.sortForm) return;
    this.sortObserver = this.sortForm.valueChanges.subscribe(() => {
      this.onSorting();
    });
  }

  unBindFilters(){
    if (!this.filtersObserver) return;
    this.filtersObserver.unsubscribe();
  }

  unBindSorting(){
    if (!this.sortObserver) return;
    this.sortObserver.unsubscribe();
  }

  onFilter() {
    this.resetPageNumber();
    this.getTableData();
  }

  onSorting() {
    this.resetPageNumber();
    this.getTableData();
  }

  getFilter() {
    return this.filterForm && this.filterForm.value;
  }

  getSorting() {
    return this.sortForm && this.sortForm.value;
  }

  onPageChange(pageNumber: number) {
    this.setPageNumber(pageNumber)
    this.getTableData();
  }

  setPageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
  }

  resetPageNumber() {
    this.pageNumber = 1;
  }

  getPageNumber(): number {
    return this.pageNumber || 1;
  }

  getTableData() {
    let params: RequestOptionsArgs = this.getParams();
    this.clearTableData();
    this.stateHandler.updateRequestStatus(this, true, false , false);
    this.http.get(this.dataUrl, params).subscribe(
      response => {
        let res = response.json();
        this.onTableDataSuccess(res);
      },
      error => {
        let err = error.json();
        this.onTableDataError( err );
      })
  }

  clearTableData(){
    this.rows = [];
  }

  getParams(): RequestOptionsArgs {
    let requestParams = {
      params: {
        page_number: this.getPageNumber()
      }
    }
    if (this.filterForm) {
      Object.assign(requestParams['params'], this.getFilter());
    }
    if (this.sortForm) {
      Object.assign(requestParams['params'], this.getSorting());
    }
    return requestParams;
  }

  onTableDataSuccess(response) {
    if( response.success ){
      let data = response['data'],
      dataKey = data && data['result_set'],
      tableData = dataKey && data[dataKey],
      noResultFound = false
      ;
      this.rows = tableData;
      this.metaData = data['meta'];
      if( this.rows.length == 0 ){
        noResultFound = true ;
      }
      this.stateHandler.updateRequestStatus(this, false, false , noResultFound);
    }else{
      this.stateHandler.updateRequestStatus(this, false, true, false , response );
    }
  }

  onTableDataError(error) {
    this.stateHandler.updateRequestStatus(this, false, true, false, error);
  }

  isPagination(): Boolean {
    return this.getTotalPageCount() > 1 ? true : false;
  }

  getTotalPageCount(): Number {
    if (!this.metaData) return 1;
    let pageSize = Number(this.metaData['page_size']),
      totalRecords = Number(this.metaData['total_records']),
      totalPageCount = Math.ceil(totalRecords / pageSize)
    ;
    return totalPageCount;
  }

  /*========UN-tested code start=====*/

  deleteRow(data) {
    if (!this.deleteRowUrl) return false;
    let id = data['id'],
      status = data['status']
    ;
    this.http.post(this.deleteRowUrl, id).subscribe(
      response => {
        let res = response.json();
        this.onDeleteRowSuccess(res, id);
      },
      error => {
        let err = error.json();
        this.onDeleteRowFailure(err);
      }
    )
  }

  onDeleteRowSuccess(res, id) {
    if (res.success) {
      let rowIndex = this.getRowIndex(id);
      if (rowIndex) {
        this.rows.splice(rowIndex, 1);
      }
    }
  }

  onDeleteRowFailure(err) {
    console.log("overwrite if needed from outside", err);
  }

  insertRow(row) {
    this.rows.unshift(row);
  }

  updateRow(updatedRow, updateRowId?, mapKey?) {
    let popertyKey = mapKey || 'id',
      id = updateRowId || updatedRow[popertyKey],
      existingRow = this.getRowFromRows(id)
    ;
    if (existingRow) {
      existingRow = updatedRow;
    }
  }

  getRowIndex(id): number {
    let row,
      index: number = -1;
    for (var i = 0; i < this.rows.length; i++) {
      row = this.rows[i]
      if (row[id] == id) {
        index = i;
        break;
      }
    }
    return index;
  }

  getRowFromRows(id) {
    for (var i = 0; i < this.rows.length; i++) {
      if (this.rows[i] == id) {
        return this.rows[i];
      }
    }
    return null;
  }

  /*========UN-tested code end*=====*/
}
