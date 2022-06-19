const comentarios = [];
const contenedorInput = document.createElement("div")
const input = document.createElement("input")
input.classList.add('input')

const contenedorPrincipal = document.querySelector('#contenedor-principal');
contenedorPrincipal.appendChild(contenedorInput)
contenedorInput.appendChild(input)

input.addEventListener('keydown', (e) => {
    validarYAgregarNodo(e, null);
});

function validarYAgregarNodo(e, actual){
    if(e.key === 'Enter' && e.target.value !== ''){
        const nuevoComentario = {
            texto: e.target.value,
            megusta_num: 0,
            respuestas: [],
        };

        if(actual === null){
            comentarios.unshift(nuevoComentario);
        }else{
            actual.respuestas.unshift(nuevoComentario);
        }
        e.target.value = '';
        contenedorPrincipal.innerHTML = '';
        contenedorPrincipal.appendChild(contenedorInput);

        sistemaAgregaComentarios(comentarios, contenedorPrincipal)
    }
}

function sistemaAgregaComentarios(arreglo, nodoPrincipal){
    arreglo.forEach(element => {
        
        const contenedorComentario = document.createElement('div');
        contenedorComentario.classList.add('contenedor-comentario')

        const contenedorRespuestas = document.createElement('div')
        contenedorRespuestas.classList.add('contenedor-respuestas')

        const meGusta = document.createElement('button')
        const responder = document.createElement('button')

        responder.textContent = 'Responder';
        meGusta.textContent = ` ${element.megusta_num > 0 ?  `${element.megusta_num} me gusta`: 'Me gusta'}`

        responder.addEventListener('click', e => {
            const nuevoInput = contenedorInput.cloneNode(true);
            nuevoInput.value = '';
            nuevoInput.focus();
            nuevoInput.addEventListener('keydown', e=> {
                validarYAgregarNodo(e, element);
            }); 
            contenedorComentario.insertBefore(nuevoInput, contenedorRespuestas);
        });
        meGusta.addEventListener('click', e =>{
            element.megusta_num++;
            meGusta.textContent = ` ${
                element.megusta_num > 0 ?  
                `${element.megusta_num} me gusta`: 'Me gusta'}`
        });

        const contenidoTexto = document.createElement('div');
        contenidoTexto.textContent = element.texto;
        const contenidoAcciones = document.createElement('div');

        contenedorComentario.appendChild(contenidoTexto);
        contenedorComentario.appendChild(contenidoAcciones);
        contenedorComentario.appendChild(contenedorRespuestas);
        contenidoAcciones.appendChild(responder);
        contenidoAcciones.appendChild(meGusta);
        
        if(element.respuestas.length > 0){
            sistemaAgregaComentarios(element.respuestas, contenedorRespuestas); 
        }
        nodoPrincipal.appendChild(contenedorComentario)
    });
} 