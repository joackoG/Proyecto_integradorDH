window.onload = () => {
    function validarNombre() {
        let nombre = document.getElementById('nombreProd').value; // Modificado para usar getElementById
        if (nombre.length <= 2) {
            alert('El nombre debe tener más de dos caracteres.');
            return false; // Detiene el envío del formulario
        }
        return true;
    }

    // Captura el evento submit del formulario
    document.getElementById('formulario').addEventListener('submit', function(event) {
        // Verifica la validación del nombre antes de enviar el formulario
        if (!validarNombre()) {
            event.preventDefault(); // Detiene el envío del formulario si la validación falla
        }
    });
}
