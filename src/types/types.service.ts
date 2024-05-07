import { Injectable } from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Type } from "./schema/types.schema";
import { Model } from "mongoose";
import { TypeInterface } from "./interface/types.interface";

@Injectable()
export class TypesService {
  constructor(@InjectModel(Type.name) private typeModel: Model<Type>) {}

  async create(data: CreateTypeDto): Promise<TypeInterface> {
    return await this.typeModel.create(data);
  }

  async findAll(pageNumber: number = undefined, limit: number = undefined, condition: object = {}): Promise<TypeInterface[]> {
    if (!pageNumber && !limit) {
      return await this.typeModel.find(condition).sort({ createdAt: -1 }).lean();
    }
    const skip = (Number(pageNumber) - 1) * Number(limit);
    return await this.typeModel.find(condition).skip(skip).limit(limit).sort({ createdAt: -1 }).lean();
  }

  async findOne(data: object): Promise<TypeInterface> {
    return await this.typeModel.findOne(data);
  }

  async update(id: string, data: UpdateTypeDto): Promise<TypeInterface> {
    return await this.typeModel
      .findByIdAndUpdate(id, data, {
        returnDocument: "after",
      })
      .lean();
  }

  async remove(id: string): Promise<TypeInterface> {
    return await this.typeModel.findByIdAndDelete(id);
  }
}
