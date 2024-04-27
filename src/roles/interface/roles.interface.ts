import { Document } from "mongoose";

export class RoleInterface extends Document{
    name: string;
    description:string
}