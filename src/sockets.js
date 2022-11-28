module.exports = (io) => {

    let nickNames = [];

    io.on('connection', socket => {


        socket.on('aviso nuevo usuario', (datos) => {

            io.sockets.emit('avisar nuevo usuario', {
                nick: socket.nickname
            });
        });

        socket.on('enviar mensaje', (datos) => {
            var resolvedOptions = Intl.DateTimeFormat().resolvedOptions()
            var now = new Date().toLocaleString("es-MX", {timeZone: 'America/Buenos_Aires'})
            console.log(resolvedOptions)
            io.sockets.emit('nuevo mensaje', {
                time: now, 
                msg: datos,
                nick: socket.nickname
            });
        });



        socket.on('nuevo usuario', (datos, callback) => {

            if (nickNames.indexOf(datos) != -1) {
                callback(false);
            } else {
                callback(true);
                socket.nickname = datos;
                nickNames.push(socket.nickname);

                actualizarUsuarios();
            }
        });

        socket.on('disconnect', datos => {
            if (!socket.nickname) {
                return;
            } else {
                
                nickNames.splice(nickNames.indexOf(socket.nickname), 1);

                actualizarUsuarios();

            }
        });

        function actualizarUsuarios() {
            io.sockets.emit('usernames', nickNames);
        }

            actualizarUsuarios();
        
    });

    
}

