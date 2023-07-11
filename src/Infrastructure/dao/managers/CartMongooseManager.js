import { MongooseManager } from "./MongooseManager.js";
import cartModel  from "../models/Cart/CartModel.js"

const CartMongooseManager = new MongooseManager(cartModel)

export default CartMongooseManager