import { ApiProperty } from '@nestjs/swagger';
import { User, UserRole } from '../models/user.model';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  first_name: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Иванов',
  })
  last_name: string;

  @ApiProperty({
    description: 'Роль пользователя',
    enum: UserRole,
  })
  role: UserRole;

  @ApiProperty({
    description: 'Логин пользователя',
  })
  login: string;

  @ApiProperty({
    description: 'Пароль пользователя',
  })
  password: string;

  toModel(): User {
    return this as User;
  }
}
