import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  get username(): AbstractControl<any, any> | null {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl<any, any> | null {
    return this.loginForm.get('password');
  }

  login(): void {
    this.auth.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        res => {
          console.log(res);
          if (res.access_token !== undefined) {
            this.router.navigate(['/']);
          } else {
            alert('Invalid credentials')
          }
        }
      );
  }
}
