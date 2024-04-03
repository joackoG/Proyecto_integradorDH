window.addEventListener('load', () => {

    function validarNombre() {
        let nombre = document.getElementById('nombreProd').value; 
        if (nombre.length <= 5) {
            return 'El nombre debe tener más de cinco caracteres.\n'; 
        }
        return '';
    }

    function validarDescripcion(){
        let descripcion = document.getElementById('descripcion').value; 

        if (descripcion.length <= 20){
            return 'La descripción debe tener al menos 20 caracteres.\n';
        }
        return '';
    }

    function validarImagen() {
        let fileInput = document.getElementById('image');
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
    
        
        let mensajeDescripcion = validarDescripcion();
        if (mensajeDescripcion !== '') {
            mensajesAlerta.push(mensajeDescripcion);
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
