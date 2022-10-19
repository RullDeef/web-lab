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
import { CreateDeckDto } from '../dto/create-deck.dto';
import { RespondDeckDto } from '../dto/respond-deck.dto';
import { DecksService } from '../services/decks.service';

@ApiTags('Decks')
@Controller('decks')
export class DecksController {
  private readonly logger = new Logger(DecksController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly decksService: DecksService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Колода успешно создана',
    type: RespondDeckDto,
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
  async create(@Request() req, @Body() dto: CreateDeckDto) {
    this.logger.log('create');
    this.logger.log(dto);

    let deck = dto.toModel();
    deck.creator = await this.usersService.findById(req.user.userId);
    deck = await this.decksService.create(deck);

    return new RespondDeckDto(deck);
  }

  @Get()
  @ApiOkResponse({
    description: 'Успешный ответ',
    type: RespondDeckDto,
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

    const decks = await this.decksService.findAll();
    return decks.map((d) => new RespondDeckDto(d));
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Идентификатор колоды',
  })
  @ApiOkResponse({
    description: 'Колода найдена',
    type: RespondDeckDto,
  })
  @ApiNotFoundResponse({
    description: 'Колода не найдена',
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

    const deck = await this.decksService.findById(id);
    return new RespondDeckDto(deck);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Идентификатор колоды',
  })
  @ApiNoContentResponse({
    description: 'Колода успешно удалена',
  })
  @ApiNotFoundResponse({
    description: 'Колода не найдена',
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

    await this.decksService.delete(id);
  }
}
