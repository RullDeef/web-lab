import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminGroupsComponent } from './pages/admin/admin-groups/admin-groups.component';
import { AdminTextsComponent } from './pages/admin/admin-texts/admin-texts.component';
import { AuthGuard } from './auth.guard';
import { TeacherHomeComponent } from './pages/teacher/teacher-home/teacher-home.component';
import { TeacherGroupsComponent } from './pages/teacher/teacher-groups/teacher-groups.component';
import { TeacherTextsComponent } from './pages/teacher/teacher-texts/teacher-texts.component';
import { StudentHomeComponent } from './pages/student/student-home/student-home.component';
import { StudentTextsComponent } from './pages/student/student-texts/student-texts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    AdminHomeComponent,
    AdminUsersComponent,
    AdminGroupsComponent,
    AdminTextsComponent,
    TeacherHomeComponent,
    TeacherGroupsComponent,
    TeacherTextsComponent,
    StudentHomeComponent,
    StudentTextsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
