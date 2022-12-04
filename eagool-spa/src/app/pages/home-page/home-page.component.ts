import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isTutor: boolean = false;
  isStudent: boolean = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn();
    if (this.isLoggedIn) {
      switch (authService.getThisUser().role) {
        case UserRole.ADMIN:
          this.isAdmin = true;
          break;
        case UserRole.TUTOR:
          this.isTutor = true;
          break;
        case UserRole.STUDENT:
          this.isStudent = true;
          break;
      }
    }
  }

  ngOnInit() {}
}
