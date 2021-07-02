const mongoose = require('mongoose')
const { Schema, model } = mongoose

const CartSchema = new Schema({
  productId: Number,
  salePrice: Number,
  productName: String,
  subTitle: String,
  limitNum: Number,
  productImageBig: String,
  detail: String,
  productImageSmall: Array,
  count: {
    type: Number,
    default: 1
  },
})

module.exports = model('Cart', CartSchema)