import { User } from './../../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css'],
})
export class UsersViewComponent implements OnInit {
  @Input() users: User[] = [];

  itemsPerPage: number = 20;
  currentPage: number = 1;

  constructor() {}

  ngOnInit() {}

  onUsersPageChanged(page: number) {
    this.currentPage = page;
  }
}
