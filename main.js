import { headerComponent } from "./componentes/header/header.js";
import { seccionTareas } from "./componentes/componente/itemTarea/itemTarea.js";

let DOM = document.querySelector('#root');
DOM.appendChild(headerComponent);
DOM.appendChild(seccionTareas);

export { DOM };
