import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit() {}

  logout() {
    console.log('logouted!');
    
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }
}
