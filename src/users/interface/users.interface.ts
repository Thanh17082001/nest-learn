import { Document, ObjectId } from "mongoose";

interface UserInterface extends Document {
  fulName: string;
  email: string;
  password: string;
  roles: Array<string>;
  friends: Array<ObjectId>;
}

export default UserInterface;
