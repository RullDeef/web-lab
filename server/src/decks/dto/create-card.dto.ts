import { ApiProperty } from '@nestjs/swagger';
import { Card } from '../models/card.model';

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

  toModel(): Card {
    const card = new Card();

    card.word = this.word;
    card.reading = this.reading;
    card.translation = this.translation;

    return card;
  }
}
