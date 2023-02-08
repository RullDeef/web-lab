import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UserRole } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() role?: UserRole;
  links: Array<{ page: string, path: string }> = [];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    if (this.role === undefined)
      return;

    if (this.role == UserRole.ADMIN) {
      this.links = [
        { page: 'Users', path: '/admin-home/users' },
        { page: 'Groups', path: '/admin-home/groups' },
        { page: 'Texts', path: '/admin-home/texts' },
      ];
    }
    else if (this.role == UserRole.STUDENT) {
      this.links = [
        { page: 'Texts', path: '/student-home/texts' },
      ];
    }
    else if (this.role == UserRole.TUTOR) {
      this.links = [
        { page: 'Groups', path: '/teacher-home/groups' },
        { page: 'Texts', path: '/teacher-home/texts' },
      ];
    }
    else {
      throw Error(`invalid role value: ${this.role}`);
    }
  }

  public isLogged(): boolean {
    return this.auth.isLogged();
  }

  public logout(): void {
    this.auth.logout();
  }
}
