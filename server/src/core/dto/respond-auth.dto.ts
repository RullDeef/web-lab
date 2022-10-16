import { ApiProperty } from "@nestjs/swagger";

export class RespondAuthDto {
  @ApiProperty({
    description: 'Токен для авторизации'
  })
  access_token: string;
}
