window.onload = () => {
    function validarNombre() {
        let nombre = document.getElementById('nombreProd').value;
        if (nombre.length <= 2) {
            alert('El nombre debe tener más de dos caracteres.');
            return false; // Detiene el envío del formulario
        }
        return true;
    }


    document.getElementById('formulario').addEventListener('submit', function(event) {
        
        if (!validarNombre()) {
            event.preventDefault(); 
        }
    });
}
