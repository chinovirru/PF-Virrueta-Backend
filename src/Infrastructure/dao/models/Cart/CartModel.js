import { model } from "mongoose";
import CartSchema from "./CartSchema.js";

const cartModel = model('carts', CartSchema)

export default cartModel