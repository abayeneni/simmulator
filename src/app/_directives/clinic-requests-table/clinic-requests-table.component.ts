import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observer } from 'rxjs';
import { SimulatorService } from '../../_services/simulator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'clinic-requests-table',
  templateUrl: './clinic-requests-table.component.html',
  styleUrls: ['./clinic-requests-table.component.scss']
})
export class ClinicRequestsTableComponent implements OnInit {

  @Input() columns: Array<any>;
  @Input() data: Array<any>;

  @Output() viewClinicRequest: EventEmitter<any> = new EventEmitter<any>();

  public rows: Array<any> = [];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any;

  public constructor() { }

  public ngOnInit(): void { 
    this.length = this.data.length;
    this.config = {
      paging: true,
      sorting: { columns: this.columns },
      filtering: { filterString: '' },
      className: ['table-striped', 'table-bordered']
    };
    this.onChangeTable(this.config);
  }

  public onCellClick(data: any): any {
    if (data.column == 'clinic_name') {
      this.viewClinicRequest.emit({
        clinic_id: data.row.clinic_id,
        stat_cd: data.row.stat_cd });
    }
  }

  public filterWithSearch(searchText: string) {
    console.log("[filterWithSearch] Search Text", searchText)
    this.config.filtering.filterString = searchText;
    // this.config.filtering.columnName = 'clinic_id';
    this.onChangeTable(this.config);
  }

  public filterWithQuery(queryParams: any) {
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].name in queryParams) {
        this.columns[i]['filtering'] = {'filterString' : queryParams[this.columns[i].name]};
      }
    }
  }
  
  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if(columnName == 'stat_cd') {
        let privVal = previous[columnName];
        let currVal = current[columnName];
        console.log("Priv & Curr: ", privVal, currVal)
        if(currVal == 'Rejected') {
          if(privVal == 'Pending') {
            return sort === 'desc' ? -1 : 1;
          } if(privVal == 'Confirmed') {
            return sort === 'desc' ? -1 : 1;
          } else {
            return sort === 'asc' ? -1 : 1;
          }
        }
        if(privVal == 'Rejected') {
          if(currVal == 'Pending') {
            return sort === 'asc' ? -1 : 1;
          } if(currVal == 'Confirmed') {
            return sort === 'asc' ? -1 : 1;
          } else {
            return sort === 'desc' ? -1 : 1;
          }
        }
        
        if (privVal > currVal) {
          return sort === 'desc' ? -1 : 1;
        } else if (privVal < currVal) {
          return sort === 'asc' ? -1 : 1;
        }
      } else {
        if (previous[columnName] > current[columnName]) {
          return sort === 'desc' ? -1 : 1;
        } else if (previous[columnName] < current[columnName]) {
          return sort === 'asc' ? -1 : 1;
        }
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name] != undefined && 
            item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

}
