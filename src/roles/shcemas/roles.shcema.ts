
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Role extends RoleInterface {
  @Prop()
  name: string;
  @Prop({default:''})
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);