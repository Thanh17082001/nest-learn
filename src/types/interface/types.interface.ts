import { Document } from "mongoose";

export interface TypeInterface extends Document{
    name: string,
    description:string
}