import { icon1 } from "../../header/header.js";
import { DOM } from "../../../main.js";

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

    let calendario = document.createElement('input');
    calendario.type = 'date';
    calendario.className='fechaF'

    let ventanaTarea = document.createElement('button');
    ventanaTarea.className = 'btn_estado';
    ventanaTarea.textContent = 'Cambiar Estado';

    let ventanaNombres = document.createElement('button');
    ventanaNombres.className = 'btn_nombres';
    ventanaNombres.textContent = 'Seleccionar Nombre';

    formulario.appendChild(tituloFormulario);
    formulario.appendChild(IngreseTarea);
    formulario.appendChild(entrada_tarea);
    formulario.appendChild(calendario);
    formulario.appendChild(ventanaTarea);
    formulario.appendChild(ventanaNombres);

    // Devuelve el formulario, ventanaTarea y ventanaNombres
    return { formulario, ventanaTarea, ventanaNombres };
}

// Función para manejar los estados de la tarea
function manejarEstados(formulario, ventanaTarea) {
    let estadoSeleccionado = '';

    ventanaTarea.addEventListener('click', () => {
        // Verifica si la ventana ya existe
        if (document.querySelector('.paginaEstados')) return;

        let ventanaEstados = document.createElement('div');
        ventanaEstados.className = 'paginaEstados';

        let btnCompletado = crearBotonEstado('Completado');
        let btnIncompleto = crearBotonEstado('Incompleto');
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

        ventanaEstados.appendChild(btnCompletado);
        ventanaEstados.appendChild(btnIncompleto);
        ventanaEstados.appendChild(btnAceptar);
        formulario.appendChild(ventanaEstados);

        function crearBotonEstado(estado) {
            let boton = document.createElement('button');
            boton.textContent = estado;
            boton.className = `btn_${estado.toLowerCase()}`;

            boton.addEventListener('click', () => {
                estadoSeleccionado = estado;
            });

            return boton;
        }
    });
}

// Función para manejar la ventana de selección de nombres
function manejarNombres(formulario, ventanaNombres) {
    let nombreSeleccionado = '';

    ventanaNombres.addEventListener('click', () => {
        // Verifica si la ventana ya existe
        if (document.querySelector('.paginaNombres')) return;

        let ventanaSeleccionNombres = document.createElement('div');
        ventanaSeleccionNombres.className = 'paginaNombres';

        let btnNombre1 = crearBotonNombre('Nombre 1');
        let btnNombre2 = crearBotonNombre('Nombre 2');
        let btnNombre3 = crearBotonNombre('Nombre 3');
        let btnAceptarNombre = document.createElement('button');
        btnAceptarNombre.textContent = 'Aceptar';
        btnAceptarNombre.className = 'btn_aceptar';

        btnAceptarNombre.addEventListener('click', () => {
            if (nombreSeleccionado) {
                console.log(`Nombre seleccionado: ${nombreSeleccionado}`);
            } else {
                console.log('No se ha seleccionado ningún nombre.');
            }
            formulario.removeChild(ventanaSeleccionNombres);  // Elimina la ventana
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
                nombreSeleccionado = nombre;
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

        let { formulario, ventanaTarea, ventanaNombres } = crearFormulario();

        manejarEstados(formulario, ventanaTarea);
        manejarNombres(formulario, ventanaNombres);

        background.appendChild(formulario);
        DOM.appendChild(background);
    });
}

inicializarFormulario();
