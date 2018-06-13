const fetch = require("node-fetch");
const { getPathFromOptions } = require("./utils");

const imgurSearch = {
    apiUrl: "https://api.imgur.com/3",

    defaultRequestHeaderOptions: {
        showViral: true,
        mature: false,
        album_previews: false
    },

    getMainGallery: (pathOptions = {}, headerOptions = {}) => {
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

        return fetch(
            imgurSearch.apiUrl + "/gallery" + getPathFromOptions(pathOptions),
            {
                headers: {
                    ...headerOptions,
                    Authorization: "Client-ID " + process.env.IMGUR_CLIENT_ID,
                    Accept: "application/json"
                }
            }
        )
            .then(res => res.json())
            .catch(err => console.log(err));
    },

    byTag: () => console.log("hello")
};

module.exports = imgurSearch;
