const {io} = require('../index');

//Mensajes de Sockets
//cliente dispositivo que se acaba de contectar a mi server
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => {console.log('Cliente descontectado')});

    client.on('mensaje',  (payload)=>{
        console.log('Mensaje!!!!', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'})
    });
  });