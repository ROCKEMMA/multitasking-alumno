import { tareas } from "../../../data/dbTareas.js";
import { usuarios } from "../../../data/dbUsuarios.js";

function tarea({ nombre, personas, fecha, estado, id }) {
    let itemTarea = document.createElement('div');
    itemTarea.className = "itemTarea";
    
    let nombreTarea = document.createElement('h3');
    nombreTarea.textContent = nombre;
    itemTarea.appendChild(nombreTarea);
    
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

    actualizarClaseEstado(estadoTarea, estado);

    estadoTarea.addEventListener('click', () => {
        estado = cambiarEstado(estado);
        estadoTarea.textContent = `Estado: ${estado}`;
        actualizarClaseEstado(estadoTarea, estado);
        actualizarTareaEnLocalStorage(id, estado);
    });

    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'X';
    botonEliminar.className = 'btnEliminar'; 
    
    botonEliminar.addEventListener('click', (e) => {
        itemTarea.remove();  
        eliminarTarea(id);   
    });

    itemTarea.appendChild(botonEliminar);
    
    return itemTarea;
}

function obtenerEmojis(usuariosAsignados) {
    return usuariosAsignados.map(id => {
        const usuario = usuarios.find(e => e.id_usuario === id);
        return usuario ? usuario.emoji : '❓';
    });
}

function agregarTareasAlContenedor(tareas) {
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

function eliminarTarea(id) {
    let tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareasGuardadas = tareasGuardadas.filter(tarea => tarea.id !== id); 
    localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
}

function actualizarTareaEnLocalStorage(id, nuevoEstado) {
    let tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    let tareaIndex = tareasGuardadas.findIndex(tarea => tarea.id === id);
    if (tareaIndex !== -1) {
        tareasGuardadas[tareaIndex].estado = nuevoEstado;
        localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
    }
}

function cambiarEstado(estadoActual) {
    switch (estadoActual) {
        case 'incompleto':
            return 'completo';
        case 'completo':
            return 'en progreso';
        case 'en progreso':
            return 'incompleto';
        default:
            return 'incompleto';
    }
}

function actualizarClaseEstado(elemento, estado) {
    elemento.className = "estado";
    if (estado === 'incompleto') {
        elemento.classList.add('incompleto');
    } else if (estado === 'completo') {
        elemento.classList.add('completado');
    } else if (estado === 'en progreso') {
        elemento.classList.add('Enprogreso');
    }
}

function inicializarSeccionTareas() {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    return agregarTareasAlContenedor(tareasGuardadas);
}

const seccionTareas = inicializarSeccionTareas();
document.body.appendChild(seccionTareas); 

export { seccionTareas };
export { agregarTareasAlContenedor };
