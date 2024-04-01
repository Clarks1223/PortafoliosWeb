const mongoose = require("mongoose");

const { DBUSER, DBPASSWORD, DBNAME } = process.env;
//const MONGODB_URI = `mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.6e8zntc.mongodb.net/${DBNAME}`;
const MONGODB_URI = "mongodb://localhost:27017/portfolio";

connection = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Base de datos conectada");
  } catch (e) {
    console.log("Base de datos no conectada por:");
    console.log(e);
  }
};
module.exports = connection;
