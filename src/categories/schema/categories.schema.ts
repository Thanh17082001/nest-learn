
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({ timestamps: true })
export class Categories extends Document{
    @Prop({ require: true })
    name: string;
    @Prop()
    description: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories); 