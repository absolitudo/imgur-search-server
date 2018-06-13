require("dotenv").config();
const imgurSearch = require("./imgurSearch");

imgurSearch
    .bySubreddit("pictures", "asd")
    .then(console.log)
    .catch(console.log);
