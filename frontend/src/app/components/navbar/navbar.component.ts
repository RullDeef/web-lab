import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() role!: string;
  links: Array<{page: string, path: string}> = [];  

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    if (this.role === 'admin') {
      this.links = [
        {page: 'Home', path: '/admin-home'},
        {page: 'Users', path: '/admin-home/users'},
        {page: 'Groups', path: '/admin-home/groups'},
        {page: 'Texts', path: '/admin-home/texts'},
      ];
    }
  }

  public isLogged(): boolean {
    return this.auth.isLogged();
  }

  public logout(): void {
    this.auth.logout();
  }
}
