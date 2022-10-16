import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { DecksController } from './controllers/decks.controller';
import { Card } from './entities/card.entity';
import { Deck } from './entities/deck.entity';
import { DecksService } from './services/decks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Card, Deck,
    ]),
    CoreModule, 
  ],
  providers: [DecksService],
  controllers: [DecksController],
})
export class DecksModule {}
