import mongoose from "mongoose";
import { customLog } from "../../Presentation/utils/logger.js";

const initMongoose = async () => {
  try {
    await mongoose.connect("mongodb+srv://mongoadmin:Mongoadmin2023@ecommerce.benldra.mongodb.net/ecommerce?retryWrites=true&w=majority");
    // console.log("Mongodb connected");
    customLog('info', 'Mongodb connected');
  } catch (error) {
    // console.log(error);
    customLog('error', error)
  }
};

export default initMongoose;