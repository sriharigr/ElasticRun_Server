//@Author - Srihari Goutham G R

//External Libraries
const logName = 'In Server : ';
const express = require("express");
const bodyParser = require('body-parser');
const client = require("./db/mongo");

var IP = process.env.IP || "192.168.43.230";
var PORT = process.env.PORT || "5051";

client.connect().then((response) => {
    console.log(`${logName} MongoDB is up and running!`, response);
    
}).catch((error) => {
    console.log(`${logName} Is MongoDB running? Doesn't seem so!`);
    console.log('Server will be halted as the Database is not up and running');
});

var app = express();
var router = express.Router();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Request-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST,PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,X-HTTP-Method-Override, Content-Type, X-USER");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
  

app.use(bodyParser.urlencoded({
  limit: '1mb',
  extended: true
}));

app.use(bodyParser.json({
  limit: '1mb'
}));

require("./routes/main")(router);

app.use("/api", router);



app.listen(PORT, IP, () => {
  console.log(`${logName} Http Server Started on IP ${IP} - PORT ` + PORT);
});

module.exports.app = app;
