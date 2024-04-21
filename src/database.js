const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const { DBUSER, DBPASSWORD, DBNAME } = process.env;

const MONGODB_URI = `mongodb+srv://${DBUSER}:${DBPASSWORD}@${DBNAME}.wujqte6.mongodb.net/`;
//const MONGODB_URI = "mongodb://localhost:27017/portfolio";

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
