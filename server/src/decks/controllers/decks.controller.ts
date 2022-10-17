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
import { CreateDeckDto } from '../dto/create-deck.dto';
import { RespondDeckDto } from '../dto/respond-deck.dto';
import { DecksService } from '../services/decks.service';

@ApiTags('Decks')
@Controller('decks')
export class DecksController {
  private readonly logger = new Logger(DecksController.name);

  constructor(private readonly service: DecksService) {}

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
    this.logger.log('create', dto);
    this.logger.log('by user', req.user);

    const deck = await this.service.create(dto);
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
  async findAll(@Request() req) {
    this.logger.log('findAll');
    this.logger.log('by user', req.user);

    const decks = await this.service.findAll();
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
    this.logger.log('findById id=' + id);

    const deck = await this.service.findById(id);
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
    this.logger.log('delete id=' + id);

    await this.service.delete(id);
  }
}
