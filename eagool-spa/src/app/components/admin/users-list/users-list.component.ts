import { User } from 'src/app/models/user.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  @Input() users: User[] = [];

  constructor() {}

  ngOnInit() {}
}
