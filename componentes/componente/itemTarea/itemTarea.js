import { tareas } from "../../../data/dbTareas.js";
import { usuarios } from "../../../data/dbUsuarios.js";

function tarea({ nombre, personas, fecha, estado }) {
    let itemTarea = document.createElement('div');
    itemTarea.className = "itemTarea";
    
    let nombreTarea = document.createElement('h3');
    nombreTarea.textContent = nombre;
    itemTarea.appendChild(nombreTarea);
    
    // Convertir personas a emojis y mostrarlos
    let usuariosTarea = document.createElement('p');
    usuariosTarea.className = "Usuario";
    usuariosTarea.textContent = `Usuarios asignados: ${obtenerEmojis(personas).join(' ')}`; // Usar los emojis en lugar de IDs
    itemTarea.appendChild(usuariosTarea);
    
    let fechaTarea = document.createElement('p');
    fechaTarea.className = "fecha";
    fechaTarea.textContent = `Fecha de entrega: ${fecha}`;
    itemTarea.appendChild(fechaTarea);
    
    let estadoTarea = document.createElement('p');
    estadoTarea.className = "estado";
    estadoTarea.textContent = `Estado:  ${estado}`;
    itemTarea.appendChild(estadoTarea);
    
    return itemTarea;
}

// Función para obtener emojis de usuarios asignados
function obtenerEmojis(usuariosAsignados) {
    return usuariosAsignados.map(id => {
        const usuario = usuarios.find(e => e.id_usuario === id);
        return usuario ? usuario.emoji : '❓'; // Si no encuentra el usuario, muestra un emoji de interrogación
    });
}

// Función para agregar tareas al contenedor
function agregarTareasAlContenedor(tareas) {
    let contenedorTareas = document.createElement('section');
    contenedorTareas.className = "contenedorTareas";

    tareas.forEach(tareaData => {
        const tareaComponente = tarea({
            nombre: tareaData.nombre,
            personas: tareaData.usuarios_asignados, // Pasamos los IDs de los usuarios
            fecha: tareaData.fecha_limite,
            estado: tareaData.estado
        });

        contenedorTareas.appendChild(tareaComponente);
    });

    return contenedorTareas;
}

// Crear y agregar todas las tareas al contenedor
const seccionTareas = agregarTareasAlContenedor(tareas);
console.log(seccionTareas);

export { seccionTareas };
