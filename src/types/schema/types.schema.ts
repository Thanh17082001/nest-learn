import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({ timestamps: true })
export class Type extends Document{
    @Prop({ require: true })
    name: string;
    @Prop()
    description: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type); 