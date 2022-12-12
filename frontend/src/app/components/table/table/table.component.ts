import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/models/column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit {

  @Input() tableColumns: Array<Column> = [];
  @Input() tableData: Array<T> = [];

  displayedColumns: Array<string> = [];
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map(column => column.columnDef);
    this.dataSource = new MatTableDataSource<T>(this.tableData);
  }
}
