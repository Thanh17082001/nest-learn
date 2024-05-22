import { Document, ObjectId, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Friend extends Document{
  @Prop({ type: Types.ObjectId, ref: User.name })
  requesterId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: User.name })
  receiverId: Types.ObjectId;
  @Prop({ default: 'pending' })
  status: string;
  @Prop({ default: new Date() })
  sendedAt: Date;
  @Prop()
  respondedAt: Date;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);