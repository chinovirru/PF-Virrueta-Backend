import { model } from "mongoose";
import messageSchema from "./MessageSchema.js";

const messageModel = model('messages', messageSchema)

export default messageModel