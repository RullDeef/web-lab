import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/models/column';
import { User } from 'src/app/models/user';

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

  data: Array<User> = [
    new User(1, 'Klim', 'Kornienko'),
    new User(2, 'Alexey', 'Klimenko'),
  ]

  constructor() { }

  ngOnInit(): void {

  }

}
