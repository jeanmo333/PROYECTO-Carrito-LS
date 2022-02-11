
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];


cargarEventListeners();

function cargarEventListeners() {

    //cuando agregas un curso presionnando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);


    //eliminar curso al carrito
    carrito.addEventListener('click', eliminarCurso);


    //mostrar los curso en local storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHtml();
    })





    //vaciar el carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHtml();
    })

};

//agregar curso
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

    alert('curso agregado correctamente al carrito');

};

//eliminar curso
function eliminarCurso(e) {

    if (e.target.classList.contains('borrar-curso')) {
        cursoId = e.target.getAttribute('data-id');

        //eliminar el articulos carrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHtml();
    }
}



function leerDatosCurso(curso) {
    // console.log(curso);

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    //revisa si el elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
        //actualizamos

        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            }
            else {
                return curso;
            }
        });

        articulosCarrito = [...cursos]
    }
    else {
        //agrega elemento al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    //console.log(articulosCarrito);

    carritoHtml();

};


//muestra el carito de compra en el html

function carritoHtml() {
    //limpiar el html
    limpiarHtml();

    //recore el carrito y genera el html    
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
         
        <td>
       <img src='${imagen}' width = '100'>
        </td>

        <td>${titulo}</td>

        <td>${precio}</td>

        <td>${cantidad}</td>

        <td>
        <a href='#' class='borrar-curso' data-id ='${id}'> x </a>
        </td>

        `;

        //agregando cada curso selectionado en el tbody

        contenedorCarrito.appendChild(row);
    });

    //agregar el carito al local storage
    sincronizarLocalStorage();
}


function sincronizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}






function limpiarHtml() {
    //forma lenta 
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}