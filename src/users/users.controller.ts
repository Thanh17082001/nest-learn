import { Product } from "./../products/entities/product.entity";

import { Controller, Get, Body, Res, Post, UseGuards, UsePipes, ValidationPipe, Put, Query, Patch, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserCreateDto } from "./dto/users.createDto";
import * as bcrypt from "bcryptjs";
import { UserLoginDto } from "./dto/users.loginDto";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "src/guard/auth";
import { UserUpdaeRoleDto } from "./dto/user.updateRoleDto";
import e, { Response } from "express";
import { Roles } from "src/guard/role.decorator";
import { ApiTags, ApiBody, ApiQuery, ApiBearerAuth } from "@nestjs/swagger";
import { RolesService } from "src/roles/roles.service";
import { RoleGuard } from "src/guard/role.guard";
import { Tokens } from "./types/tokens.type";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(
    private userService: UsersService,
    private rolesService: RolesService,
    private jwt: JwtService,
  ) {}

  // create user
  @Post("/register")
  @ApiBody({
    type: UserCreateDto,
    examples: {
      data: {
        value: {
          email: "",
          fullName: "",
          password: "",
        } as UserCreateDto,
      },
    },
  })
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: true }))
  async create(@Body() data: UserCreateDto, @Res() res) {
    try {
      const userExist = await this.userService.findOne({ email: data.email });
      if (!!userExist) {
        return res.status(400).json({ mes: "user already exists testtttttt 100000" });
      }
      data.password = await bcrypt.hash(data.password, 10);
      const user = await this.userService.create(data);
      
      res.status(200).json({ mes: "create successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  //Login use using jwt
  @Post("/login")
  @ApiBody({
    type: UserLoginDto,
    examples: {
      data: {
        value: {
          email: "",
          password: "",
        } as UserLoginDto,
      },
    },
  })
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: true }))
  async login(@Body() data: UserLoginDto, @Res() res) {
    try {
      const userExist = await this.userService.findOne({ email: data.email });
      if (!!!userExist) {
        return res.status(400).json({ mes: "email or password is incorrect" });
      }
      const isPass = await bcrypt.compare(data.password, userExist.password);
      if (!isPass) {
        return res.status(400).json({ mes: "email or password is incorrect" });
      }

      const tokens = await this.getTokens({ ...userExist }, { id: userExist._id });
      const rtHasshed = await bcrypt.hash(tokens.refresh_token, 10);
      await this.userService.updateRT(userExist._id, rtHasshed);
      return res.status(200).json({
        tokens,
        user: userExist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  //Get all user
  //middleware tonken
  @Get()
  // @Roles("staff") //set xem routter này phải có quyền j
  // @ApiBearerAuth()
  // @UseGuards(RoleGuard) //2
  // @UseGuards(AuthGuard) //1
  async getAll(@Res() res) {
    try {
      const users = await this.userService.getAll();
      res.json({ users });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  //update roles user by id (query: userId, body: roleId)
  @Post("add-role")
  // @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: false }))
  @ApiBody({
    type: UserUpdaeRoleDto,
    examples: {
      data: {
        value: {
          roleId: "",
        } as UserUpdaeRoleDto,
      },
    },
  })
  @ApiQuery({
    name: "userId",
    type: "string",
    required: true,
  })
  async addRole(@Body() data: UserUpdaeRoleDto, @Res() res: Response, @Query() query) {
    try {
      const userId: string = query.userId;
      const type: string = query.type || "add";
      await this.userService.updateRole(userId, data.roleId, type);
      return res.status(200).json({ mes: "update role successfully" });
    } catch (error) {}
  }

  async getTokens(payloadAT:object, payloadRT:object): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(payloadAT, {
        expiresIn: "15m",
      }),
      this.jwt.signAsync(payloadRT, {
        expiresIn: "7d",
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
