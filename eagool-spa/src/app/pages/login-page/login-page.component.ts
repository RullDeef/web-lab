import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  username: string = '';
  password: string = '';

  isInvalid: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.isInvalid = false;

    this.authService.login(this.username, this.password).subscribe({
      next: (val) => {
        this.username = '';
        this.password = '';
        // redirect to home page
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log(err);
        // invalid credentials
        this.isInvalid = true;
      },
    });
  }
}
