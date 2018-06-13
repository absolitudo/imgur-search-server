require("dotenv").config();
const imgurSearch = require("./imgurSearch");

imgurSearch
    .byString("cat AND dog AND cute")
    .then(console.log)
    .catch(console.log);
