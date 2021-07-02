const mongoose = require('mongoose')
const { Schema, model } = mongoose

const GoodsSchema = new Schema({
  productId: Number,
  salePrice: Number,
  productName: String,
  subTitle: String,
  productImageBig: String,
  __v: {
    type: String,
    select: false
  }
})

module.exports = model('Goods', GoodsSchema)