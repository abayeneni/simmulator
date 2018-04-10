import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {getCorporateAllReportURL } from './data.service';
import {getCorporateCompletedReportURL } from './data.service';
import {getDistLeaderAllReportURL } from './data.service';
import {getDistLeaderCompletedReportURL } from './data.service';

@Injectable()
export class ReportDataService {

  private timeout;
 
  constructor(private readonly http: HttpClient) { }

  getCorporateReportAll(startDt , endDt) {
    return this.http.get(getCorporateAllReportURL+'?startDt='+startDt+'&endDt='+endDt).map((res: Response) => res);
  }

  getCorporateReportCompleted(startDt , endDt) {
    return this.http.get(getCorporateCompletedReportURL+'?startDt='+startDt+'&endDt='+endDt+'&status=completed').map((res: Response) => res);
  }

  getDistLeaderReportAll(startDt, endDt, user_ard, user_firstname, user_lastname, user_role) {
    return this.http.get(getDistLeaderAllReportURL+'?startDt='+startDt+'&endDt='+endDt+'&user_ard='+user_ard+'&user_firstname='+user_firstname+'&user_lastname='+user_lastname+'&user_role='+user_role).map((res: Response) => res);
  }

  getDistLeaderReportCompleted(startDt, endDt, user_ard, user_firstname, user_lastname, user_role) {
    return this.http.get(getDistLeaderCompletedReportURL+'?startDt='+startDt+'&endDt='+endDt+'&user_ard='+user_ard+'&user_firstname='+user_firstname+'&user_lastname='+user_lastname+'&user_role='+user_role).map((res: Response) => res);
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    // FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    FileSaver.saveAs(data, fileName + new Date().getTime() + EXCEL_EXTENSION);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx'
  
