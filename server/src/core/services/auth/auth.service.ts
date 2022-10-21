import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../models/user.model';
import { UsersService } from '../users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string) {
    this.logger.log(`validateUser login=${login} password=***`);

    const user = await this.usersService.findByLogin(login);

    if (
      user &&
      (await this.usersService.checkPassword(password, user.password))
    ) {
      const { login, password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }

  async login(user: User) {
    this.logger.log('login', user);

    const payload = { username: user.login, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    this.logger.log(`token generated: ${access_token}`);
    return { access_token };
  }
}
