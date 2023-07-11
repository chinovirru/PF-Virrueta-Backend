import { MongooseManager } from "./MongooseManager.js";
import userModel  from '../models/User/UserModel.js'

const UserMongooseManager = new MongooseManager(userModel)

export default UserMongooseManager