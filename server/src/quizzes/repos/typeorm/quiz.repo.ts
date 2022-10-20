import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterOptions } from '../../../core/repos/interfaces/filter-options.interface';
import { Quiz } from '../../models/quiz.model';
import { QuizRepository } from '../interfaces/quiz.repo';
import { QuizEntity } from './entities/quiz.entity';

@Injectable()
export class TypeORMQuizRepository implements QuizRepository {
  private readonly logger = new Logger(TypeORMQuizRepository.name);

  constructor(
    @InjectRepository(QuizEntity)
    private readonly repo: Repository<QuizEntity>,
  ) {}

  async save(quiz: Quiz): Promise<Quiz> {
    let entity = QuizEntity.fromModel(quiz);
    entity = this.repo.create(entity);
    entity = await this.repo.save(entity);
    return entity.toModel();
  }

  async findAll(): Promise<Quiz[]> {
    const quizzes = await this.repo.find({
      relations: {
        creator: true,
        questions: {
          options: true,
        },
      },
    });
    return quizzes.map((q) => q.toModel());
  }

  async findById(id: number): Promise<Quiz> {
    try {
      const quiz = await this.repo.findOneByOrFail({ id });
      return quiz.toModel();
    } catch (e) {
      this.logger.log(`exception: ${e}`);
      throw new NotFoundException();
    }
  }

  async findFiltered(opts: FilterOptions): Promise<Quiz[]> {
    const quizzes = await this.repo.find({
      skip: opts.skip,
      take: opts.limit,
      relations: {
        creator: true,
        questions: {
          options: true,
        },
      },
    });
    return quizzes.map((q) => q.toModel());
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id });
  }
}
