import { Controller,Get,Body, Res } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}
    @Get()
    async create(@Body() data: object, @Res() res) {
        res.json({mes:'thanh'})
    }

}
