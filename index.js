require("dotenv").config();
const imgurSearch = require("./imgurSearch");

imgurSearch
    .byTag("animal")
    .then(console.log)
    .catch(console.log);
