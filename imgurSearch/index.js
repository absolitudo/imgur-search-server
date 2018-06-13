const fetch = require("node-fetch");
const {
    getPathFromOptions,
    isValidRequestOption,
    createSearchQuery
} = require("./utils");

const imgurSearch = {
    apiUrl: "https://api.imgur.com/3",

    defaultRequestHeaderOptions: {
        showViral: true,
        mature: false,
        album_previews: false
    },

    getMainGallery: (pathOptions = {}, headerOptions = {}) => {
        return new Promise((resolve, reject) => {
            isValidRequestOption(pathOptions, headerOptions, reject);
            pathOptions = {
                ...{
                    section: "hot",
                    sort: "top",
                    window: "all",
                    page: 1
                },
                ...pathOptions
            };

            headerOptions = {
                ...{
                    showViral: true,
                    mature: false,
                    album_previews: false
                },
                ...headerOptions
            };

            fetch(
                imgurSearch.apiUrl +
                    "/gallery" +
                    getPathFromOptions(pathOptions),
                {
                    headers: {
                        ...headerOptions,
                        Authorization:
                            "Client-ID " + process.env.IMGUR_CLIENT_ID,
                        Accept: "application/json"
                    }
                }
            )
                .then(res => resolve(res.json()))
                .catch(err => reject(err));
        });
    },

    bySubreddit: (subreddit, pathOptions = {}, headerOptions = {}) => {
        return new Promise((resolve, reject) => {
            isValidRequestOption(pathOptions, headerOptions, reject);

            if (!subreddit) {
                reject(
                    "To search by subreddit, you need to provide a subreddit name."
                );
            }
            pathOptions = {
                ...{
                    subreddit: subreddit,
                    sort: "time",
                    window: "all",
                    page: 1
                },
                ...pathOptions
            };
            fetch(
                imgurSearch.apiUrl +
                    "/gallery/r/" +
                    getPathFromOptions(pathOptions),
                {
                    headers: {
                        ...headerOptions,
                        Authorization:
                            "Client-ID " + process.env.IMGUR_CLIENT_ID,
                        Accept: "application/json"
                    }
                }
            )
                .then(res => resolve(res.json()))
                .catch(err => reject(err));
        });
    },

    byTag: (tagName, pathOptions = {}, headerOptions = {}) => {
        return new Promise((resolve, reject) => {
            isValidRequestOption(pathOptions, headerOptions, reject);

            if (!tagName) {
                reject("To search by tag, you need to provide a tag name.");
            }
            pathOptions = {
                ...{
                    tagName: tagName,
                    sort: "time",
                    window: "all",
                    page: 1
                },
                ...pathOptions
            };
            fetch(
                imgurSearch.apiUrl +
                    "/gallery/t/" +
                    getPathFromOptions(pathOptions),
                {
                    headers: {
                        ...headerOptions,
                        Authorization:
                            "Client-ID " + process.env.IMGUR_CLIENT_ID,
                        Accept: "application/json"
                    }
                }
            )
                .then(res => resolve(res.json()))
                .catch(err => reject(err));
        });
    },

    getTags: () => {
        return new Promise((resolve, reject) => {
            fetch("https://api.imgur.com/3/tags", {
                headers: {
                    Authorization: "Client-ID " + process.env.IMGUR_CLIENT_ID,
                    Accept: "application/json"
                }
            })
                .then(res => resolve(res.json()))
                .catch(err => reject(err));
        });
    },

    byString: (searchString, pathOptions = {}, headerOptions = {}) => {
        return new Promise((resolve, reject) => {
            isValidRequestOption(pathOptions, headerOptions, reject);

            if (!searchString) {
                reject("To search by string, you need to provide a string.");
            }
            pathOptions = {
                ...{
                    sort: "time",
                    window: "all",
                    page: 1
                },
                ...pathOptions
            };
            fetch(
                imgurSearch.apiUrl +
                    "/gallery/search/" +
                    getPathFromOptions(pathOptions) +
                    createSearchQuery(searchString),
                {
                    headers: {
                        ...headerOptions,
                        Authorization:
                            "Client-ID " + process.env.IMGUR_CLIENT_ID,
                        Accept: "application/json"
                    }
                }
            )
                .then(res => resolve(res.json()))
                .catch(err => reject(err));
        });
    }
};

module.exports = imgurSearch;
