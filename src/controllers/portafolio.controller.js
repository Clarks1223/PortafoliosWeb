//importo el schema de la coleccion Portfolio de la carpeta models
const Portfolio = require("../models/Portafolio");
//importo la configuracion para cloudinary
const { uploadImage, deleteImage } = require("../config/cloudinary");
//para eliminar las imagenes locales
const fs = require("fs-extra");

//endpoints
const renderAllPortafolios = async (req, res) => {
  const portfolios = await Portfolio.find({ user: req.user._id }).lean();
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
  newPortfolio.user = req.user._id;
  if (!req.files?.image) return res.send("Se requiere una imagen");
  const imageUpload = await uploadImage(req.files.image.tempFilePath);
  newPortfolio.image = {
    public_id: imageUpload.public_id,
    secure_url: imageUpload.secure_url,
  };
  await fs.unlink(req.files.image.tempFilePath);
  await newPortfolio.save();
  res.redirect("/portafolios");
  //res.json({ newPortfolio });
};

const renderEditPortafolioForm = async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id).lean();
  res.render("portafolio/editPortfolio", { portfolio });
};

const updatePortafolio = async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id).lean();
  if (portfolio._id != req.params.id) return res.redirect("/portafolios");

  if (req.files?.image) {
    if (!req.files?.image) return res.send("Se requiere una imagen");
    await deleteImage(portfolio.image.public_id);
    const imageUpload = await uploadImage(req.files.image.tempFilePath);
    const data = {
      title: req.body.title || portfolio.name,
      category: req.body.category || portfolio.category,
      description: req.body.description || portfolio.description,
      image: {
        public_id: imageUpload.public_id,
        secure_url: imageUpload.secure_url,
      },
    };
    await fs.unlink(req.files.image.tempFilePath);
    await Portfolio.findByIdAndUpdate(req.params.id, data);
  } else {
    const { title, category, description } = req.body;
    await Portfolio.findByIdAndUpdate(req.params.id, {
      title,
      category,
      description,
    });
  }
  res.redirect("/portafolios");
};

const deletePortafolio = async (req, res) => {
  const portafolio = await Portfolio.findByIdAndDelete(req.params.id);
  await deleteImage(portafolio.image.public_id);
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
