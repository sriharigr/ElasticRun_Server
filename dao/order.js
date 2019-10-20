var mongoose = require("mongoose");
const schema = require("../schemas/order").schema;
const collection = mongoose.model("order", schema);

module.exports.save = (data) => {
  return new Promise((resolve, reject) => {
    try {
      let order = new collection(data);
      order.save().then((response) => {
        resolve(response);
      }).catch((error) => {
          console.log(error);
        reject(error);
      })
    } catch (thrownError) {
      reject(thrownError);
    }
  });
}

module.exports.update = (orderId, updateQuery) => {
    return new Promise((resolve, reject) => {
      try {
        collection.updateOne({orderId}, updateQuery).then((response) => {
        console.log(response);
          resolve(response);
        }).catch((error) => {
            console.log(error);
          reject(error);
        })
      } catch (thrownError) {
        reject(thrownError);
      }
    });
  }

module.exports.getMany = (query, sortBy) => {
    return new Promise((resolve, reject) => {
      try {
        collection.find(query).sort(sortBy).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        })
      } catch (thrownError) {
        reject(thrownError);
      }
    });
  }
