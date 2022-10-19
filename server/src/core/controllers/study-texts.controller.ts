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
import { CreateStudyTextDto } from '../dto/create-study-text.dto';
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
  @ApiOkResponse({
    description: 'Успешный ответ',
    type: RespondStudyTextDto,
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
  async getAll() {
    this.logger.log('getAll');

    const texts = await this.textsService.findAll();
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
