import {Component, OnInit, Input, TemplateRef, ContentChild, Output, EventEmitter} from '@angular/core';
import {OstHttp} from '../services/ost-http.service';
import {Http, RequestOptionsArgs, ResponseContentType} from '@angular/http';
import { RequestStateHandlerService } from '../services/request-state-handler.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  constructor(private http: OstHttp, private stateHandler: RequestStateHandlerService) {
  }

  // Decide row template according to parent
  @ContentChild('rowTemplate') rowTemplate: TemplateRef<any>;

  //Mandatory input options
  @Input('dataUrl') dataUrl: string;

  //Optional input options
  @Input('pageNumber') pageNumber?: number ;
  @Input('filterForm') filterForm?: any = null;
  @Input('sortForm') sortForm?: any = null;
  @Input('searchForm') searchForm?: any = null;
  @Input('config') config?: object = null;
  @Input('getDataOnInit') getDataOnInit?: boolean = true;
  @Input('isPaginated') isPaginated?: boolean = true;
  @Input('requestParams') requestParams?: object = {};
  @Input('processingMessage') processingMessage?: string;
  @Input('customErrorMessage') customErrorMessage?: string ;
  @Input('warningMessage') warningMessage?: string ;

  @Output('pageChangeEvent') pageChangeEvent? = new EventEmitter<number>();
  @Output('tableDataLoadedEvent') tableDataLoadedEvent? =  new EventEmitter();


  rows: Array<any> = [];
  isProcessing: boolean = false;
  hasError: boolean = false;
  hasWarning: boolean = false;
  filtersObserver: any;
  searchObserver: any;
  sortObserver: any;
  metaData: object;
  errorMessage: string="";

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
    this.bindSearch();
  }

  unBindTableChangeEvents() {
    this.unBindFilters();
    this.unBindSorting();
    this.unBindSearch();
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

  bindSearch() {
    if (!this.searchForm) return;
    this.searchObserver = this.searchForm.ngSubmit.subscribe(() => {
      this.onSearching();
    });
  }

  unBindSearch(){
    if (!this.searchObserver) return;
    this.searchObserver.unsubscribe();
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

  onSearching(){
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

  getSeaching() {
    console.log('searchForm', this.searchForm.value);
    return this.searchForm && this.searchForm.value;
  }

  onPageChange(pageNumber: number) {
    this.pageChangeEvent.emit( pageNumber );
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
    this.stateHandler.updateRequestStatus(this, true);
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
    let requestParams =  this.requestParams;
    requestParams['page_number'] = this.getPageNumber();
    if (this.filterForm) {
      Object.assign(requestParams, this.getFilter());
    }
    if (this.sortForm) {
      Object.assign(requestParams, this.getSorting());
    }
    if (this.searchForm){
      Object.assign(requestParams, this.getSeaching());
    }
    return { params : requestParams };
  }

  onTableDataSuccess(response) {
    if( response.success ){
      let data = response['data'],
      dataKey = data && data['result_set'],
      tableData = dataKey && data[dataKey],
      hasWarning = false
      ;
      this.rows = tableData;
      this.metaData = data['meta'];
      if( this.rows.length == 0 ){
        hasWarning = true ;
      }
      this.stateHandler.updateRequestStatus(this, false, false , hasWarning);
      this.tableDataLoadedEvent.emit( true );
    }else{
      this.stateHandler.updateRequestStatus(this, false, true, false , response );
      this.tableDataLoadedEvent.emit( false );
    }
  }

  onTableDataError(error) {
    this.stateHandler.updateRequestStatus(this, false, true, false, error);
    this.tableDataLoadedEvent.emit( false );
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

  onDeleteRowSuccess(id) {
      let rowIndex = this.getRowIndex(id);
      if (rowIndex > -1) {
        this.rows.splice(rowIndex, 1);
    }
  }

  insertRow(row) {
    this.rows.unshift(row);
  }

  appendRow(row){
    this.rows.push(row);
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
    let row, index: number = -1
    ;
    for (var i = 0; i < this.rows.length; i++) {
      row = this.rows[i];
      if (row['id'] == id) { return i ;  }
    }
    return index;
  }

  getRowFromRows(id) {
    for (var i = 0; i < this.rows.length; i++) {
      if (this.rows[i]['id'] == id) {
       return this.rows[i];
      }
    }
    return null;
  }


}
