import { ApiProperty } from '@nestjs/swagger';

export class EditUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
    required: false,
  })
  first_name: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Иванов',
    required: false,
  })
  last_name: string;

  @ApiProperty({
    description: 'Логин пользователя',
    required: false,
  })
  login: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    required: false,
  })
  password: string;
}
