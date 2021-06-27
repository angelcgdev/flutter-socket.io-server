const express = require('express');
const path = require('path');
// Configure the .env file as port
require('dotenv').config();
//App de Express
const app = express();
//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');





// path public

const publicPath = path.resolve(__dirname,'public')
app.use(express.static(publicPath));


//define en que puerto correra nuestro server
server.listen(process.env.PORT, (err)=>{
 if(err) throw new Error(err);
 console.log('Servidor corriendo en el puerto', process.env.PORT);
});