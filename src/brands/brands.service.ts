import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './schemas/brand.schema';
import { Model } from 'mongoose';
import { BrandInterface } from './interfaces/brands.interface';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}
  async create(data: CreateBrandDto): Promise<BrandInterface> {
    return await this.brandModel.create(data);
  }

  async findAll(
    pageNumber: number = undefined,
    limit: number = undefined,
    condition: object = {},
  ): Promise<BrandInterface[]> {
    if (!pageNumber && !limit) {
      return await this.brandModel
        .find(condition)
        .sort({ createdAt: -1 })
        .lean();
    }
    const skip = (Number(pageNumber) - 1) * Number(limit);
    return await this.brandModel
      .find(condition)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
  }

  async findOne(data: object): Promise<BrandInterface> {
    return await this.brandModel.findOne(data);
  }

  async update(id: string, data: UpdateBrandDto): Promise<BrandInterface> {
    return await this.brandModel
      .findByIdAndUpdate(id, data, {
        returnDocument: 'after',
      })
      .lean();
  }

  async remove(id: string): Promise<BrandInterface> {
    return await this.brandModel.findByIdAndDelete(id);
  }
}
