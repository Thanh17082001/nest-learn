import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Role extends Document {
  @Prop()
  name: string;
  @Prop({default:''})
  description: string;
}

export type RoleDocument = Role & Document;

export const RoleSchema = SchemaFactory.createForClass(Role);