
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Role {
  @Prop()
  name: string;
  @Prop({default:''})
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);