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
import { TeacherGroupsComponent } from './pages/teacher/teacher-groups/teacher-groups.component';
import { TeacherHomeComponent } from './pages/teacher/teacher-home/teacher-home.component';
import { TeacherTextsComponent } from './pages/teacher/teacher-texts/teacher-texts.component';
import { StudentHomeComponent } from './pages/student/student-home/student-home.component';
import { StudentTextsComponent } from './pages/student/student-texts/student-texts.component';

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
  {
    path: 'teacher-home',
    component: TeacherHomeComponent,
    canActivate: [AuthGuard],
    data: { role: 'tutor' },
    children: [
      { path: 'groups', component: TeacherGroupsComponent },
      { path: 'texts', component: TeacherTextsComponent },
    ]
  },
  {
    path: 'student-home',
    component: StudentHomeComponent,
    canActivate: [AuthGuard],
    data: { role: 'student' },
    children: [
      { path: 'texts', component: StudentTextsComponent },
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
