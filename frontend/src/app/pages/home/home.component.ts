import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserRole } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const role = this.auth.getRole();
    if (role == '') {
      return;
    }

    if (role == UserRole.ADMIN) {
      this.router.navigate(['/admin-home']);
    }
    else if (role == UserRole.STUDENT) {
      this.router.navigate(['/student-home']);
    }
    else if (role == UserRole.TUTOR) {
      this.router.navigate(['/teacher-home']);
    }
    else {
      throw Error(`invalid role value: ${role}`);
    }
  }
}
