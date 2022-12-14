import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/models/column';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  columns: Array<Column> = [
    {columnDef: 'id', header: 'ID', cell: (element: Record<string, any>) => `${element['id']}`},
    {columnDef: 'first_name', header: 'Имя', cell: (element: Record<string, any>) => `${element['first_name']}`},
    {columnDef: 'last_name', header: 'Фамилия', cell: (element: Record<string, any>) => `${element['last_name']}`},
    // {columnDef: 'controls', header: 'Управление', cell: (element: Record<string, any>) => `${element['controls']}`},
  ];

  dataSource = new MatTableDataSource<User>();
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 10;
  }

  refresh(): void {
    this.userService.getUsers().subscribe((users: Array<User>) => {
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.paginator = this.paginator;
    });
  }
}
