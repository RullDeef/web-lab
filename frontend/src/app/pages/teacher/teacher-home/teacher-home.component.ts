import { Component } from '@angular/core';
import { UserRole } from 'src/app/models/user';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent {
  UserRole = UserRole;
}
