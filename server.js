/**
 * Created by Damian on 19.01.2017.
 */

var app = require('http').createServer(handler)
    ,fs = require('fs')
    ,io = require('socket.io').listen(app);

app.listen(80);

function handler(req, res) {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200);
        res.end(data);
    });
}

io.sockets.on('connection', function(socket) {
    console.log('Polaczenie');

    socket.on('draw', function(data) {
        console.log('draw x - '+data.mouse.x+' y - '+data.mouse.y);
        socket.broadcast.emit('draw', data);
    });

    socket.on('clear',function () {
        console.log('clear');
        socket.broadcast.emit('clear');
    });

    socket.on('tool',function () {
       socket.broadcast.emit('tool');
    });

    socket.on('fill',function (data) {
       socket.broadcast.emit('fill', data);
    });
});