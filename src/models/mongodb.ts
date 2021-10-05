import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  timestamp: {
    type: Date,
    require: true,
  },
  title: {
    type: String,
    require: true,
    max: 100,
  },
  description: {
    type: String,
    require: true,
    max: 100,
  },
  code: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
    max: 100,
  },
});

module.exports = {
  productos: mongoose.model("productos", productsSchema),
};