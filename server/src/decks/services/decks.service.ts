import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeckDto } from '../dto/create-deck.dto';
import { Deck } from '../entities/deck.entity';

@Injectable()
export class DecksService {
  private readonly logger = new Logger(DecksService.name);

  constructor(
    @InjectRepository(Deck)
    private readonly repository: Repository<Deck>,
  ) {}

  async create(deck: CreateDeckDto) {
    this.logger.log('create', deck);

    const d = this.repository.create(deck);
    return await this.repository.save(d);
  }

  async findAll() {
    this.logger.log('findAll');

    return await this.repository.find();
  }

  async findById(id: number) {
    this.logger.log('findById id=' + id);

    return await this.repository.findOneBy({ id });
  }

  async delete(id: number) {
    this.logger.log('delete id=' + id);

    return await this.repository.delete({ id });
  }
}
