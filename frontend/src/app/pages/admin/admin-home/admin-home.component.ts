import { Component } from '@angular/core';
import { UserRole } from 'src/app/models/user';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {
  UserRole = UserRole;

}
