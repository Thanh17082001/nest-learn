import { Document, Types } from "mongoose";

export interface ProductInterface extends Document {
  brandId: Types.ObjectId;
  categoryId: Types.ObjectId;
  typeId: Types.ObjectId;
  name: string;
  image: object;
  description: string;
  priceImport: number;
  priceSale: number;
  quantityImport: number;
  quatitySale: number;
  dateImport: Date;
}
