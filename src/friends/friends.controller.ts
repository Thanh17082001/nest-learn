import { ObjectId, Types } from 'mongoose';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { FriendInterface } from './interface/friend.interface';
import { AuthGuard } from 'src/guard/auth';
import { UpdateFriendStatusDto } from './dto/update-status.dto';
import { UsersService } from 'src/users/users.service';

@Controller("friends")
@UseGuards(AuthGuard)
@ApiTags("friends")
export class FriendsController {
  constructor(
    private readonly friendsService: FriendsService,
    private readonly userService: UsersService,
  ) {}

  @Post("create")
  async create(@Body() createFriendDto: CreateFriendDto, @Res() res: Response): Promise<Response> {
    try {
      const exitsRequest: FriendInterface = await this.friendsService.findOne({ ...createFriendDto, status: "pending" });
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

  @Get(":requesterId")
  @ApiParam({
    name: "requesterId",
    type: "string",
    required: true,
  })
  async findByRequestId(@Param("requesterId") requesterId: string, @Res() res: Response): Promise<Response> {
    try {
      const friends = await this.friendsService.findAll({ requesterId: requesterId, status: "pending" });

      return res.status(200).json({
        friends,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  @Get(":receiverId")
  @ApiParam({
    name: "receiverId",
    type: "string",
    required: true,
  })
  async findByReceiverId(@Param("receiverId") receiverId: string, @Res() res: Response): Promise<Response> {
    try {
      const friends = await this.friendsService.findAll({ receiverId: receiverId, status: "pending" });

      return res.status(200).json({
        friends,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  @Patch("status/:id")
  @ApiParam({
    name: "id",
    type: "string",
    required: true,
  })
  async update(@Param("id") id: Types.ObjectId, @Body() UpdateFriendStatusDto: UpdateFriendStatusDto, @Res() res: Response): Promise<Response> {
    try {
      const exits = await this.friendsService.findOne({ _id: id });
      if (!!!exits) {
        return res.status(400).json({
          message: "Friend resquest does not exits!",
        });
      }

      const update = await this.friendsService.update(id, UpdateFriendStatusDto);
      if (update.status == "accepted") {
        await this.userService.updateFriend(update.receiverId, update.requesterId);
        await this.userService.updateFriend(update.requesterId, update.receiverId);
        await this.friendsService.remove(id);
      } else if (update.status == "canceled") {
        await this.userService.updateFriend(update.receiverId, update.requesterId, "remove");
        await this.userService.updateFriend(update.requesterId, update.receiverId, "remove");
        await this.friendsService.remove(id);
      }
      res.status(200).json({
        message: update.status == "accepted" ? "added successfully" : "canceled successfully ",
      });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
}
