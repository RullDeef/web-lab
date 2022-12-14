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
import { CreateStudyTextDto } from '../dto/create-study-text.dto';
import { FilterOptsQuery, FilterOptsQueryDto } from '../dto/filter-opts.query.dto';
import { RespondStudyTextDto } from '../dto/respond-study-text.dto';
import { JwtGuard } from '../services/auth/jwt.guard';
import { StudyTextService } from '../services/study-texts.service';
import { UsersService } from '../services/users.service';

@ApiTags('Texts')
@Controller('texts')
export class StudyTextsController {
  private readonly logger = new Logger(StudyTextsController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly textsService: StudyTextService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Текст успешно создан',
    type: RespondStudyTextDto,
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
  async create(@Request() req, @Body() body: CreateStudyTextDto) {
    this.logger.log('create', body);

    let text = CreateStudyTextDto.toModel(body);
    text.creator = await this.usersService.findById(req.user.userId);

    text = await this.textsService.create(text);
    return new RespondStudyTextDto(text);
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
    type: RespondStudyTextDto,
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
  async getAll(@FilterOptsQuery() filterOpts: FilterOptsQueryDto) {
    this.logger.log('getAll');

    const texts = await this.textsService.findAll(filterOpts);
    return texts.map((t) => new RespondStudyTextDto(t));
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Идентификатор текста',
  })
  @ApiOkResponse({
    description: 'Успешный ответ',
    type: RespondStudyTextDto,
  })
  @ApiNotFoundResponse({
    description: 'Текст не найден',
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
  async getById(@Param('id') id: number) {
    this.logger.log(`getById id=${id}`);

    const text = await this.textsService.findById(id);
    return new RespondStudyTextDto(text);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Идентификатор текста',
  })
  @ApiNoContentResponse({
    description: 'Текст успешно удален',
  })
  @ApiNotFoundResponse({
    description: 'Текст не найден',
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
    this.logger.log(`delete id=${id}`);

    await this.textsService.delete(id);
  }
}
