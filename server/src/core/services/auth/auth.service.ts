import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users.service";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(login: string, password: string) {
        this.logger.log('validateUser login=' + login + ' password=' + password);

        const user = await this.usersService.findByLogin(login);

        if (user && user.password == password) {
            const { login, password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        this.logger.log('login', user);

        const payload = { username: user.login, sub: user.id };
        const access_token = this.jwtService.sign(payload);

        this.logger.log('token generated: ' + access_token);
        return { access_token };
    }
}