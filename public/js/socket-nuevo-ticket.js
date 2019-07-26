// Comando para establecer la conexiónn
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

// Sirve para mostrar el ultimo ticket, cada vez que se recarga la pagina web
socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});

// Se ejecuta cada vez que se da click al boton "Generar nuevo ticket"
$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
    
});
