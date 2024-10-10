import { tareas } from "../../../data/dbTareas.js";
import { usuarios } from "../../../data/dbUsuarios.js";

// Función para crear un componente de tarea
function tarea({ nombre, personas, fecha, estado, id }) {
    let itemTarea = document.createElement('div');
    itemTarea.className = "itemTarea";
    
    let nombreTarea = document.createElement('h3');
    nombreTarea.textContent = nombre;
    itemTarea.appendChild(nombreTarea);
    
    // Convertir personas a emojis y mostrarlos
    let usuariosTarea = document.createElement('p');
    usuariosTarea.className = "Usuario";
    usuariosTarea.textContent = `Usuarios asignados: ${obtenerEmojis(personas).join(' ')}`; 
    itemTarea.appendChild(usuariosTarea);
    
    let fechaTarea = document.createElement('p');
    fechaTarea.className = "fecha";
    fechaTarea.textContent = `Fecha de entrega: ${fecha}`;
    itemTarea.appendChild(fechaTarea);
    
    let estadoTarea = document.createElement('p');
    estadoTarea.className = "estado";
    estadoTarea.textContent = `Estado: ${estado}`;
    itemTarea.appendChild(estadoTarea);

    // Agregar clase según el estado
    if (estado === 'incompleto') {
        estadoTarea.classList.add('incompleto');
    } else if (estado === 'completo') {
        estadoTarea.classList.add('completado');
    } else if (estado === 'en progreso') {
        estadoTarea.classList.add('Enprogreso');
    }

    // Crear botón para eliminar la tarea
    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'X';
    botonEliminar.className = 'btnEliminar'; 
    
    // Lógica para eliminar la tarea del DOM
    botonEliminar.addEventListener('click', (e) => {
        itemTarea.remove();  
        eliminarTarea(id);   
    });

    itemTarea.appendChild(botonEliminar);
    
    return itemTarea;
}

// Función para obtener emojis de usuarios asignados
function obtenerEmojis(usuariosAsignados) {
    return usuariosAsignados.map(id => {
        const usuario = usuarios.find(e => e.id_usuario === id);
        return usuario ? usuario.emoji : '❓';
    });
}

// Función para agregar tareas al contenedor
function agregarTareasAlContenedor(tareas, onDelete) {
    let contenedorTareas = document.createElement('section');
    contenedorTareas.className = "contenedorTareas";

    tareas.forEach(tareaData => {
        const tareaComponente = tarea({
            nombre: tareaData.nombre,
            personas: tareaData.usuarios_asignados, 
            fecha: tareaData.fecha_limite,
            estado: tareaData.estado,
            id: tareaData.id  
        });

        contenedorTareas.appendChild(tareaComponente);
        
    });

    return contenedorTareas;
}

// Función para eliminar tarea del localStorage
function eliminarTarea(id) {
    let tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareasGuardadas = tareasGuardadas.filter(tarea => tarea.id !== id); 
    localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
}

// Inicializar sección de tareas
const seccionTareas = agregarTareasAlContenedor(tareas);
document.body.appendChild(seccionTareas); 

// Exportar el componente de tareas
export { seccionTareas };
export { agregarTareasAlContenedor };
