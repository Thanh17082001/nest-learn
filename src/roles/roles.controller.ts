import { Body, Controller, Res, Post, Get } from '@nestjs/common';
import { RolesCreateDto } from './dto/roles.createDto';
import {Response} from 'express'
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(
        private roleService:RolesService
    ){}
    @Post('/create')
    async crate(@Body() data: RolesCreateDto, @Res() res: Response) {
        try {
            const roleExits = await this.roleService.findOne({ name: data.name })
            if (!!roleExits) {
                return res.status(400).json({mes:'Role already exits!!'})
            }
            await this.roleService.create(data);
            return res.status(200).json({mes:'Create successfully'})
        } catch (error) {
            res.status(500).json(error);
        }
    }

    @Get()
    async getAll(@Res() res: Response) {
        try {
            const roles = await this.roleService.find();
            return res.status(200).json(roles)
        } catch (error) {
            console.log(error);
        }
    }
        


}
