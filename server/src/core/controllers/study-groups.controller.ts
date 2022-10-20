import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateStudyGroupDto } from '../dto/create-study-group.dto';
import { FilterOptsQuery, FilterOptsQueryDto } from '../dto/filter-opts.query.dto';
import { RespondStudyGroupDto } from '../dto/respond-study-group.dto';
import { JwtGuard } from '../services/auth/jwt.guard';
import { StudyGroupsService } from '../services/study-groups.service';

@ApiTags('Study Groups')
@Controller('study-groups')
export class StudyGroupsController {
  private readonly logger = new Logger(StudyGroupsController.name);

  constructor(private readonly service: StudyGroupsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Учебная группа успешно создана',
    type: RespondStudyGroupDto,
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
  async create(@Body() body: CreateStudyGroupDto) {
    this.logger.log('create', body);

    const group = await this.service.create(body);
    return new RespondStudyGroupDto(group);
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
    type: RespondStudyGroupDto,
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
    this.logger.log(`getAll filterOpts=${JSON.stringify(filterOpts)}`);

    const groups = await this.service.findAll(filterOpts);
    return groups.map((g) => new RespondStudyGroupDto(g));
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Успешный ответ',
    type: RespondStudyGroupDto,
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
    this.logger.log('getById id=' + id);

    const group = await this.service.findById(id);
    return new RespondStudyGroupDto(group);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'Группа успешно удалена',
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

    await this.service.delete(id);
  }
}
