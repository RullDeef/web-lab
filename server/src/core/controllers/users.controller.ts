import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
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
import { CreateUserDto } from '../dto/create-user.dto';
import { EditUserDto } from '../dto/edit-user.dto';
import { FilterOptsQuery, FilterOptsQueryDto } from '../dto/filter-opts.query.dto';
import { RespondUserDto } from '../dto/respond-user.dto';
import { JwtGuard } from '../services/auth/jwt.guard';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly service: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Пользователь успешно создан',
    type: RespondUserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @ApiForbiddenResponse({
    description:
      'У пользователя недостаточно прав для выполнения этого действия',
  })
  @ApiConflictResponse({
    description: 'Пользователь с таким логином уже существует',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async create(@Request() req, @Body() dto: CreateUserDto) {
    this.logger.log('create', dto);
    this.logger.log('by user', req.user);

    const user = await this.service.create(dto);
    return new RespondUserDto(user);
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
    type: RespondUserDto,
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
  async findAll(@Request() req, @FilterOptsQuery() filterOpts: FilterOptsQueryDto) {
    this.logger.log(`findAll filterOpts=${JSON.stringify(filterOpts)}`);
    this.logger.log('by user', req.user);

    const users = await this.service.findAll(filterOpts);
    return users.map((u) => new RespondUserDto(u));
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Идентификатор пользователя',
  })
  @ApiOkResponse({
    description: 'Пользователь найден',
    type: RespondUserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @ApiForbiddenResponse({
    description:
      'У пользователя недостаточно прав для выполнения этого действия',
  })
  @ApiNotFoundResponse({
    description: 'Пользователь не найден',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async findById(@Param('id') id: number) {
    this.logger.log('findById id=' + id);

    const user = await this.service.findById(id);
    return new RespondUserDto(user);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Идентификатор пользователя',
  })
  @ApiOkResponse({
    description: 'Пользователь найден',
    type: RespondUserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @ApiForbiddenResponse({
    description:
      'У пользователя недостаточно прав для выполнения этого действия',
  })
  @ApiNotFoundResponse({
    description: 'Пользователь не найден',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async edit(@Param('id') id: number, @Body() data: EditUserDto) {
    this.logger.log('edit id=' + id);

    const user = await this.service.edit(id, data);
    return new RespondUserDto(user);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Идентификатор пользователя',
  })
  @ApiNoContentResponse({
    description: 'Пользователь успешно удален',
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
