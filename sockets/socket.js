const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Héroes del Silencio'));
bands.addBand(new Band('Metallica'));
//Mensajes de Sockets
//cliente dispositivo que se acaba de contectar a mi server
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands());
    client.on('disconnect', () => {console.log('Cliente descontectado')});

    client.on('mensaje',  (payload)=>{
        console.log('Mensaje!!!!', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'})
    });

    client.on('vote-band', (payload)=>{
        // console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    
    client.on('add-band', (payload)=>{
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    // client.on('emitir-mensaje',(payload)=> {
    //     console.log('emitiendo');
    //     // io.emit('nuevo-mensaje', payload); //emite a todos

    //     client.broadcast.emit('nuevo-mensaje', payload); // emite a todos excepto al emisor
    // })
    
  }
);