const getPathFromOptions = pathOptions => {
    let query = "";

    for (let key in pathOptions) {
        query += "/" + pathOptions[key];
    }

    return query;
};

module.exports = {
    getPathFromOptions
};
