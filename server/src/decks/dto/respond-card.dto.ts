import { ApiProperty } from '@nestjs/swagger';
import { Card } from '../models/card.model';

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

  constructor(CardEntity: Card) {
    this.id = CardEntity.id;
    this.word = CardEntity.word;
    this.reading = CardEntity.reading;
    this.translation = CardEntity.translation;
  }
}
