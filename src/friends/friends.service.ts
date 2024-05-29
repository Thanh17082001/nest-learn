import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Friend } from './schema/friends.schema';
import { Model } from 'mongoose';
import { FriendInterface } from './interface/friend.interface';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class FriendsService {
  constructor(@InjectModel(Friend.name) private friendModel: Model<Friend>) {}

  async create(createFriendDto: CreateFriendDto): Promise<FriendInterface> {
    return await this.friendModel.create(createFriendDto);
  }

  async findAll(condition: object = {}): Promise<Array<FriendInterface>> {
    console.log(condition);
    return this.friendModel.find(condition).populate({ path: "requesterId", select: "fullName" }).populate({ path: "receiverId", select: "fullName" }).lean();
  }

  async findOne(data: object): Promise<FriendInterface> {
    return await this.friendModel.findOne(data);
  }

  async update(id: Types.ObjectId, updateFriendDto: object): Promise<FriendInterface> {
    return await this.friendModel.findByIdAndUpdate(id, updateFriendDto, { returnDocument: "after" });
  }

  async remove(id: Types.ObjectId) {
    return await this.friendModel.findByIdAndDelete(id);
  }
}
