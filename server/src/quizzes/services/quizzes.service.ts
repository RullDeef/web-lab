import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../core/entities/user.entity';
import { CreateQuizResultDto } from '../dto/create-quiz-result.dto';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { QuizOption } from '../entities/quiz-option.entity';
import { QuizQuestion } from '../entities/quiz-question.entity';
import { Quiz } from '../entities/quiz.entity';

@Injectable()
export class QuizzesService {
  private readonly logger = new Logger(QuizzesService.name);

  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @InjectRepository(QuizQuestion)
    private readonly questionRepo: Repository<QuizQuestion>,
    @InjectRepository(QuizOption)
    private readonly optionRepo: Repository<QuizOption>,
  ) {}

  async create(dto: CreateQuizDto, creator: User) {
    this.logger.log('create', dto);

    const quiz_data: Partial<Quiz> = {};
    quiz_data.title = dto.title;
    quiz_data.creator = creator;

    const quiz = this.quizRepo.create(quiz_data);
    quiz.questions = dto.questions.map((q) => {
      const question: Partial<QuizQuestion> = {};
      question.question = q.question;
      question.options = q.options.map((o, index) => {
        const option: Partial<QuizOption> = {};
        option.content = o;
        option.is_correct = q.correct_options.includes(index + 1);

        return this.optionRepo.create(option);
      });

      return this.questionRepo.create(question);
    });

    return await this.quizRepo.save(quiz);
  }

  async findAll() {
    this.logger.log('findAll');

    return await this.quizRepo.find();
  }

  async findById(id: number) {
    this.logger.log('findById id=' + id);

    return await this.quizRepo.findOneBy({ id });
  }

  async delete(id: number) {
    this.logger.log('delete id=' + id);

    return await this.quizRepo.delete({ id });
  }

  async solve(id: number, solution: CreateQuizResultDto) {
    this.logger.log('solve id=' + id);

    ///TODO: implement
  }
}
