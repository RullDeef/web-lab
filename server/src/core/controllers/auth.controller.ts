import {
  Body,
  Controller,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthDto } from '../dto/auth.dto';
import { RespondAuthDto } from '../dto/respond-auth.dto';
import { RespondUserDto } from '../dto/respond-user.dto';
import { AuthService } from '../services/auth/auth.service';
import { LocalAuthGuard } from '../services/auth/local.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  @ApiOkResponse({
    description: 'Успешная авторизация',
    type: RespondAuthDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Неверные логин и/или пароль',
  })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Body() auth: AuthDto) {
    this.logger.log('login', auth);

    const { access_token } = await this.authService.login(req.user);
    return { access_token, user: new RespondUserDto(req.user) };
  }
}
