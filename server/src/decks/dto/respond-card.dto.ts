import { ApiProperty } from "@nestjs/swagger";
import { Card } from "../entities/card.entity";

export class RespondCardDto {
  @ApiProperty({
    description: 'Идентификатор карточки',
  })
  id: number;

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

  constructor(card: Card) {
    this.id = card.id;
    this.word = card.word;
    this.reading = card.reading;
    this.translation = card.translation;
  }
}
