import { MongooseManager } from "./MongooseManager.js";
import productModel  from "../models/Product/ProductModel.js"

const ProductMongooseManager = new MongooseManager(productModel)

export default ProductMongooseManager