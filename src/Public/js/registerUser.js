window.onload = () => {
    const nombreInput = document.getElementById('nombre');
    const fechaNacInput = document.getElementById('fechaNac');
    const correoInput = document.getElementById('correo');
    const passwordInput = document.getElementById('password');

    const toast = document.getElementById('toast');
    // errores
    const nombreError = document.getElementById('nombreError');
    const fechaNacError = document.getElementById('fechaNacError');
    const correoError = document.getElementById('correoError');
    const passwordError = document.getElementById('passwordError');



    function validarNombre() {
        const nombre = nombreInput.value.trim();
        if (nombre.length <= 2 || nombre.length === 0) {
            nombreError.style.display = 'block';
        } else {
            nombreError.style.display = 'none';
        }
        actualizarToast(nombreError.style.display);
    }

    function validarFechaNac() {
        const fechaNacValue = fechaNacInput.value.trim();


        const fechaNac = new Date(fechaNacValue);
        const fechaActual = new Date();

        if (isNaN(fechaNac.getTime()) || fechaNac >= fechaActual) {
            fechaNacError.style.display = 'block';
        } else {
            fechaNacError.style.display = 'none';
        }

        actualizarToast(fechaNacError.style.display);
    }

    function validarCorreo() {
        const correo = correoInput.value;
        const gmailDomain = "@gmail.com";

        if (correo === "" || !correo.includes(gmailDomain)) {
            correoError.style.display = 'block';
        } else {
            correoError.style.display = 'none';
        }

        actualizarToast(correoError.style.display);
    }

    function validarpassword() {
        const password = passwordInput.value.trim();
        if (password === "" || password.length <= 8) {
            passwordError.style.display = 'block';
            
        } else {
            passwordError.style.display = 'none';
        }
        actualizarToast( passwordError.style.display);
    }
   
    function actualizarToast(estado) {
        if (estado === 'block') {
            toast.classList.add('show');
        } else {
            toast.classList.remove('show');
        }
    }
    

    nombreInput.addEventListener('input', validarNombre);
    correoInput.addEventListener('input', validarCorreo)
    fechaNacInput.addEventListener('change', validarFechaNac);
    passwordInput.addEventListener('input', validarpassword);


};