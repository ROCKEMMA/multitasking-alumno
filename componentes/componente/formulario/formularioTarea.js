import { icon1 } from "../../header/header.js";
import { DOM } from "../../../main.js";
import { usuarios } from "../../../data/dbUsuarios.js";
import { tareas } from "../../../data/dbTareas.js";
import { agregarTareasAlContenedor } from "../itemTarea/itemTarea.js";

// Función para crear el formulario de tarea
function crearFormulario() {
    let formulario = document.createElement('div');
    formulario.className = 'formulario';

    let tituloFormulario = document.createElement('h3');
    tituloFormulario.className = 'formularioTitle';
    tituloFormulario.textContent = 'Formulario Tarea';

    let IngreseTarea = document.createElement('h5');
    IngreseTarea.className = 'titleTarea';
    IngreseTarea.textContent = 'Ingresa la nueva tarea';

    let entrada_tarea = document.createElement('input');
    entrada_tarea.className = 'nombreTarea';
    entrada_tarea.placeholder = 'Nombre de la tarea';

    let calendario = document.createElement('input');
    calendario.type = 'date';
    calendario.className = 'fechaF';

    let ventanaTarea = document.createElement('button');
    ventanaTarea.className = 'btn_estado';
    ventanaTarea.textContent = 'Cambiar Estado';

    let ventanaNombres = document.createElement('button');
    ventanaNombres.className = 'btn_nombres';
    ventanaNombres.textContent = 'Seleccionar Nombre';

    let botonAceptar = document.createElement('button');
    botonAceptar.textContent = 'Aceptar';
    botonAceptar.className = 'btn_aceptar';

    formulario.appendChild(tituloFormulario);
    formulario.appendChild(IngreseTarea);
    formulario.appendChild(entrada_tarea);
    formulario.appendChild(calendario);
    formulario.appendChild(ventanaTarea);
    formulario.appendChild(ventanaNombres);
    formulario.appendChild(botonAceptar);

    return { formulario, ventanaTarea, ventanaNombres, entrada_tarea, calendario, botonAceptar };
}

// Función para manejar la ventana de selección de nombres
function manejarNombres(formulario, ventanaNombres) {
    let nombresSeleccionados = [];

    ventanaNombres.addEventListener('click', () => {
        // Verifica si la ventana ya existe
        if (document.querySelector('.paginaNombres')) return;

        let ventanaSeleccionNombres = document.createElement('div');
        ventanaSeleccionNombres.className = 'paginaNombres';

        let btnNombre1 = crearBotonNombre(usuarios[0].nombre);
        let btnNombre2 = crearBotonNombre(usuarios[1].nombre);
        let btnNombre3 = crearBotonNombre(usuarios[2].nombre); // Asegúrate de que este índice sea correcto
        let btnAceptarNombre = document.createElement('button');
        btnAceptarNombre.textContent = 'Aceptar';
        btnAceptarNombre.className = 'btn_aceptar';

        btnAceptarNombre.addEventListener('click', () => {
            // Verificamos si se han seleccionado exactamente dos nombres
            if (nombresSeleccionados.length === 2) {
                console.log(`Nombres seleccionados: ${nombresSeleccionados}`);
            } else {
                console.log('Debes seleccionar exactamente dos nombres.');
            }
            // Eliminamos la ventana
            formulario.removeChild(ventanaSeleccionNombres);
        });

        ventanaSeleccionNombres.appendChild(btnNombre1);
        ventanaSeleccionNombres.appendChild(btnNombre2);
        ventanaSeleccionNombres.appendChild(btnNombre3);
        ventanaSeleccionNombres.appendChild(btnAceptarNombre);
        formulario.appendChild(ventanaSeleccionNombres);

        function crearBotonNombre(nombre) {
            let boton = document.createElement('button');
            boton.textContent = nombre;

            boton.addEventListener('click', () => {
                if (nombresSeleccionados.includes(nombre)) {
                    // Si el nombre ya está seleccionado, lo deselecciona
                    nombresSeleccionados = nombresSeleccionados.filter(n => n !== nombre);
                    boton.classList.remove('seleccionado');
                } else if (nombresSeleccionados.length < 2) {
                    // Solo permite seleccionar hasta 2 nombres
                    nombresSeleccionados.push(nombre);
                    boton.classList.add('seleccionado');
                }
            });

            return boton;
        }
    });
}

