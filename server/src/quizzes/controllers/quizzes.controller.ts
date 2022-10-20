import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FilterOptsQuery, FilterOptsQueryDto } from '../../core/dto/filter-opts.query.dto';
import { JwtGuard } from '../../core/services/auth/jwt.guard';
import { UsersService } from '../../core/services/users.service';
import { CreateQuizResultDto } from '../dto/create-quiz-result.dto';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { RespondQuizDto } from '../dto/respond-quiz.dto';
import { QuizzesService } from '../services/quizzes.service';

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizzesController {
  private readonly logger = new Logger(QuizzesController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly quizzesService: QuizzesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Тест успешно создан',
    type: RespondQuizDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @ApiForbiddenResponse({
    description:
      'У пользователя недостаточно прав для выполнения этого действия',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async create(@Request() req, @Body() dto: CreateQuizDto) {
    this.logger.log('create', dto);
    this.logger.log('by user', req.user);

    let quiz = dto.toModel();
    quiz.creator = await this.usersService.findById(req.user.userId);
    quiz = await this.quizzesService.create(quiz);
    return new RespondQuizDto(quiz);
  }

  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Количество записей, которые необходимо получить',
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: 'Количество записей, которые необходимо пропустить',
    type: Number,
    example: 0,
  })
  @ApiOkResponse({
    description: 'Успешный ответ',
    type: RespondQuizDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'некорректный запрос',
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @ApiForbiddenResponse({
    description:
      'У пользователя недостаточно прав для выполнения этого действия',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async findAll(@FilterOptsQuery() filterOpts: FilterOptsQueryDto) {
    this.logger.log(`findAll filterOpts=${JSON.stringify(filterOpts)}`);

    const decks = await this.quizzesService.findAll(filterOpts);
    return decks.map((d) => new RespondQuizDto(d));
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Идентификатор теста',
  })
  @ApiOkResponse({
    description: 'Тест найден',
    type: RespondQuizDto,
  })
  @ApiNotFoundResponse({
    description: 'Тест не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @ApiForbiddenResponse({
    description:
      'У пользователя недостаточно прав для выполнения этого действия',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async findById(@Param('id') id: number) {
    this.logger.log(`findById id=${id}`);

    const deck = await this.quizzesService.findById(id);
    return new RespondQuizDto(deck);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Идентификатор Теста',
  })
  @ApiNoContentResponse({
    description: 'Тест успешно удален',
  })
  @ApiNotFoundResponse({
    description: 'Тест не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @ApiForbiddenResponse({
    description:
      'У пользователя недостаточно прав для выполнения этого действия',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async delete(@Param('id') id: number) {
    this.logger.log('delete id=' + id);

    await this.quizzesService.delete(id);
  }

  @Post(':id')
  @ApiParam({
    name: 'id',
    description: 'Идентификатор Теста',
  })
  @ApiNoContentResponse({
    description: 'Решение успешно добавлено',
  })
  @ApiNotFoundResponse({
    description: 'Тест не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @ApiForbiddenResponse({
    description:
      'У пользователя недостаточно прав для выполнения этого действия',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async solve(@Param('id') id: number, result: CreateQuizResultDto) {
    this.logger.log(`solve id=${id}`);

    await this.quizzesService.solve(id, result);
  }
}
