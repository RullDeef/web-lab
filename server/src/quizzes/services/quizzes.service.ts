import { Inject, Injectable, Logger } from '@nestjs/common';
import { FilterOptions } from '../../core/repos/interfaces/filter-options.interface';
import { CreateQuizResultDto } from '../dto/create-quiz-result.dto';
import { Quiz } from '../models/quiz.model';
import { QuizRepository } from '../repos/interfaces/quiz.repo';

@Injectable()
export class QuizzesService {
  private readonly logger = new Logger(QuizzesService.name);

  constructor(
    @Inject(QuizRepository)
    private readonly quizRepo: QuizRepository,
  ) {}

  async create(quiz: Quiz) {
    this.logger.log('create', quiz);

    return this.quizRepo.save(quiz);
  }

  async findAll(filterOpts: FilterOptions) {
    this.logger.log(`findAll filterOpts=${JSON.stringify(filterOpts)}`);

    return this.quizRepo.findFiltered(filterOpts);
  }

  async findById(id: number) {
    this.logger.log(`findById id=${id}`);

    return this.quizRepo.findById(id);
  }

  async delete(id: number) {
    this.logger.log(`delete id=${id}`);

    return this.quizRepo.delete(id);
  }

  async solve(id: number, solution: CreateQuizResultDto) {
    this.logger.log(`solve id=${id}`);

    ///TODO: implement
  }
}
