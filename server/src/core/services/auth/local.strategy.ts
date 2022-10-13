import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(LocalStrategy.name);

    constructor(
        private readonly authService: AuthService
    ) {
        super({ usernameField: 'login' });
    }

    async validate(login: string, password: string) {
        this.logger.log('validate login=' + login + ' password=' + password);

        const user = await this.authService.validateUser(login, password);

        if (user == null) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
