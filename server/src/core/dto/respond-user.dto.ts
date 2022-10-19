import { ApiProperty } from '@nestjs/swagger';
import { User, UserRole } from '../models/user.model';

export class RespondUserDto {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    type: 'number',
  })
  id: number;

  @ApiProperty({
    description: 'Имя пользователя',
  })
  first_name: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
  })
  last_name: string;

  @ApiProperty({
    description: 'Роль пользователя',
    enum: UserRole,
  })
  role: UserRole;

  constructor(user: User) {
    this.id = user.id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.role = user.role;
  }
}
