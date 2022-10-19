import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { DecksController } from './controllers/decks.controller';
import { DeckRepository } from './repos/interfaces/deck.repo';
import { TypeORMDeckRepository } from './repos/typeorm/deck.repo';
import { CardEntity } from './repos/typeorm/entities/card.entity';
import { DeckEntity } from './repos/typeorm/entities/deck.entity';
import { DecksService } from './services/decks.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, DeckEntity]), CoreModule],
  providers: [
    {
      provide: DeckRepository,
      useClass: TypeORMDeckRepository,
    },
    DecksService,
  ],
  controllers: [DecksController],
})
export class DecksModule {}
