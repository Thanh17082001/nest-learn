import { Body, Controller, Res, Post, Get, UseGuards, Put, UsePipes, ValidationPipe, Param, Query } from '@nestjs/common';
import { RolesCreateDto } from './dto/roles.createDto';
import {query, Response} from 'express'
import { RolesService } from './roles.service';
import { AuthGuard } from 'src/gruard/auth';
import { RolesUpdateDto } from './dto/roles.updateDto';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}
  @Post('/create')
  async crate(@Body() data: RolesCreateDto, @Res() res: Response) {
    try {
      const roleExits = await this.roleService.findOne({ name: data.name });
      if (!!roleExits) {
        return res.status(400).json({ mes: 'Role already exits!!' });
      }
      await this.roleService.create(data);
      return res.status(200).json({ mes: 'Create successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Res() res: Response) {
    try {
      const roles = await this.roleService.find();
      return res.status(200).json(roles);
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/update')
@UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: true }))
  async update(@Body() data: RolesUpdateDto, @Res() res: Response, @Query() query) {
      try {
          const role = await this.roleService.findById( query.id)
          if (!!!role) {
              return res.status(400).json({mes:'Role not already exits'})
          }
          if (!!!data) {
              return res.status(400).json({ mes: 'Bad request' , status:400});
          }
           const updated=await this.roleService.update(query.id, data)
          return res.status(200).json({
              mes: 'Update successfully',
              data:updated
          })
      } catch (error) {
          console.log(error);
          return res.status(500).json({ mes: 'Server error' });

    }
  }
}
