import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./shcema/product.schema";
import { Model } from "mongoose";
import { ProductInterface } from "./interfaces/product.interface";
import {  Types } from "mongoose";
import { Brand } from "src/brands/schemas/brand.schema";
import { Type } from "src/types/schema/types.schema";
import { Categories } from "src/categories/schema/categories.schema";


@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}
  async create(data: CreateProductDto): Promise<ProductInterface> {
    return await this.productModel.create(data);
  }

  async findAll(pageNumber: number = undefined, limit: number = undefined, condition: object = {}): Promise<ProductInterface[]> {
    if (!pageNumber && !limit) {
      return await this.productModel.find(condition).sort({ createdAt: -1 }).populate("brandId").populate("typeId").populate("categoryId").lean();
    }
    const skip = (Number(pageNumber) - 1) * Number(limit);
    return await this.productModel.find(condition).skip(skip).limit(limit).sort({ createdAt: -1 }).populate("brandId").populate("typeId").populate("categoryId").lean();
  }

  async findOne(data: object): Promise<ProductInterface> {
    return await this.productModel.findOne(data).populate("brandId").populate("typeId").populate("categoryId").lean();
  }

  async update(id: Types.ObjectId, data: UpdateProductDto): Promise<ProductInterface> {
    return await this.productModel
      .findByIdAndUpdate(id, data, {
        returnDocument: "after",
      })
      .lean();
  }

  async remove(id: Types.ObjectId): Promise<ProductInterface> {
    return await this.productModel.findByIdAndDelete(id);
  }
}
