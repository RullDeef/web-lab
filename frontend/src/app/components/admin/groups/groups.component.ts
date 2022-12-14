import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/models/column';
import { StudyGroup } from 'src/app/models/study_group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  tableColumns: Array<Column> = [
    {columnDef: 'id', header: 'ID', cell: (element: Record<string, any>) => `${element['id']}`},
    {columnDef: 'title', header: 'Группа', cell: (element: Record<string, any>) => `${element['title']}`},
    {columnDef: 'tutor_id', header: 'Руководитель', cell: (element: Record<string, any>) => `${element['tutor']['last_name']}`},
  ];

  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource = new MatTableDataSource<StudyGroup>();

  constructor(
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 10;
  }

  refresh(): void {
    this.groupService.getGroups().subscribe((groups: Array<StudyGroup>) => {
      this.dataSource = new MatTableDataSource<StudyGroup>(groups);
      this.dataSource.paginator = this.paginator;
    });
  }
}
