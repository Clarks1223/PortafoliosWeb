//importo el schema de la coleccion Portfolio de la carpeta models
const Portfolio = require("../models/Portafolio");

//endpoints
const renderAllPortafolios = async (req, res) => {
  const portfolios = await Portfolio.find().lean();
  res.render("portafolio/allPortfolios", { portfolios });
};

const renderPortafolio = (req, res) => {
  res.send("Mostrar el detalle de un portafolio");
};
const renderPortafolioForm = (req, res) => {
  //Redirige a la ruta para crear un nuevo portafolio
  res.render("portafolio/newFormPortafolio");
};
const createNewPortafolio = async (req, res) => {
  //Para crear un nuevo portafolio con los datos que se envian desde el formulario
  //console.log("Los datos que llegan: ", req.body);
  const { title, category, description } = req.body;
  const newPortfolio = new Portfolio({ title, category, description });
  await newPortfolio.save();
  res.redirect("/portafolios");
  //res.json({ newPortfolio });
};
const renderEditPortafolioForm = async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id).lean();
  res.render("portafolio/editPortfolio", { portfolio });
};
const updatePortafolio = async (req, res) => {
  const { title, category, description } = req.body;
  await Portfolio.findByIdAndUpdate(req.params.id, {
    title,
    category,
    description,
  });
  res.redirect("/portafolios");
};
const deletePortafolio = async (req, res) => {
  await Portfolio.findByIdAndDelete(req.params.id);
  res.redirect("/portafolios");
};

module.exports = {
  renderAllPortafolios,
  renderPortafolio,
  renderPortafolioForm,
  createNewPortafolio,
  renderEditPortafolioForm,
  updatePortafolio,
  deletePortafolio,
};
