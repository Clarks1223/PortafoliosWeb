const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
//para el inicio de sesion
const passport = require("passport");
const session = require("express-session");
const fileUpload = require("express-fileupload");

//inicializaciones
const app = express();
//inicializacion de passport
require("./config/passport");

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

//configuracion para imagenes con fileupload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

//Middlewares
app.use(express.urlencoded({ extended: false }));
//middlewares metodo override
app.use(methodOverride("_method"));
//middleware para passport
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Variables globales
//contendra el nombre del usuario de forma global, si no esta autenticado sera null
app.use((req, res, next) => {
  res.locals.user = req.user?.name || null;
  next();
});
// Rutas
app.use(require("./routers/index.routes"));
app.use(require("./routers/portafolio.routes"));
app.use(require("./routers/user.routes"));

//Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));
app.unsubscribe(express.static(path.join(__dirname, "public")));

//Archivos exportados
module.exports = app;
