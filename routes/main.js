const _ = require('lodash');



module.exports = (router) => {
    router.use(function (request, response, next) {
        try {
            // All sorts of validation can be carried out here...
            require('./api/api')(router);
                next();
        }
        catch (error) {
            response.status(500).send({
                description: "Something went wrong - Server Error",
                status: "500"
            });
        }
    });
}