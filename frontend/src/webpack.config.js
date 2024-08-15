// webpack.config.js
module.exports = {
    // other configurations
    resolve: {
        fallback: {
            crypto: false,
        },
    },
};
