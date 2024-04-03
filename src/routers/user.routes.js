const { Router } = require("express");
//para verificar que el usuario este autenticado
const { redirectIfAuthenticated } = require("../helpers/validate-auth");

const {
  renderRegisterForm,
  registerNewUser,
  renderLoginForm,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");
const router = Router();

router.get("/user/register", renderRegisterForm);
router.post("/user/register", registerNewUser);

// Ruta para mostrar el fomrulario de login
router.get("/user/login", redirectIfAuthenticated, renderLoginForm);
router.post("/user/login", loginUser);

router.post("/user/logout", logoutUser);

module.exports = router;
