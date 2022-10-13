import { Body, Controller, Delete, Get, Logger, Param, Post, Request, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import { JwtGuard } from "../services/auth/jwt.guard";
import { UsersService } from "../services/users.service";

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(
        private readonly service: UsersService
    ) { }

    @UseGuards(JwtGuard)
    @Post()
    async create(@Request() req, @Body() dto: CreateUserDto) {
        this.logger.log('create', dto);
        this.logger.log('by user', req.user);

        return (await this.service.create(dto)).stripCredentials();
    }

    @UseGuards(JwtGuard)
    @Get()
    async findAll(@Request() req) {
        this.logger.log('findAll');
        this.logger.log('by user', req.user);

        return (await this.service.findAll()).map((u: User) => u.stripCredentials());
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        this.logger.log('findById id=' + id);

        return (await this.service.findById(id)).stripCredentials();
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        this.logger.log('delete id=' + id);

        await this.service.delete(id);
    }
}
