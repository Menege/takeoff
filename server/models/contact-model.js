const { Schema, model } = require("mongoose");

const ContactSchema = new Schema({
  _id: { type: String}, 
  name: { type: String, unique: true, required: true },
  phone: { type: String, required: true, required: true }
});

module.exports = model("Contact", ContactSchema);
