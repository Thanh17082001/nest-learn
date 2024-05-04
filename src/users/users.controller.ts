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
import { AuthGuard } from 'src/gruard/auth';
import { UserUpdaeRoleDto } from './dto/user.updateRoleDto';
import{Response} from 'express'

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private jwt: JwtService,
  ) {}
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
  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Res() res) {
    try {
      const users = await this.userService.getAll();
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: false }))
  @Put('update-role')
  async updateRole(
    @Body() data: UserUpdaeRoleDto,
    @Res() res: Response,
    @Query() query,
  ) {
    try {
      const userId: string = query.userId;
      const result = await this.userService.updateRole(userId, data.roleId)
      console.log(result);
      return res.status(200).json({ mes: 'create successfully' });
    } catch (error) {}
  }
}
