
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RoleInterface } from "../interface/roles.interface";


@Schema()
export class Role extends RoleInterface {
  @Prop()
  name: string;
  @Prop({default:''})
  description: string;
}

export type RoleDocument = Role & Document;

export const RoleSchema = SchemaFactory.createForClass(Role);