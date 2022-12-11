import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() links: Array<{ label: string, path: string }> = [];

  constructor(private auth: AuthService) { }

  public isLogged(): boolean {
    return this.auth.isLogged();
  }

  public logout(): void {
    this.auth.logout();
  }
}
