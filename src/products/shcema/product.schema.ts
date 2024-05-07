import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";

@Schema()
export class Product extends Document {
  @Prop({ ref: "brand" })
  brandId: ObjectId;
}

export const RoleSchema = SchemaFactory.createForClass(Product);
