import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new Schema({
    title: {type: String},
    description: {type: String},
    code: {type: String},
    price: {type: Number},
    status: {type: Boolean},
    stock: {type: Number},
    category: {type: String},
    thumbnail: {type: [String]}
})

productSchema.plugin(mongoosePaginate)

export default productSchema