import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, updatePassword, updateProfile, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Función para reautenticar al usuario
async function reautenticarUsuario(user, contrasenaActual) {
  const credential = EmailAuthProvider.credential(user.email, contrasenaActual);
  try {
    await reauthenticateWithCredential(user, credential);
    console.log("Usuario reautenticado correctamente.");
  } catch (error) {
    console.error("Error al reautenticar al usuario:", error);
    throw error;
  }
}

// Función para editar el perfil del usuario
window.editarUsuario = async function () {
  const user = auth.currentUser;
  const nuevoNombre = document.getElementById("editNombre").value.trim();
  const contrasenaActual = prompt("Por favor, ingresa tu contraseña actual para confirmar los cambios:");

  // Validar que al menos uno de los campos esté lleno
  if (!nuevoNombre && !nuevaContrasena) {
    alert("Por favor, completa al menos un campo para actualizar.");
    return;
  }

  try {
    // Reautenticar al usuario antes de realizar cambios
    await reautenticarUsuario(user, contrasenaActual);

    let actualizaciones = [];

    // Actualizar el nombre del usuario
    if (nuevoNombre) {
      const actualizarNombre = updateProfile(user, { displayName: nuevoNombre })
        .then(() => {
          console.log("Nombre actualizado:", nuevoNombre);

          // Actualizar el nombre en el span
          const usuarioNombreElement = document.getElementById("usuarioNombre");
          if (usuarioNombreElement) {
            usuarioNombreElement.textContent = nuevoNombre;
          }

          // Actualizar el nombre en localStorage
          localStorage.setItem("usuarioNombre", nuevoNombre);

          alert("Nombre actualizado correctamente.");
        })
        .catch((error) => {
          console.error("Error al actualizar el nombre:", error);
          alert("Hubo un error al actualizar el nombre. Inténtalo de nuevo.");
        });

      actualizaciones.push(actualizarNombre);
    }

   
    // Esperar a que todas las actualizaciones se completen
    await Promise.all(actualizaciones);
    console.log("Todas las actualizaciones se completaron.");
  } catch (error) {
    console.error("Error durante la actualización:", error);
    alert("No se pudieron realizar los cambios. Por favor, verifica tu contraseña actual e inténtalo de nuevo.");
  }
};