window.addEventListener('load', () => {

    function validarNombre() {
        let nombre = document.getElementById('nombre').value; 
        if(nombre == ""){
            return 'El nombre no debe estar vacio.\n'; 

        }
        if (nombre.length <= 5 ) {
            return 'El nombre debe tener más de cinco caracteres.\n'; 
        }
        return '';
    }

    function validarCorreo(){

        let correo = document.getElementById('email').value; 
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(correo === ""){
            return 'El correo electronico no debe estar vacio.\n';

        }
        
        if (!correoRegex.test(correo)){
            return 'El correo electronico no es valido.\n';
        }
        return '';

    }
    function validarPassword() {
        let password = document.getElementById('password').value; 
        if(password == ""){
            return 'La contraseña no debe ser vacia.\n'; 

        }
        if (password.length <= 8 ) {
            return 'Su contraseña debe tener más de ocho caracteres.\n'; 
        }
        return '';
    }



    function validarImagen() {
        let fileInput = document.getElementById('fotoPerfil');
        let filePath = fileInput.value; 
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; 
    
        let mensaje = '';
        if (!filePath) {
            mensaje += 'Por favor, seleccione un archivo de imagen.\n';
        }
    
        if (!allowedExtensions.exec(filePath)) {
            mensaje += 'El archivo de imagen debe tener una extensión válida (JPG, JPEG, PNG, GIF).\n';
            fileInput.value = ''; 
        }
    
        return mensaje; 
    }
    
    document.getElementById('formulario').addEventListener('submit', function(event) {
        let mensajesAlerta = [];
    
        let mensajeNombre = validarNombre();
        if (mensajeNombre !== '') {
            mensajesAlerta.push(mensajeNombre);
        }
    
        
        let mensajeCorreo = validarCorreo();
        if (mensajeCorreo !== '') {
            mensajesAlerta.push(mensajeCorreo);
        }
        let mensajePassword = validarPassword();
        if (mensajePassword !== '') {
            mensajesAlerta.push(mensajePassword);
        }
    
    
        let mensajeImagen = validarImagen();
        if (mensajeImagen !== '') {
            mensajesAlerta.push(mensajeImagen);
        }

    
        let listaMensajes = '<ul>';
        mensajesAlerta.forEach(mensaje => {
            listaMensajes += `<li>${mensaje}</li>`;
        });
        listaMensajes += '</ul>';
    
       
        if (mensajesAlerta.length > 0) {
            Swal.fire({
                icon: "warning",
                title: 'Algunos errores',
                html: listaMensajes,
            });
            event.preventDefault();
        }
    });
    
});
