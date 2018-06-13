const getPathFromOptions = pathOptions => {
    let query = "";

    for (let key in pathOptions) {
        query += "/" + pathOptions[key];
    }

    return query;
};

const isValidRequestOption = (pathOptions, headerOptions, reject) => {
    if (typeof pathOptions !== "object" || typeof headerOptions !== "object") {
        reject("The path and header options have to be provided in an object.");
    }
};

module.exports = {
    getPathFromOptions,
    isValidRequestOption
};
