//slide
var swiper = new Swiper(".mySwiper-1",{
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination:{
        el: ".swiper-pagination",
        clicKable:true,
    },
    navigation:{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});
var swiper = new Swiper(".mySwiper-2",{
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation:{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    breakpoints: {
        0:{
            slidesPerView:1
        },
        520:{
            slidesPerView:2
        },
        950:{
            slidesPerView:3
        }
    }
});

//carrito
const carrito=document.getElementById('carrito');
const elemetos1=document.getElementById('lista-1');
const elemetos2=document.getElementById('lista-2');
const elemetos3=document.getElementById('lista-3');
const elemetos4=document.getElementById('lista-4');
const elemetos5=document.getElementById('lista-5');
const elemetos6=document.getElementById('lista-6');
const elemetos7=document.getElementById('lista-7');
const elemetos8=document.getElementById('lista-8');
const elemetos9=document.getElementById('lista-9');
const elemetos10=document.getElementById('lista-10');
const elemetos11=document.getElementById('lista-11');
const elemetos12=document.getElementById('lista-12');
const elemetos13=document.getElementById('lista-13');
const elemetos14=document.getElementById('lista-14');
const lista=document.querySelector('#carrito .lista');
const vaciarCarritoBtn=document.getElementById('vaciar-carrito');
let articulosCarrito=[];
const valortotal=document.querySelector('.totalpagar');
const countProducts=document.querySelector('#CartCount');

cargarEventListeners();
function cargarEventListeners(){
    elemetos1.addEventListener('click', comprarElemento);
    elemetos2.addEventListener('click', comprarElemento);
    elemetos3.addEventListener('click', comprarElemento);
    elemetos4.addEventListener('click', comprarElemento);
    elemetos5.addEventListener('click', comprarElemento);
    elemetos6.addEventListener('click', comprarElemento);
    elemetos7.addEventListener('click', comprarElemento);
    elemetos8.addEventListener('click', comprarElemento);
    elemetos9.addEventListener('click', comprarElemento);
    elemetos10.addEventListener('click', comprarElemento);
    elemetos11.addEventListener('click', comprarElemento);
    elemetos12.addEventListener('click', comprarElemento);
    elemetos13.addEventListener('click', comprarElemento);
    elemetos14.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click',e=>{
        articulosCarrito=[];
        vaciarCarrito()
        valortotal.textContent='$0';
        countProducts.textContent=0;
    });
}

function comprarElemento(e){
    
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerElemento(elemento);
    }
}

function eliminarElemento(e){
    if(e.target.classList.contains('borrar')){
        const elementID=e.target.getAttribute('data-id');
        articulosCarrito=articulosCarrito.filter(element=>element.id !== elementID)
        insertarCarrito()
    }
}

function leerElemento(element){
    const infoElemento={
        imagen:element.querySelector('img').src,
        titulo:element.querySelector('h3').textContent,
        precio:element.querySelector('.precio').textContent,
        id:element.querySelector('button').getAttribute('data-id'),
        cantidad : 1
    }
    const exist=articulosCarrito.some(element=>element.id===infoElemento.id)
    if(exist){
        const elements=articulosCarrito.map(element=>{
            if(element.id===infoElemento.id){
                element.cantidad++;
                return element;
            }else{
                return element;
            }
        });
        [...articulosCarrito,infoElemento]
    }else{
        articulosCarrito=[...articulosCarrito,infoElemento]
    }
    insertarCarrito();
}

function insertarCarrito(element){
    vaciarCarrito()
    let total=0;
    let totalProduct=0;
    articulosCarrito.forEach(element=>{
        const fila=document.createElement('div');
        fila.innerHTML=`
            <img src="${element.imagen}"></img>
            <p>${element.titulo}</p>
            <p>${element.precio}</p>
            <p>${element.cantidad}</p>
            <p><span class="borrar" data-id="${element.id}">X</span></p>
        `;
        lista.appendChild(fila)
        total=total+parseInt(element.cantidad*element.precio.slice(1))
        totalProduct=totalProduct+element.cantidad
    });
    const formateado=total.toLocaleString("es");
    valortotal.innerText=`$${total,formateado}`
    countProducts.innerText=totalProduct
}

function vaciarCarrito(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
}
