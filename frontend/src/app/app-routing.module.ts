import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminGroupsComponent } from './pages/admin/admin-groups/admin-groups.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminTextsComponent } from './pages/admin/admin-texts/admin-texts.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'admin-home',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
    children: [
      { path: 'users', component: AdminUsersComponent },
      { path: 'groups', component: AdminGroupsComponent },
      { path: 'texts', component: AdminTextsComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