// Función para manejar los estados de la tarea
function manejarEstados(formulario, ventanaTarea) {
    let estadoSeleccionado = ''; 
    ventanaTarea.addEventListener('click', () => {
        // Verifica si la ventana de selección de estado ya existe
        if (document.querySelector('.paginaEstados')) return;

        let ventanaEstados = document.createElement('div');
        ventanaEstados.className = 'paginaEstados';

        let btnAsignado = crearBotonEstado('Asignado');
        let btnSinAsignar = crearBotonEstado('Sin asignar');
        let btnAceptar = document.createElement('button');
        btnAceptar.textContent = 'Aceptar';
        btnAceptar.className = 'btn_aceptar';

        btnAceptar.addEventListener('click', () => {
            if (estadoSeleccionado) {
                console.log(`Estado final: ${estadoSeleccionado}`);
            } else {
                console.log('No se ha seleccionado ningún estado.');
            }
            formulario.removeChild(ventanaEstados);  
        });

        ventanaEstados.appendChild(btnAsignado);
        ventanaEstados.appendChild(btnSinAsignar);
        ventanaEstados.appendChild(btnAceptar);
        formulario.appendChild(ventanaEstados);

        function crearBotonEstado(estado) {
            let boton = document.createElement('button');
            boton.textContent = estado;

            boton.addEventListener('click', () => {
                estadoSeleccionado = estado; 
                console.log(`Estado seleccionado: ${estadoSeleccionado}`);
            });

            return boton;
        }
    });
}

// Función principal para inicializar el formulario
function inicializarFormulario() {
    icon1.addEventListener('click', () => {
        let background = document.createElement('div');
        background.className = "background";

        background.addEventListener('click', (e) => {
            if (e.target === background) {
                DOM.removeChild(background);
            }
        });

        let { formulario, ventanaTarea, ventanaNombres, entrada_tarea, calendario, botonAceptar } = crearFormulario();

        manejarNombres(formulario, ventanaNombres);
        manejarEstados(formulario, ventanaTarea);

        background.appendChild(formulario);
        DOM.appendChild(background);

        // Al hacer clic en aceptar, guardamos la tarea en localStorage
        botonAceptar.addEventListener('click', () => {
            const nuevaTarea = {
                nombre: entrada_tarea.value,
                usuarios_asignados: obtenerUsuariosSeleccionados(),
                fecha_limite: calendario.value,
                estado: obtenerEstadoSeleccionado(), 
                id: Date.now()
            };

            guardarTareaEnLocalStorage(nuevaTarea);

            mostrarNuevaTarea(nuevaTarea);

            DOM.removeChild(background);
        });
    });
}

// Función para guardar la tarea en localStorage
function guardarTareaEnLocalStorage(tarea) {
    let tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareasGuardadas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
}

// Función para mostrar la nueva tarea en la sección de tareas
function mostrarNuevaTarea(tarea) {
    let seccionTareas = document.querySelector('.contenedorTareas');
    if (!seccionTareas) {
        console.error('Contenedor de tareas no encontrado');
        return;
    }

    // Usar la función que ya tienes para crear la tarea en el DOM
    const nuevaTareaElemento = agregarTareasAlContenedor([tarea]);
    seccionTareas.appendChild(nuevaTareaElemento);
}

// Función para obtener los usuarios seleccionados
function obtenerUsuariosSeleccionados() {
    return [1, 2];
}

// Función para obtener el estado seleccionado
function obtenerEstadoSeleccionado() {
    let estado = document.querySelector('.btn_estado').textContent;
    return estado || 'Sin asignar';
}

inicializarFormulario();
