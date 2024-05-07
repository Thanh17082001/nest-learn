import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/roles/shcemas/roles.shcema";

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  fullName: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop({ ref: Role.name })
  roles: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
