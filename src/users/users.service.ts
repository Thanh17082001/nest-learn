import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./schemas/user.schema";
import UserInterface from "./interface/users.interface";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: object) {
    await this.userModel.create(data);
  }

  async findOne(data: object): Promise<UserInterface> {
    return await this.userModel.findOne(data).populate({ path: "roles" }).populate({ path: "friends" }).lean();
  }

  async getAll(): Promise<Array<UserInterface>> {
    return await this.userModel.find().populate({ path: "roles" }).populate({ path: "friends" }).lean();
  }

  async updateRole(userId: string, roleId: string, type: string = "add"): Promise<UserInterface> {
    if (type == "remove") {
      return await this.userModel.findByIdAndUpdate(userId, { $pull: { roles: roleId } }, { returnDocument: "after", upsert: true });
    }
    return await this.userModel.findByIdAndUpdate(userId, { $addToSet: { roles: roleId } }, { returnDocument: "after", upsert: true });
  }

  async updateFriend(userId: Types.ObjectId, friendId: Types.ObjectId, type: string = "add"): Promise<UserInterface> {
    if (type == "remove") {
      return await this.userModel.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { returnDocument: "after", upsert: true });
    }
    return await this.userModel.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { returnDocument: "after", upsert: true });
  }

  async updateRT(id: Types.ObjectId, rt: String) {
    return await this.userModel.findByIdAndUpdate(id,{refreshToken:rt}, {returnDocument:'after'})
  }
}
