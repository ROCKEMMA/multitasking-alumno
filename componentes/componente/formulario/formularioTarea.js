import { icon1 } from "../../header/header.js";
import { DOM } from "../../../main.js";

icon1.addEventListener('click', ()=>{
    let background=document.createElement('div')
    background.className="background"
     
    let formulario=document.createElement('div')
    formulario.className='formulario'
 
    let tituloFormulario=document.createElement('h3')
    tituloFormulario.className='formularioTitle'
    tituloFormulario.textContent='Formulario Tarea'

    formulario.appendChild(tituloFormulario)
    background.appendChild(formulario)
    DOM.appendChild(background)
    
})