const mongoose = require("mongoose");

module.exports.connect = () => {
    return new Promise((resolve, reject)=>{
        try{
            mongoose.connect('mongodb://127.0.0.1:27017/elasticrun_deliverypartner_app', { useNewUrlParser: true }, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve("Connected to MongoDB");
                }
            }); 
        } catch (error){ 
            reject(error);
        }
    });
    
}