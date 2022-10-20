import { Inject, Injectable, Logger } from '@nestjs/common';
import { FilterOptions } from '../../core/repos/interfaces/filter-options.interface';
import { Deck } from '../models/deck.model';
import { DeckRepository } from '../repos/interfaces/deck.repo';

@Injectable()
export class DecksService {
  private readonly logger = new Logger(DecksService.name);

  constructor(
    @Inject(DeckRepository)
    private readonly repository: DeckRepository,
  ) {}

  async create(deck: Deck) {
    this.logger.log('create', deck);

    return this.repository.save(deck);
  }

  async findAll(filterOpts: FilterOptions) {
    this.logger.log(`findAll filterOpts=${JSON.stringify(filterOpts)}`);

    return this.repository.findFiltered(filterOpts);
  }

  async findById(id: number) {
    this.logger.log(`findById id=${id}`);

    return this.repository.findById(id);
  }

  async delete(id: number) {
    this.logger.log(`delete id=${id}`);

    return this.repository.delete(id);
  }
}
