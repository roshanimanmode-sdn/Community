'use Strict';  
 
require('@babel/register')
require('@babel/polyfill');
const http = require ('http');

const app = require('../app').default;
const server = http.createServer(app);

const config = require('../config')
// console.log(process.env.Node_env);
const configvalue = config.get(process.env.Node_env);

const port = configvalue.PORTNO;

server.listen(port);

server.on('listening', ()=> {
   console.log(`Listening on ${port}`);
});


/* SOCKET EVENTS */
const Server = require('socket.io');
const io =  Server(server, {
   maxHttpBufferSize: 1e12,
   pingTimeout: 6000,
   cors: {
     origin: "*",
   },
 });

// Use the handleSocketEvents function to handle socket events
const handleSocketEvents = require('../middleware/socketEvents.js');
handleSocketEvents(io);
