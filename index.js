require("dotenv").config();
const imgurSearch = require("./imgurSearch");

imgurSearch.getMainGallery({ section: "top" }).then(console.log);
