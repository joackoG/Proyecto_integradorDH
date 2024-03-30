document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('deleteForm').addEventListener('submit', function(event) {
        event.preventDefault();

        Swal.fire({
            icon: 'question',
            title: '¿Estás seguro?',
            text: '¿Estás seguro que quieres eliminar tu cuenta de usuario?',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.submit();
            }
        }).then(() => {

            Swal.fire({
                icon: 'success',
                title: 'Eliminación exitosa',
                text: 'Tu cuenta de usuario ha sido eliminada correctamente',
                timer: 4000 
            });
        }).catch((error) => {
          
            console.error('Error al enviar el formulario:', error);

           
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al intentar eliminar tu cuenta de usuario'
            });
        });
    });
});
