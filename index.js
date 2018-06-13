require("dotenv").config();
const imgurSearch = require("./imgurSearch");

imgurSearch
    .getTags()
    .then(console.log)
    .catch(console.log);
