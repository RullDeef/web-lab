import { Component, Output, EventEmitter } from '@angular/core';
import { User, UserRole } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.css'],
})
export class UserRegisterFormComponent {
  first_name: string = '';
  last_name: string = '';
  role: UserRole = UserRole.STUDENT;
  login: string = '';
  password: string = '';
  passwordConfirm: string = '';

  @Output() user = new EventEmitter<User>();

  constructor(private usersService: UsersService) {}

  onSubmit() {
    if (this.validateFields()) {
      this.usersService
        .loginUnique(this.login.trim())
        .subscribe((unique: boolean) => {
          if (!unique) {
            alert('Данный логин уже присутствует в системе');
          } else {
            this.user.emit({
              first_name: this.first_name.trim(),
              last_name: this.last_name.trim(),
              role: this.role,
              login: this.login.trim(),
              password: this.password,
            });
            this.clearForm();
          }
        });
    }
  }

  private validateFields(): boolean {
    if (this.first_name.trim() === '') {
      alert('Поле с именем не заполнено!');
    } else if (this.last_name.trim() === '') {
      alert('Поле с фамилией не заполнено!');
    } else if (this.login.trim() === '') {
      alert('Поле с логином не заполнено!');
    } else if (this.password.trim() === '') {
      alert('Поле с паролем не заполнено!');
    } else if (this.password !== this.passwordConfirm) {
      alert('пароли не совпадают!');
    } else {
      return true;
    }
    return false;
  }

  private clearForm() {
    this.first_name = '';
    this.last_name = '';
    this.role = UserRole.STUDENT;
    this.login = '';
    this.password = '';
    this.passwordConfirm = '';
  }
}
