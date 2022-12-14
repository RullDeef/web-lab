import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/models/column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit {

  @Input() tableColumns: Array<Column> = [];
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

  displayedColumns: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map(column => column.columnDef);
  }
}
