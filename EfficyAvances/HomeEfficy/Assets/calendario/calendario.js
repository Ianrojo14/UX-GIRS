document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        editable: true,

        // 🔹 Cargar eventos guardados
        events: obtenerEventos(),

        // 🔹 Agregar evento nuevo al seleccionar fechas
        select: function (info) {
            let title = prompt("Ingrese el título del evento:");
            if (title) {
                let newEvent = {
                    id: new Date().getTime().toString(), // ID único
                    title: title,
                    start: info.startStr,
                    end: info.endStr
                };
                calendar.addEvent(newEvent);
                guardarEventos([...obtenerEventos(), newEvent]);
            }
        },

        // 🔹 Editar o eliminar evento al hacer clic
        eventClick: function (info) {
            let opciones = confirm("Editar: OK | Eliminar: Cancelar");

            if (opciones) {
                let nuevoTitulo = prompt("Editar título del evento:", info.event.title);
                if (nuevoTitulo) {
                    info.event.setProp('title', nuevoTitulo);
                    actualizarEvento(info.event);
                }
            } else {
                if (confirm("¿Seguro que quieres eliminar este evento?")) {
                    info.event.remove();
                    eliminarEvento(info.event.id);
                }
            }
        }
    });

    calendar.render();

    // 📌 Función para obtener eventos desde localStorage
    function obtenerEventos() {
        let eventosGuardados = localStorage.getItem('eventos');
        return eventosGuardados ? JSON.parse(eventosGuardados) : [];
    }

    // 📌 Función para guardar eventos en localStorage
    function guardarEventos(eventos) {
        localStorage.setItem('eventos', JSON.stringify(eventos));
    }

    // 📌 Función para actualizar evento en localStorage
    function actualizarEvento(evento) {
        let eventos = obtenerEventos();
        let index = eventos.findIndex(e => e.id === evento.id);
        if (index !== -1) {
            eventos[index].title = evento.title;
            guardarEventos(eventos);
        }
    }

    // 📌 Función para eliminar evento de localStorage
    function eliminarEvento(eventoId) {
        let eventos = obtenerEventos().filter(e => e.id !== eventoId);
        guardarEventos(eventos);
    }
});