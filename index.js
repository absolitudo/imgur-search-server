require("dotenv").config();
const imgurSearch = require("./imgurSearch");
const app = require("express")();
const cors = require("cors");
const port = process.env.PORT || 7777;

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get("/api/tags", (req, res) =>
    imgurSearch
        .getTags()
        .then(response => res.send(response))
        .catch(err =>
            res.send({
                status: 400,
                error: err
            })
        )
);

app.get("/api/mainGallery", (req, res) =>
    imgurSearch
        .getMainGallery(
            req.body ? req.body.pathOptions : {},
            req.body ? req.body.headerOptions : {}
        )
        .then(response => res.send(response))
        .catch(err =>
            res.send({
                status: 400,
                error: err
            })
        )
);

app.get("/api/searchSubreddit", (req, res) => {
    if (req.body) {
        imgurSearch
            .bySubreddit(
                req.body.subreddit || {},
                req.body.pathOptions,
                req.body.headerOptions
            )
            .then(response => res.send(response))
            .catch(err => {
                if (err === "You need to provide a subreddit name.") {
                    res.send({
                        status: 400,
                        error:
                            "The request body must contain a subreddit name: {subreddit: {{subredditName}}}."
                    });
                } else {
                    res.send({
                        status: 400,
                        error: err
                    });
                }
            });
    } else {
        res.send({
            status: 400,
            error:
                "The request body must contain a subreddit name: {subreddit: {{subredditName}}}."
        });
    }
});

app.get("/api/searchTag", (req, res) => {
    if (req.body) {
        imgurSearch
            .byTag(
                req.body.tagName || {},
                req.body.pathOptions,
                req.body.headerOptions
            )
            .then(response => res.send(response))
            .catch(err => {
                if (err === "You need to provide a tag name.") {
                    res.send({
                        status: 400,
                        error:
                            "The request body must contain a tag name: {tagName: {{tagName}}}."
                    });
                } else {
                    res.send({
                        status: 400,
                        error: err
                    });
                }
            });
    } else {
        res.send({
            status: 400,
            error:
                "The request body must contain a tag name: {tagName: {{tagName}}}."
        });
    }
});

app.get("/api/searchString", (req, res) => {
    if (req.body) {
        imgurSearch
            .byString(
                req.body.searchString || {},
                req.body.pathOptions,
                req.body.headerOptions
            )
            .then(response => res.send(response))
            .catch(err => {
                if (err === "You need to provide a string.") {
                    res.send({
                        status: 400,
                        error:
                            "The request body must contain a search string: {searchString: {{searchString}}}."
                    });
                } else {
                    res.send({
                        status: 400,
                        error: err
                    });
                }
            });
    } else {
        res.send({
            status: 400,
            error:
                "The request body must contain a search string: {searchString: {{searchString}}}."
        });
    }
});
/*
TODO: caching maybe
*/
app.listen(port, () => console.log("listening on " + port));
