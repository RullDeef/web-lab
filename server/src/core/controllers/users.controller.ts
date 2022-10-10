import { Body, Controller, Delete, Get, Logger, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersService } from "../services/users.service";

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(
        private readonly service: UsersService
    ) { }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        this.logger.log('create', dto);

        return await this.service.create(dto);
    }

    @Get()
    async findAll() {
        this.logger.log('findAll');

        return await this.service.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        this.logger.log('findById id=' + id);

        return await this.service.findById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        this.logger.log('delete id=' + id);

        return await this.service.delete(id);
    }
}
