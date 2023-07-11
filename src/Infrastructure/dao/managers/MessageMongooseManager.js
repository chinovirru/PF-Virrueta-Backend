import { MongooseManager } from "./MongooseManager.js";
import messageModel  from "../models/Message/MessageModel.js"

const MessageMongooseManager = new MongooseManager(messageModel)

export default MessageMongooseManager