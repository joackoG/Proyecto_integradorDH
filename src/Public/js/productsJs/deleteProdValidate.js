document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('deleteForm').addEventListener('submit', function(event) {
        event.preventDefault();

   
        Swal.fire({
            icon: 'question',
            title: '¿Estás seguro?',
            text: '¿Estás seguro que quieres eliminar este producto?',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.submit();
            }
        });
    });
});