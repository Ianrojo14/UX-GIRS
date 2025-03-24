import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADxPHW-yxFNUYnRTvgUlEJcJID6vHyNtQ",
  authDomain: "ux-girs.firebaseapp.com",
  projectId: "ux-girs",
  storageBucket: "ux-girs.firebasestorage.app",
  messagingSenderId: "694453443593",
  appId: "1:694453443593:web:84581d1c48e76a9ebbacd8",
  measurementId: "G-RTJHC28KGH"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Función para iniciar sesión
window.IniciarSesion = function () {
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;

  signInWithEmailAndPassword(auth, correo, contrasena)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuario inició sesión:", user);
      // Guardar el nombre del usuario en localStorage
      localStorage.setItem("usuarioNombre", user.displayName || user.email);
      window.location.href = "home.html"; // Redirigir al home
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = "Contraseña o usuario inválido, asegúrese de registrarse primero.";

      console.error("Error:", errorCode, errorMessage);

      // Mostrar un mensaje personalizado en el modal
      const errorTextElement = document.getElementById("errorMessage");
      if (errorTextElement) {
        if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
          errorTextElement.textContent = errorMessage;
        } else {
          errorTextElement.textContent = errorMessage; // Mostrar el mensaje de error original
        }
      }

      const modal = document.getElementById("errorModal");
      if (modal) {
        modal.style.display = "block";
      }
    });
};

// Función para cerrar el modal
window.CerrarModal = function () {
  const modal = document.getElementById("errorModal");
  if (modal) {
    modal.style.display = "none";
  }
};

// Función para registrar un usuario
window.Registro = function() {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;

  createUserWithEmailAndPassword(auth, correo, contrasena)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuario registrado:", user);
      // Actualizar el perfil del usuario con el nombre
      updateProfile(user, {
        displayName: nombre
      }).then(() => {
        console.log("Nombre del usuario actualizado:", user.displayName);
        window.location.href = "login.html"; // Redirigir al login
      }).catch((error) => {
        console.error("Error al actualizar el nombre del usuario:", error);
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error("Error:", errorMessage);
      const modalBody = document.querySelector(".modal-body p");
      if (modalBody) {
        modalBody.textContent = errorMessage;
        document.getElementById("errorModal").style.display = "block";
      }
    });
}



// function IniciarSesion() {
//     // Lista de usuarios con correos y contraseñas
//     const usuarios = [
//         { usuario: "Ian Chavez", correo: "surehi@gmail.com", contrasena: "ian1234" },
//         { correo: "usuario2@example.com", contrasena: "password2" },
//         { correo: "usuario3@example.com", contrasena: "password3" }
//     ];

//     // Obtener valores de los campos de entrada
//     const correoInput = document.getElementById("correo").value;
//     const contrasenaInput = document.getElementById("contrasena").value;

//     // Validar credenciales
//     const usuarioValido = usuarios.find(
//         usuario => usuario.correo === correoInput && usuario.contrasena === contrasenaInput
//     );

//     if (usuarioValido) {
//         // Guardar el correo del usuario en localStorage
//         localStorage.setItem("usuarioLogueado", usuarioValido.usuario);

//         // Redirigir al home si las credenciales son correctas
//         window.location.href = "home.html";
//     } else {
//         // Mostrar modal de error si las credenciales son incorrectas
//         const modal = document.getElementById("errorModal");
//         modal.style.display = "block";
//     }
// }

// function CerrarModal() {
//     const modal = document.getElementById("errorModal");
//     modal.style.display = "none";
// }

