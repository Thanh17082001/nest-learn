import { Injectable } from '@nestjs/common';
import { Role } from './shcemas/roles.shcema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolesCreateDto } from './dto/roles.createDto';
import { RoleInterface } from './interface/roles.interface';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async create(data: RolesCreateDto) {
    return await this.roleModel.create(data);
  }

  async findOne(data: object): Promise<RoleInterface> {
    return await this.roleModel.findOne(data);
  }

  async find(): Promise<Array<RoleInterface>> {
    return await this.roleModel.find();
  }
}
