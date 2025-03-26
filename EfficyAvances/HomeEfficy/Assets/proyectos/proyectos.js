   // Lista inicial de proyectos
   const proyectos = [
];

const projectList = document.getElementById('projectList');
const createProjectModal = document.getElementById('createProjectModal');
const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementById('closeModalButton');

// Función para cargar la lista de proyectos
function loadProjects() {
    // Limpiar la lista antes de agregar nuevos proyectos
    projectList.innerHTML = '';
    proyectos.forEach(proyecto => {
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item');
        projectItem.innerHTML = `
            <a href="detalle_proyecto.html?id=${proyecto.id}">${proyecto.nombre}</a>
            <div class="action-buttons">
                <button>Ver Actividades</button>
            </div>
        `;
        projectList.appendChild(projectItem);
    });
}

// Abrir el modal cuando se haga clic en el botón
openModalButton.addEventListener('click', function() {
    createProjectModal.style.display = 'flex';
});

// Cerrar el modal cuando se haga clic en el botón de cerrar
closeModalButton.addEventListener('click', function() {
    createProjectModal.style.display = 'none';
});

// Agregar nuevo proyecto
document.getElementById('createProjectForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    
    // Crear un nuevo proyecto y agregarlo al array de proyectos
    const newProject = {
        id: proyectos.length + 1, // Simple lógica para ID único
        nombre: projectName,
        descripcion: projectDescription
    };
    proyectos.push(newProject);
    
    // Volver a cargar la lista de proyectos con el nuevo
    loadProjects();
    
    // Limpiar los campos del formulario
    document.getElementById('createProjectForm').reset();
    
    // Cerrar el modal
    createProjectModal.style.display = 'none';
});

// Cargar proyectos cuando la página se haya cargado
window.onload = loadProjects;

// Lista inicial de equipos
const equipos = [];

const teamList = document.getElementById('teamList');
const createTeamModal = document.getElementById('createTeamModal');
const openTeamModalButton = document.getElementById('openTeamModalButton');
const closeTeamModalButton = document.getElementById('closeTeamModalButton');

// Función para cargar la lista de equipos
function loadTeams() {
    // Limpiar la lista antes de agregar nuevos equipos
    teamList.innerHTML = '';
    equipos.forEach(equipo => {
        const teamItem = document.createElement('div');
        teamItem.classList.add('team-item');
        teamItem.innerHTML = `
            <a href="detalle_equipo.html?id=${equipo.id}">${equipo.nombre}</a>
            <div class="action-buttons">
                <button>Ver Miembros</button>
            </div>
        `;
        teamList.appendChild(teamItem);
    });
}

// Abrir el modal cuando se haga clic en el botón
openTeamModalButton.addEventListener('click', function() {
    createTeamModal.style.display = 'flex';
});

// Cerrar el modal cuando se haga clic en el botón de cerrar
closeTeamModalButton.addEventListener('click', function() {
    createTeamModal.style.display = 'none';
});

// Agregar nuevo equipo
document.getElementById('createTeamForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const teamName = document.getElementById('teamName').value;
    const teamDescription = document.getElementById('teamDescription').value;
    
    // Crear un nuevo equipo y agregarlo al array de equipos
    const newTeam = {
        id: equipos.length + 1, // Genera un ID único
        nombre: teamName,
        descripcion: teamDescription
    };
    equipos.push(newTeam);
    
    // Volver a cargar la lista de equipos con el nuevo
    loadTeams();
    
    // Limpiar los campos del formulario
    document.getElementById('createTeamForm').reset();
    
    // Cerrar el modal
    createTeamModal.style.display = 'none';
});

// Cargar equipos cuando la página se haya cargado
window.onload = loadTeams;
