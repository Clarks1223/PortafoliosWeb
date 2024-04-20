const { Router } = require("express");
//para verificar que el usuario este autenticado
const { redirectIfAuthenticated } = require("../helpers/validate-auth");

const {
  renderRegisterForm,
  registerNewUser,
  renderLoginForm,
  loginUser,
  logoutUser,
  confirmEmail
} = require("../controllers/user.controller");
const router = Router();

router.get("/user/register", renderRegisterForm);
router.post("/user/register", registerNewUser);

// Ruta para mostrar el fomrulario de login
router.get("/user/login", redirectIfAuthenticated, renderLoginForm);
router.post("/user/login", loginUser);

router.post("/user/logout", logoutUser);

// para confirmar la el token
router.get('/user/confirmar/:token',confirmEmail)

module.exports = router;
