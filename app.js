require("dotenv").config();
require("./api/data/dbConnection");
const express = require("express");
const router = require("./api/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", function(req, res, next){
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-requested-with, Accept, authorization');
    res.header('Access-Control-Allow-Methods','DELETE, GET, POST, PUT, PATCH');
    next();
});

app.use("/api", router);

const server = app.listen(process.env.SERVER_PORT, function(){
    console.log("Listening on port", server.address().port);
});


