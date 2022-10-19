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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
  @ApiOkResponse({
    description: 'Успешный ответ',
    type: RespondQuizDto,
    isArray: true,
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
  async findAll() {
    this.logger.log('findAll');

    const decks = await this.quizzesService.findAll();
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
