import { model } from "mongoose";
import productSchema from "./ProductSchema.js";

const productModel = model('products', productSchema)

export default productModel