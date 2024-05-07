import { Document } from "mongoose";

interface UserInterface extends Document {
  fulName: string;
  email: string;
  password: string;
  roles: Array<string>;
}

export default UserInterface;
