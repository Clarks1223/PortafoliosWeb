const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");

//inicializaciones
const app = express();

//Configuraciones
app.set("port", process.env.port || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(express.urlencoded({ extended: false }));
//middlewares metodo override
app.use(methodOverride("_method"));
//Variables globales
// Rutas
app.use(require("./routers/index.routes"));
app.use(require("./routers/portafolio.routes"));

//Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));
app.unsubscribe(express.static(path.join(__dirname, "public")));

//Archivos exportados
module.exports = app;
