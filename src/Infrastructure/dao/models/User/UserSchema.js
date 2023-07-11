import { Schema } from "mongoose";
import cartModel from '../Cart/CartModel.js'

const userSchema = new Schema({
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String},
    age: {type: Number},
    password: {type: String},
    cart: {type: String, ref: cartModel},
    role: {type: String},
    documents: {
        type: Array
    },
    last_connection: {type: Date},
})

export default userSchema