import { Body, Controller, Delete, Get, Logger, Param, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtGuard } from "../../core/services/auth/jwt.guard";
import { CreateQuizDto } from "../dto/create-quiz.dto";
import { RespondQuizDto } from "../dto/respond-quiz.dto";
import { QuizzesService } from "../services/quizzes.service";

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizzesController {
  private readonly logger = new Logger(QuizzesController.name);

  constructor(private readonly service: QuizzesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Тест успешно создан',
    type: RespondQuizDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async create(@Request() req, @Body() dto: CreateQuizDto) {
    this.logger.log('create', dto);
    this.logger.log('by user', req.user);

    const quiz = await this.service.create(dto, req.user);
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
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async findAll(@Request() req) {
    this.logger.log('findAll');
    this.logger.log('by user', req.user);

    const decks = await this.service.findAll();
    return decks.map(d => new RespondQuizDto(d));
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
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async findById(@Param('id') id: number) {
    this.logger.log('findById id=' + id);

    const deck = await this.service.findById(id);
    return new RespondQuizDto(deck);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Идентификатор Теста',
  })
  @ApiNoContentResponse({
    description: 'Тест успешно удален'
  })
  @ApiNotFoundResponse({
    description: 'Тест не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async delete(@Param('id') id: number) {
    this.logger.log('delete id=' + id);

    await this.service.delete(id);
  }
}
