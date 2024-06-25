import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateFriendStatusDto {
  @ApiProperty({ type: "string" })
  status:string
}
