import { Controller,Get,Body, Res, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}
    @Post()
    async create(@Body() data: object, @Res() res) {
        try {
            await this.userService.create(data);
            res.status(200).json({ mes: 'create successfully' });
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
