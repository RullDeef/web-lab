import { Component } from '@angular/core';
import { UserRole } from 'src/app/models/user';

@Component({
  selector: 'app-user-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent {
  UserRole = UserRole;
}
