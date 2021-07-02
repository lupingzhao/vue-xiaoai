const mongoose = require('mongoose')
const { Schema, model } = mongoose

const AddressSchema = new Schema({
  username: String,
  phone: String,
  address: String,
  isDefault: {
    type: Boolean,
    default: false
  }
})

module.exports = model('Address', AddressSchema)