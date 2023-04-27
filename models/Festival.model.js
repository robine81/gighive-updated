const { Schema, model } = require("mongoose");

const festivalSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  venue: {
    type: String,
    required: true,
  },
  textInfo:String,
  genre: {
    type: String,
    enum: ["House", "Techno", "Trance"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  email: {
    type: String,
    required: true,
  },
});

const FestivalModel = model("festival", festivalSchema);
module.exports = FestivalModel;