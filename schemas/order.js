const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var orderSchema = new Schema({
    orderId: {
        type: String,
        required: true
    }, 
    cust_name: {
        type: String,
        required: true
    },
    cust_id: {
        type: String,
        required: true
    },
    delivery_address: {
        type: String,
        required: true
    },
    createdDateAndTime: {
        type: Date,
        default: Date.now(),
        required: true
    },
    lastUpdatedDateAndTime: {
        type: Date,
        default: Date.now(),
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "COMPLETED"],
        default: "PENDING"
    },
    pay_collect: {
        type: String,
        enum: ["true", "false"],
        default: "false"
    },
    pay_amount: {
        type: String,
        default: null
    },
    delivery_partner_id: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    delivery_partner_comments: {
        type: String
    }
});

module.exports.schema = orderSchema;