import { ApiProperty } from '@nestjs/swagger';
import { Deck } from '../models/deck.model';
import { CreateCardDto } from './create-card.dto';

export class CreateDeckDto {
  @ApiProperty({
    description: 'Название колоды',
    example: 'Unit 1 words',
  })
  title: string;

  @ApiProperty({
    description: 'Список карточек',
    type: CreateCardDto,
    isArray: true,
  })
  cards: CreateCardDto[];

  toModel(): Deck {
    const deck = new Deck();

    deck.title = this.title;
    deck.cards = this.cards.map((c) => c.toModel());
    deck.study_groups = [];

    return deck;
  }
}
