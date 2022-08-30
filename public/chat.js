$(() =>{
    $('#enviar').click(()=> {
        var mensaje = {
            nombre: $('#nombre').val(),
            mensaje: $('#mensaje').val()

        }
    })
})