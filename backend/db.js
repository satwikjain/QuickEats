const { Result } = require("express-validator");
const mongoose = require("mongoose");
const mongoURI = `mongodb+srv://gofood:satwikjain@cluster0.cdi9fun.mongodb.net/gofoodmern?retryWrites=true&w=majority`;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("connected");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();
    global.food_items = data;
    global.foodCategory = catData;
  } catch (err) {
    console.log("---", err);
  }
};

module.exports = mongoDB;