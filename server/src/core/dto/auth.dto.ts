import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({
    description: 'Логин пользователя',
  })
  login: string;

  @ApiProperty({
    description: 'Пароль пользователя',
  })
  password: string;
}