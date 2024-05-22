import { ObjectId, Types } from 'mongoose';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { FriendInterface } from './interface/friend.interface';
import { AuthGuard } from 'src/guard/auth';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UsersService } from 'src/users/users.service';

@Controller("friends")
@ApiTags("friends")
export class FriendsController {
  constructor(private readonly friendsService: FriendsService, private readonly userService:UsersService) {}

  @Post("create")
  @UseGuards(AuthGuard)
  async create(@Body() createFriendDto: CreateFriendDto, @Res() res: Response): Promise<Response> {
    try {
      const exitsRequest: FriendInterface = await this.friendsService.findOne(createFriendDto);
      if (!!exitsRequest) {
        return res.status(400).json({
          mes: "The request has been sent before ",
        });
      }
      const result: FriendInterface = await this.friendsService.create(createFriendDto);
      return res.status(200).json({
        mes: "Create successfully!",
        firend: result,
      });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  @Get()
  findAll() {
    return this.friendsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.friendsService.findOne(+id);
  // }

  @Patch("status/:id")
  @ApiParam({
    name: "id",
    type: "string",
    required: true,
  })
  async update(@Param("id") id: Types.ObjectId, @Body() UpdateStatusDto: UpdateStatusDto, @Res() res: Response): Promise<Response> {
    try {
      const exits = await this.friendsService.findOne({ _id: id });
      if (!!!exits) {
        return res.status(400).json({
          message: "Friend resquest does not exits!",
        });
      }

      const update = await this.friendsService.update(id, UpdateStatusDto);
      if (update.status == 'accepted') {
        await this.userService.updateFriend(update.receiverId, update.requesterId)
        await this.userService.updateFriend(update.requesterId, update.receiverId);
      }
      else if (update.status == "cancel") {
         await this.userService.updateFriend(update.receiverId, update.requesterId,'remove');
         await this.userService.updateFriend(update.requesterId, update.receiverId, 'remove');
      }
      res.status(200).json({
        message: "Update successfully",
        friend: update,
      });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.friendsService.remove(+id);
  // }
}
