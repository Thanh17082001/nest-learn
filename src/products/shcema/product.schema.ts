import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, Types } from "mongoose";
import { Brand } from "src/brands/schemas/brand.schema";
import { Categories } from "src/categories/schema/categories.schema";
import { Type } from "src/types/schema/types.schema";


interface image{
  file: Buffer;
  contentType: string;
}
@Schema({timestamps:true})
export class Product extends Document {
  @Prop({ ref: Brand.name, required: true, type: Types.ObjectId })
  brandId: Types.ObjectId;
  @Prop({ ref: Type.name, required: true, type: Types.ObjectId })
  typeId: Types.ObjectId;
  @Prop({ ref: Categories.name, required: true, type: Types.ObjectId })
  categoryId: Types.ObjectId;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, type:Object })
  image: image;
  @Prop({ required: false, default: "", type: String })
  description: string;
  @Prop({ required: false, default: 0 })
  priceImport: number;
  @Prop({ required: false, default: 0 })
  priceSale: number;
  @Prop({ required: false, default: 0 })
  quantityImport: number;
  @Prop({ required: false, default: 0 })
  quatitySale: number;
  @Prop({ required: false })
  dateImport: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
