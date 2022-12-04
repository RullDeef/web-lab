import { UserRegisterFormComponent } from './components/admin/forms/user-register-form/user-register-form.component';
import { UsersViewComponent } from './components/admin/users-view/users-view.component';
import { PagerComponent } from './components/utils/pager/pager.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsersListItemComponent } from './components/admin/users-list-item/users-list-item.component';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PaginatePipe } from './pipes/paginate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdminHomeComponent,
    UsersListComponent,
    UsersListItemComponent,
    HomePageComponent,
    LoginPageComponent,
    UsersViewComponent,
    PagerComponent,
    PaginatePipe,
    UserRegisterFormComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [
    AuthService,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
