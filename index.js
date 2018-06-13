require("dotenv").config();
let fetch = require("node-fetch");

fetch("https://api.imgur.com/3/image/njihQTy", {
    headers: {
        Authorization: "Client-ID " + process.env.IMGUR_CLIENT_ID,
        Accept: "application/json"
    }
})
    .then(res => res.json())
    .then(res => console.log(res));

console.log(process.env.GOOGLE_API_KEY);
