// @Author - Srihari Goutham G R

const _ = require('lodash');

const orderService = require("../../services/order");

const orderSrchAttributes = ["delivery_partner_id", "orderId"]; //update-post

const LIMIT = process.env.LIMIT || 20;
const PAGE_SIZE = 20;
const ORDER_BY = process.env.ORDER_BY || {
    lastUpdatedDateAndTime: -1
};

module.exports = (router) => {
    router.route("/order")
        .post((req, res) => {
            try {
                let body = req.body;
                orderService.save(body).then((response) => {
                    res.status(200).send({
                        status: "200",
                        description: response.description,
                        data: response.data
                    });
                }).catch((error) => {
                    res.status(400).send({
                        status: "400",
                        description: error.description || error.message,
                        data: {}
                    });
                });
            } catch (error) {
                response.status = "400";
                response.data = error;
                response.description = "Something went wrong. Try again later!";
                res.status(400).send(response);
            }
        })
        .get((req, res, next) => {
            try {
                let query = _.pick(req.query, orderSrchAttributes);
                var queryModified = _.omitBy(query, function (value, key) {
                    return value.startsWith("undefined") || value.startsWith("null") || value.length == 0;
                });
                console.log(queryModified);
                console.log("sdsddsdsd");
                orderService.getMany(queryModified).then((response) => {
                    res.status(200).send({
                        data: response.data,
                        description: response.description,
                        status: 200
                    });
                }).catch((error) => {
                    res.status(400).send({
                        status: "400",
                        description: error.description || error.message,
                        data: {}
                    });
                });
            } catch (error) {
                res.status(500).send({
                    description: "Something went wrong - Server Error",
                    status: "500"
                });
            }
        })
        .put((req, res, next) => {
            try {
                
                orderService.update({orderId: req.query.orderId, status: req.body.status}).then((response) => {
                    res.status(200).send({
                        data: response.data,
                        description: response.description,
                        status: 200
                    });
                }).catch((error) => {
                    res.status(400).send({
                        status: "400",
                        description: error.description || error.message,
                        data: {}
                    });
                });
            } catch (error) {
                res.status(500).send({
                    description: "Something went wrong - Server Error",
                    status: "500"
                });
            }
        });
};