import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deck } from '../../models/deck.model';
import { DeckRepository } from '../interfaces/deck.repo';
import { DeckEntity } from './entities/deck.entity';

@Injectable()
export class TypeORMDeckRepository implements DeckRepository {
  private readonly logger = new Logger(TypeORMDeckRepository.name);

  constructor(
    @InjectRepository(DeckEntity)
    private readonly repo: Repository<DeckEntity>,
  ) {}

  async save(deck: Deck): Promise<Deck> {
    let entity = DeckEntity.fromModel(deck);
    entity = this.repo.create(entity);
    entity = await this.repo.save(entity);
    return entity.toModel();
  }

  async findAll(): Promise<Deck[]> {
    const decks = await this.repo.find({ relations: { creator: true } });
    return decks.map((d) => d.toModel());
  }

  async findById(id: number): Promise<Deck> {
    try {
      const deck = await this.repo.findOneByOrFail({ id });
      return deck.toModel();
    } catch (e) {
      this.logger.log(`exception: ${e}`);
      throw new NotFoundException();
    }
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id });
  }
}
