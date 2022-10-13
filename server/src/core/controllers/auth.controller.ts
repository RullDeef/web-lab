import { Controller, Logger, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth/auth.service";
import { LocalAuthGuard } from "../services/auth/local.guard";

@Controller()
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        this.logger.log('login', req);

        return this.authService.login(req.user);
    }
}
