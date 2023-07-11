import { Schema, Types } from "mongoose";
import productModel from "../Product/ProductModel.js";

const ProductOfCart = new Schema({
    product_id: {type: String, ref: productModel},
    quantity: {Type: Number}
})

const CartSchema = new Schema({
    products: {type:[ProductOfCart]}
})

export default CartSchema