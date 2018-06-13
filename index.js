require("dotenv").config();
const imgurSearch = require("./imgurSearch");
const app = require("express")();
const port = process.env.PORT || 7777;

app.get("/api/tags", (req, res) =>
    imgurSearch
        .getTags()
        .then(response => res.send(response))
        .catch(console.log)
);

app.listen(port, () => console.log("listening on " + port));
