import { model } from "mongoose";
import userSchema from "./UserSchema.js";

const userModel = model('users', userSchema)

export default userModel