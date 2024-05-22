import {  Types } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFriendDto {
    @ApiProperty({ type: "string" })
    @IsNotEmpty()
    requesterId: Types.ObjectId;

    @ApiProperty({ type: "string" })
    @IsNotEmpty()
    receiverId: Types.ObjectId;
}
