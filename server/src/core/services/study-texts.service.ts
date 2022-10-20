import { Inject, Injectable, Logger } from '@nestjs/common';
import { StudyText } from '../models/study-text.model';
import { FilterOptions } from '../repos/interfaces/filter-options.interface';
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
