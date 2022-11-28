$(function () {
    const socket = io();
    var nick = '';


    const messageForm = $('#messages-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    const nickForm = $('#nick-form');
    const nickError = $('#nick-error');
    const nickName = $('#nick-name');
    const userNames = $('#usernames');


    messageForm.submit(e => {
        e.preventDefault();
        socket.emit('enviar mensaje', messageBox.val());
        messageBox.val('');
    });

    socket.on('nuevo mensaje', function (datos) {
        let color = '#f5f4f4';
        console.log(datos.nick)
        if( datos.nick == undefined){
            chat.children("div").remove()
            $('#nick-wrap').show();
            $('#content-wrap').hide();

            nickError.html(`
            <div class="alert alert-danger">
            hubo un error, por favor vuelva a ingresar su usuario
            </div>
            `); 

            
        }else{
        if (nick == datos.nick) {
            color = '#9ff4c5';
        }

        chat.append(`
        <div class="msg-area mb-2" style="background-color:${color}">
            <p class="msg">${datos.time} <b>${datos.nick} :</b> ${datos.msg}</p>
        </div>
        `);
    }
    });

    socket.on('avisar nuevo usuario', function (datos) {
        let color = '#f5f4f4';
        if (nick == datos.nick) {
            color = '#9ff4c5';
        }

        chat.append(`
        <div class="msg-area mb-2" style="background-color:${color}">
            <p class="msg"><b>${datos.nick} se a conectado</p>
        </div>
        `);

    });




    nickForm.submit(e => {
        e.preventDefault();
        console.log('Enviando...');
        socket.emit('nuevo usuario', nickName.val(), datos => {
            if (datos) {
                nick = nickName.val();
                $('#nick-wrap').hide();
                $('#content-wrap').show();

            } else {
                nickError.html(`
                <div class="alert alert-danger">
                El usuario ya existe
                </div>
                `);
            }
            socket.emit('aviso nuevo usuario', nickName.val());

            nickName.val('');

        });

    });

    socket.on('usernames', datos => {
        let html = '';
        let color = '#000';
        let salir = '';
        console.log(nick);
        for (let i = 0; i < datos.length; i++) {
            if (nick == datos[i]) {
                color = '#027f43';
                salir = `<a class="enlace-salir" id='enlace-salir' href="/"><i class="fas fa-sign-out-alt salir"></i></a>`;

            } else {
                color = '#000';
                salir = '';
            }
            html += `<p style="color:${color}"><i class="fas fa-user"></i> ${datos[i]} ${salir}</p>`;
        }

        userNames.html(html);
    });



});

const mode = document.getElementById('flexSwitchCheckDefault')

mode.addEventListener('click', function () {
    if (mode.value == 'true') {
        mode.value = 'false'
        document.getElementById('style').href = './css/dark.css';
    } else {
        mode.value = 'true'
        document.getElementById('style').href = './css/main.css';

    }
    console.log(mode.value)

})



