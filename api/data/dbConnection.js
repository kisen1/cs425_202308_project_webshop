const mongoose = require("mongoose");
require("./productsModel");
require("./usersModel");

mongoose.connect(
    process.env.DB_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true}
);

mongoose.set('strictQuery', true);

mongoose.connection.on(process.env.DB_CONNECTED_EVENT, function(){
    console.log(process.env.DB_CONNECTED_MSG);
});

mongoose.connection.on(process.env.DB_DISCONNECTED_EVENT, function(){
    console.log(process.env.DB_DISCONNECTED_MSG);
});

mongoose.connection.on(process.env.DB_ERROR_EVENT, function(err){
    console.log(process.env.DB_CONNECTION_ERROR_MSG, err);
});

process.on(process.env.SIGNAL_INTERRUPTION_EVENT, function(){
    mongoose.disconnect()
        .then(()=> process.exit(0))
        .catch((error)=> console.log(error));
});

process.on(process.env.SIGNAL_TERMINATION_EVENT, function(){
    mongoose.disconnect()
        .then(()=> process.exit(0))
        .catch((error)=> console.log(error));
});

process.once(process.env.SIGNAL_USR2_EVENT, function(){
    mongoose.disconnect()
        .then(()=> process.kill(process.pid, process.env.SIGNAL_USR2_EVENT))
        .catch((error)=>console.log(error));
});