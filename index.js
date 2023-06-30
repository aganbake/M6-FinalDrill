// Modules
const express = require("express");
const handlebars = require("express-handlebars");
const fs = require("fs");
const _ = require("lodash");

// Requires
const app = express();
const PORT = 3000;
let read = JSON.parse(fs.readFileSync("./public/anime.json", "utf-8"));

//Creating engine and define layout/partials
app.engine(
  "hbs",
  handlebars.engine({
    layoutsDir: __dirname + "/views/layouts",
    extname: "hbs",
    defaultLayout: "main",
    partialsDir: __dirname + "/views/partials",
  })
);
// parameters
app.set("view engine", "hbs");
app.use("/static", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true })); //for methods

// single function to handle the
function animeList(id) {
  if (!id) {
    return read;
  }
  if (id.length > 1) {
    return read[_.findKey(read, { nombre: _.startCase(_.toLower(id)) })];
  } else {
    return { id: id, data: read[id] };
  }
}

// CRUD Operations

// Routes
//CREATE
// Create layout
app.get("/create", (req, res) => {
  res.render("home", {
    layout: "create",
  });
});
// Create new Item
app.post("/create", (req, res) => {
  let newId = Object.keys(read).length + 1; //Keep id up
  //Schema
  const newAnime = {
    nombre: _.startCase(_.toLower(req.body.nombre)),
    genero: _.startCase(_.toLower(req.body.genero)),
    year: _.startCase(_.toLower(req.body.year)),
    autor: _.startCase(_.toLower(req.body.autor)),
  };
  // sed the new id to the schema (existent json array)
  read[newId] = newAnime;
  // writes in file the new item
  fs.writeFileSync("./public/anime.json", JSON.stringify(read));
  // simple redirect to home
  res.redirect("/");
});
//READ
// All Animes listed
app.get("/", (req, res) => {
  res.render("home", {
    layout: "main",
    animes: animeList(),
    listExists: true,
  });
});
// Single Anime (Easy way)
app.get("/:id", (req, res) => {
  let id = req.params.id;
  res.render("home", {
    layout: "main",
    animes: animeList(id),
    listExists: false,
  });
});

//SEARCH
// Look for an specific anime (name or id)
app.post("/search", (req, res) => {
  let sName = req.body.nombre;
  res.render("home", {
    layout: "main",
    animes: animeList(sName),
    listExists: false,
  });
});

//UPDATE
app.get("/update/:id", (req, res) => {
  let editId = req.params.id;

  res.render("home", {
    layout: "edit",
    anime: animeList(editId),
    context: {
      id: editId,
    },
  });
});

app.post("/update/:id", (req, res) => {
  let editId = req.body;
  read[editId.id].nombre = _.startCase(_.toLower(editId.nombre));
  read[editId.id].genero = _.startCase(_.toLower(editId.genero));
  read[editId.id].year = _.startCase(_.toLower(editId.year));
  read[editId.id].autor = _.startCase(_.toLower(editId.autor));

  fs.writeFileSync("./public/anime.json", JSON.stringify(read));

  res.redirect("/");
});

//DELETE
// Delete an item (auto writes in file!)
app.get("/delete/:id", (req, res) => {
  let delId = req.params.id;
  console.log(read[delId]);
  delete read[delId];
  fs.writeFileSync("./public/anime.json", JSON.stringify(read));
  res.redirect("/");
});

// Server
app.listen(PORT, () => console.log(`Server Up and running on port ${PORT}`));
