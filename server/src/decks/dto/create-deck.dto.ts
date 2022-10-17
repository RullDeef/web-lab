import { ApiProperty } from '@nestjs/swagger';
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
}
