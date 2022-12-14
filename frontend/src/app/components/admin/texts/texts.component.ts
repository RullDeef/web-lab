import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/models/column';
import { Text } from 'src/app/models/text';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.scss']
})
export class TextsComponent implements OnInit {

  tableColumns: Array<Column> = [
    {columnDef: 'id', header: 'ID', cell: (element: Record<string, any>) => `${element['id']}`},
    {columnDef: 'title', header: 'Заголовок', cell: (element: Record<string, any>) => `${element['title']}`},
  ];

  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Text>();

  constructor(private textService: TextService) { }

  ngOnInit(): void {
    this.refresh();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 10;
  }

  refresh(): void {
    this.textService.getTexts().subscribe((texts: Array<Text>) => {
      this.dataSource = new MatTableDataSource<Text>(texts);
      this.dataSource.paginator = this.paginator;
    });
  }
}
