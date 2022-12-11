import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
