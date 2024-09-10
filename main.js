import { header } from "./componentes/header/header.js";
let DOM=document.querySelector('#root')
DOM.innerHTML=`
 <div id="main">
    <header id="header">${header}</header>
    <main></main>
    <footer></footer>
 </div>
`;

console.log('hola mundo');
