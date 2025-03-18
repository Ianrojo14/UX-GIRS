function IniciarSesion() {
    // Lista de usuarios con correos y contraseñas
    const usuarios = [
        { usuario: "Ian Chavez", correo: "surehi@gmail.com", contrasena: "ian1234" },
        { correo: "usuario2@example.com", contrasena: "password2" },
        { correo: "usuario3@example.com", contrasena: "password3" }
    ];

    // Obtener valores de los campos de entrada
    const correoInput = document.getElementById("correo").value;
    const contrasenaInput = document.getElementById("contrasena").value;

    // Validar credenciales
    const usuarioValido = usuarios.find(
        usuario => usuario.correo === correoInput && usuario.contrasena === contrasenaInput
    );

    if (usuarioValido) {
        // Guardar el correo del usuario en localStorage
        localStorage.setItem("usuarioLogueado", usuarioValido.usuario);

        // Redirigir al home si las credenciales son correctas
        window.location.href = "home.html";
    } else {
        // Mostrar modal de error si las credenciales son incorrectas
        const modal = document.getElementById("errorModal");
        modal.style.display = "block";
    }
}
function CerrarModal() {
    const modal = document.getElementById("errorModal");
    modal.style.display = "none";
}
function Registro() {
    // Obtener valores de los campos de entrada
    const correoInput = document.getElementById("correo").value;
    const contrasenaInput = document.getElementById("contrasena").value;

    // Validar que los campos no estén vacíos
    if (!correoInput || !contrasenaInput) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Obtener el array de usuarios desde localStorage o inicializarlo si no existe
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si el correo ya está registrado
    const usuarioExistente = usuarios.find(usuario => usuario.correo === correoInput);
    if (usuarioExistente) {
        alert("Este correo ya está registrado.");
        return;
    }

    // Agregar el nuevo usuario al array
    usuarios.push({ correo: correoInput, contrasena: contrasenaInput });

    // Guardar el array actualizado en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Redirigir al login
    window.location.href = "login.html";
}