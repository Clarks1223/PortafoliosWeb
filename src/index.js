const app = require("./server.js");
const connection = require("./database.js");
require('dotenv').config()

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

connection()