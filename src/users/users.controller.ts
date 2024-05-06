import { Product } from './../products/entities/product.entity';

import {
  Controller,
  Get,
  Body,
  Res,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/users.createDto';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from './dto/users.loginDto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/guard/auth';
import { UserUpdaeRoleDto } from './dto/user.updateRoleDto';
import { Response } from 'express';
import { Roles } from 'src/guard/role.decorator';
import { ApiTags, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { RolesService } from 'src/roles/roles.service';
import { RoleGuard } from 'src/guard/role.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private rolesService: RolesService,
    private jwt: JwtService,
  ) {}

  @ApiBody({
    type: UserCreateDto,
    examples: {
      data: {
        value: {
          email: '',
          fullName: '',
          password: '',
        } as UserCreateDto,
      },
    },
  })
  @Post('/register')
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: true }))
  async create(@Body() data: UserCreateDto, @Res() res) {
    try {
      const userExist = await this.userService.findOne({ email: data.email });
      if (!!userExist) {
        return res.status(400).json({ mes: 'user already exists' });
      }
      data.password = await bcrypt.hash(data.password, 10);
      await this.userService.create(data);
      res.status(200).json({ mes: 'create successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  @ApiBody({
    type: UserLoginDto,
    examples: {
      data: {
        value: {
          email: '',
          password: '',
        } as UserLoginDto,
      },
    },
  })
  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: true }))
  async login(@Body() data: UserLoginDto, @Res() res) {
    try {
      const userExist = await this.userService.findOne({ email: data.email });
      if (!!!userExist) {
        return res.status(400).json({ mes: 'email or password is incorrect' });
      }
      const isPass = await bcrypt.compare(data.password, userExist.password);
      if (!isPass) {
        return res
          .status(400)
          .json({ mes: 'email or password is incorrect 12121' });
      }

      const token = await this.jwt.signAsync(userExist);
      return res.status(200).json({
        token,
        user: userExist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  //middleware tonken
  @Get()
  @Roles('staff')
  @ApiBearerAuth()
  @UseGuards(RoleGuard) //2
  @UseGuards(AuthGuard) //1
  async getAll(@Res() res) {
    try {
      const users = await this.userService.getAll();
      const test = await this.rolesService.find();
      res.json({ test, users });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({ transform: true, disableErrorMessages: false }),
  )
  @ApiBody({
    type: UserUpdaeRoleDto,
    examples: {
      data: {
        value: {
          roleId: '',
        } as UserUpdaeRoleDto,
      },
    },
  })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    required: true,
  })
  //
  @Put('update-role')
  async updateRole(
    @Body() data: UserUpdaeRoleDto,
    @Res() res: Response,
    @Query() query,
  ) {
    try {
      const userId: string = query.userId;
      await this.userService.updateRole(userId, data.roleId);
      return res.status(200).json({ mes: 'create successfully' });
    } catch (error) {}
  }
}
