module.exports = {
    secret: "leasing-transport-resource",
    jwtExpiration: 3600,
    jwtRefreshExpiration: 86400,   // 24 hours

    /* for test */
    // jwtExpiration: 60,          // 1 minute
    // jwtRefreshExpiration: 120,  // 2 minutes
};