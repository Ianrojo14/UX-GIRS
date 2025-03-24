// Assuming you have a way to get the user's name, for example, from a global variable or an API call.
document.addEventListener("DOMContentLoaded", function() {
    const usuarioNombre = localStorage.getItem("usuarioNombre");
    if (usuarioNombre) {
      document.getElementById("usuarioNombre").textContent = usuarioNombre;
    }
  });

// Example function to simulate getting the user's name
function getUserName() {
    return "User-Acount"; // Replace with actual logic to fetch the user's name
}

