import { Inject, Injectable, Logger } from '@nestjs/common';
import { StudyText } from '../models/study-text.model';
import { StudyTextRepository } from '../repos/interfaces/study-text.repo';

@Injectable()
export class StudyTextService {
  private readonly logger = new Logger(StudyTextService.name);

  constructor(
    @Inject(StudyTextRepository)
    private repository: StudyTextRepository,
  ) {}

  async create(text: StudyText) {
    this.logger.log('create');
    this.logger.log(JSON.stringify(text));

    return this.repository.save(text);
  }

  async findAll() {
    this.logger.log('findAll');

    return this.repository.findAll();
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
