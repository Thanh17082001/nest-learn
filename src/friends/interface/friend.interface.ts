import { ObjectId, Types } from "mongoose";

export interface FriendInterface {
  requesterId: Types.ObjectId;
  receiverId: Types.ObjectId;
  status: string;
  sendedAt: Date;
  respondedAt: Date;
}
