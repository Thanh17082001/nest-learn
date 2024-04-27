
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RoleInterface } from "../interface/roles.interface";


@Schema()
export class Role {
  @Prop()
  name: string;
  @Prop()
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);