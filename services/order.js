const dao = require("../dao/order");

module.exports.save = (object) => {
    return new Promise((resolve, reject) => {
        try {
            dao.save(object).then((response) => {
                resolve({
                    data: {
                        orderId: response.orderId
                    },
                    description: 'Order Saved Successfully',
                    status: 200
                });
            }).catch((error) => {
                reject({
                    data: {},
                    description: error.description ? error.description : 'Failed to Save',
                    status: 400
                });
            });
        } catch (error) {
            reject({
                data: {},
                description: error.message ? error.message : 'Unable to save',
                status: 400
            });
        }
    });
}

module.exports.getMany = (query, sortBy) => {
    return new Promise((resolve, reject) => {
        try {
            sortBy = { lastUpdatedDateAndTime: -1 };
            dao.getMany(query, sortBy).then((response) => {
                resolve({
                    data: response,
                    description: 'Orders Fetched Successfully',
                    status: 200
                });
            }).catch((error) => {
                reject({
                    data: {},
                    description: error.description ? error.description : 'Failed to Fetch Orders',
                    status: 400
                });
            })
        } catch (error) {
            reject({
                data: {},
                description: error.message ? error.message : 'Failed to Fetch Orders',
                status: 400
            });
        }
    });
}

module.exports.update = (query) => {
    return new Promise((resolve, reject) => {
        try {
            var updateQuery = {
                $set: {status : query.status, lastUpdatedDateAndTime: new Date()} 
            };
            console.log(updateQuery);
            console.log(query);
            dao.update(query.orderId, updateQuery).then((response) => {
                resolve({
                    data: {},
                    description: 'Order Updated Successfully',
                    status: 200
                });
            }).catch((error) => {
                reject({
                    data: {},
                    description: error.description ? error.description : 'Failed to Save',
                    status: 400
                });
            })
        } catch (error) {
            reject({
                data: {},
                description: error.message ? error.message : 'Unable to save',
                status: 400
            });
        }
    });
}