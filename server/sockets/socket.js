const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('siguienteTicket', (data, callback) => {

        const siguiente = ticketControl.siguiente();

        client.emit('siguienteTicket', siguiente);
        console.log(siguiente);
        callback(siguiente);

    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        // Actualizar / Notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimos4() });

    });

});