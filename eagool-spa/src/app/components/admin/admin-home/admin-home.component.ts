import { Component, Input, OnInit } from '@angular/core';

import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  users: User[] = [];

  constructor(private usersService: UsersService) {
    this.usersService.getAll().subscribe((users) => (this.users = users));
  }

  registerUser(user: User) {
    this.usersService.createUser(user).subscribe(user => this.users.push(user));
  }
}
