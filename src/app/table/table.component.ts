import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columns!: any;
  headerRow: any = [];
  @Input() dataSource!: any;
  // columns = [
  //   { heading: 'Category ID', key: 'catId', isSortable: '', type: 'text', },
  //   { heading: 'Category', key: 'catName', isSortable: '', type: 'text', },
  //   { heading: "Sub-Category", key: 'subCatData', isSortable: 'sortable', type: 'custom', link: '' },
  //   { heading: "Class A", key: 'subCatData', isSortable: '', type: 'classButton', },
  //   { heading: "Class B", key: 'subCatData', isSortable: '', type: 'classButton', },
  //   { heading: 'Class C', key: 'subCatData', isSortable: '', type: 'classButton', },
  //   { heading: 'Total Count', key: 'subCatData', isSortable: '', type: 'custom', },
  //   { heading: 'Action', key: 'action', type: 'action', action: ['delete'] },
  // ]
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() onIncreaseDecreaseEvent: EventEmitter<any> = new EventEmitter<any>();



  constructor() { }

  ngOnInit(): void {
    this.columns.map((tableColumn: any) => this.headerRow.push(tableColumn.heading));
  }
  handleClick(element: any) {

    this.rowAction.emit(element);
  }

  onIncreaseDecrease(element: any, className: string, actionType: number) {
    this.onIncreaseDecreaseEvent.emit({
      element: element,
      className: className == 'Class A' ? 0 : (className == 'Class B' ? 1 : 2),
      actionType: actionType
    });


  }
}
