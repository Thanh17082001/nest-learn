import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categories } from './schema/categories.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesInterface } from './interface/categories.interface';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Categories.name) private typeModel: Model<Categories>) {}

  async create(data: CreateCategoryDto): Promise<CategoriesInterface> {
    return await this.typeModel.create(data);
  }

  async findAll(pageNumber: number = undefined, limit: number = undefined, condition: object = {}): Promise<CategoriesInterface[]> {
    if (!pageNumber && !limit) {
      return await this.typeModel.find(condition).sort({ createdAt: -1 }).lean();
    }
    const skip = (Number(pageNumber) - 1) * Number(limit);
    return await this.typeModel.find(condition).skip(skip).limit(limit).sort({ createdAt: -1 }).lean();
  }

  async findOne(data: object): Promise<CategoriesInterface> {
    return await this.typeModel.findOne(data);
  }

  async update(id: string, data: UpdateCategoryDto): Promise<CategoriesInterface> {
    return await this.typeModel
      .findByIdAndUpdate(id, data, {
        returnDocument: "after",
      })
      .lean();
  }

  async remove(id: string): Promise<CategoriesInterface> {
    return await this.typeModel.findByIdAndDelete(id);
  }
}
