import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { User } from './schemas/user.schema';
import UserInterface from './interface/users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: object) {
    await this.userModel.create(data);
  }

  async findOne(data: object): Promise<UserInterface> {
    return await this.userModel.findOne(data).lean();
  }

  async getAll(): Promise<Array<UserInterface>> {
    return await this.userModel.find().lean();
  }
}
