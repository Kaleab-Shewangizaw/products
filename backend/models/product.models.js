import mongoose from "mongoose";

const producSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requred: true,
    },
    price: {
      type: Number,
      requred: true,
    },
    image: {
      type: String,
      requred: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', preoductSchema)

export default Product