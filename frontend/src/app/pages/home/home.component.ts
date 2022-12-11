import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  role!: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.role = this.auth.getRole();
      if (this.role === 'admin') {
        this.router.navigate(['/admin-home']);
      } else if (this.role === 'student') {
        this.router.navigate(['/user-home']);
      } else if (this.role === 'tutor') {
        this.router.navigate(['/teacher-home']);
      }
  }
}
