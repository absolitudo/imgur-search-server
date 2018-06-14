require("dotenv").config();
const imgurSearch = require("./imgurSearch");
const app = require("express")();
const port = process.env.PORT || 7777;

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
            req.body.pathOptions || {},
            req.body.headerOptions || {}
        )
        .then(response => res.send(response))
        .catch(err =>
            res.send({
                status: 400,
                error: err
            })
        )
);

app.get(
    "/api/searchSubreddit",
    (req, res) =>
        req.body
            ? imgurSearch
                  .bySubreddit(
                      req.body.subreddit,
                      req.body.pathOptions,
                      req.body.headerOptions
                  )
                  .then(response => res.send(response))
                  .catch(err =>
                      res.send({
                          status: 400,
                          error: err
                      })
                  )
            : res.send({
                  status: 400,
                  error:
                      "The request body must contain a subreddit name: {subreddit: {{subredditName}}}."
              })
);

app.get(
    "/api/searchTag",
    (req, res) =>
        req.body
            ? imgurSearch
                  .byTag(
                      req.body.tagName,
                      req.body.pathOptions,
                      req.body.headerOptions
                  )
                  .then(response => res.send(response))
                  .catch(err =>
                      res.send({
                          status: 400,
                          error: err
                      })
                  )
            : res.send({
                  status: 400,
                  error:
                      "The request body must contain a tag name: {tagName: {{tagName}}}."
              })
);

app.get(
    "/api/searchString",
    (req, res) =>
        req.body
            ? imgurSearch
                  .byString(
                      req.body.searchString,
                      req.body.pathOptions,
                      req.body.headerOptions
                  )
                  .then(response => res.send(response))
                  .catch(err =>
                      res.send({
                          status: 400,
                          error: err
                      })
                  )
            : res.send({
                  status: 400,
                  error:
                      "The request body must contain a search string: {searchString: {{searchString}}}."
              })
);

app.listen(port, () => console.log("listening on " + port));
