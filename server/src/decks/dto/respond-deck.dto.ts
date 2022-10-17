import { ApiProperty } from '@nestjs/swagger';
import { Deck } from '../entities/deck.entity';
import { RespondCardDto } from './respond-card.dto';

export class RespondDeckDto {
  @ApiProperty({
    description: 'Идентификатор колоды',
  })
  id: number;

  @ApiProperty({
    description: 'Название колоды',
    example: 'Unit 1 words',
  })
  title: string;

  @ApiProperty({
    description: 'Список карточек',
    type: RespondCardDto,
    isArray: true,
  })
  cards: RespondCardDto[];

  constructor(deck: Deck) {
    this.id = deck.id;
    this.title = deck.title;
    this.cards = deck.cards.map((c) => new RespondCardDto(c));
  }
}
