const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/Space")
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

// Creating a model based on the existing schema for collection
const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("collection", collectionSchema);

const planetSchema = new mongoose.Schema({
    descriptions: {
      type: Object,
      required: true,
    },
  });
  
  const planet = mongoose.model("planet", planetSchema);
  
  module.exports = {
    collection,
    planet,
  };