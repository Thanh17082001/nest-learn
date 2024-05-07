import { Injectable } from "@nestjs/common";
import { Role, RoleDocument } from "./shcemas/roles.shcema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RolesCreateDto } from "./dto/roles.createDto";
import { RoleInterface } from "./interface/roles.interface";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async create(data: RolesCreateDto) {
    return await this.roleModel.create(data);
  }

  async findOne(data: object): Promise<RoleInterface> {
    return await this.roleModel.findOne(data);
  }

  async findById(id: string): Promise<RoleInterface> {
    return await this.roleModel.findById(id);
  }

  async find(): Promise<Array<RoleInterface>> {
    return await this.roleModel.find();
  }
  async update(id: string, data: object): Promise<Array<RoleInterface>> {
    return await this.roleModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
  }
}
