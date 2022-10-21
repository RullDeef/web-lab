import { ApiProperty } from '@nestjs/swagger';
import { RespondUserDto } from './respond-user.dto';

export class RespondAuthDto {
  @ApiProperty({
    description: 'Токен для авторизации',
  })
  access_token: string;

  @ApiProperty({
    description: 'Данные пользователя',
  })
  user: RespondUserDto;
}
