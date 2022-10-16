import { ApiProperty } from "@nestjs/swagger";

export class CreateCardDto {
  @ApiProperty({
    description: 'Написание слова или фразы',
    example: 'mainstream',
  })
  word: string;

  @ApiProperty({
    description: 'Транскрипция слова или фразы',
    example: '[ˈmeɪnstriːm]',
  })
  reading: string;

  @ApiProperty({
    description: 'Перевод слова или фразы',
    example: 'общепринятый',
  })
  translation: string;
}
