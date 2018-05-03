import {Component, OnInit, Input, TemplateRef, ContentChild} from '@angular/core';
import {OstHttp} from '../ost-http.service';
import {Http, RequestOptionsArgs, ResponseContentType} from '@angular/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  //Mandatory input options
  @Input('dataUrl') dataUrl: string;

  //Optional input options
  @Input('pageNumber') pageNumber?: number ;
  @Input('tableType') tableType?: string = null;
  @Input('filterForm') filterForm?: any = null;
  @Input('sortForm') sortForm?: any = null;
  @Input('config') config?: object = null;
  @Input('deleteRowUrl') deleteRowUrl?: string = null;

  // Decide row template according to parent
  @ContentChild('rowData') rowTemplate: TemplateRef<any>;


  // TODO confrim default message from UX/UI
  rows: Array<any> = [];
  errMsg: string = 'Something went wrong, please try again!';
  isProcessing: boolean = false;
  getDataOnLoad: boolean = true;
  hasError: boolean = false;
  metaData: object;

  constructor(private http: OstHttp) {
  }

  ngOnInit() {
    this.configOverWrites();
  }

  ngAfterContentInit() {
    setTimeout(() => {
      if (this.getDataOnLoad) {
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

  bindFilters() {
    if (!this.filterForm) return;
    this.filterForm.valueChanges.subscribe(() => {
      this.onFilter();
    });
  }

  bindSorting() {
    if (!this.sortForm) return;
    this.sortForm.valueChanges.subscribe(() => {
      this.onSorting();
    });
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
    this.updateDataProcessingStatus(this, true, false);
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
      tableData = dataKey && data[dataKey]
      ;
      this.rows = tableData;
      this.metaData = data['meta'];
      this.updateDataProcessingStatus(this, false, false);
    }else{
      this.updateDataProcessingStatus(this, false, true, response );
    }
  }

  onTableDataError(error) {
    this.updateDataProcessingStatus(this, false, true, error);
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

  updateDataProcessingStatus(context, isProcessing: boolean, hasError: boolean, error?: object) {
    if (!context) return;
    context['isProcessing'] = isProcessing;
    context['hasError'] = hasError;
    if( error ) {
      context['errMsg'] =  error['err'] && error['err']['display_text']; 
    }
  }

  /*========UN-tested code start=====*/

  deleteRow(data) {
    if (!this.deleteRowUrl) return false;
    let id = data['id'],
      status = data['status']
    ;
    this.updateDataProcessingStatus(status, true, false);
    this.http.post(this.deleteRowUrl, id).subscribe(
      response => {
        let res = response.json();
        this.onDeleteRowSuccess(res, id);
        this.updateDataProcessingStatus(status, false, false);
      },
      error => {
        let err = error.json();
        this.onDeleteRowFailure(err);
        this.updateDataProcessingStatus(status, false, true, err);
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
