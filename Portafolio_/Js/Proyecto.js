
const productoDOM = document.querySelector(".productos__center")
const carritoDOM = document.querySelector(".carrito")
const carritoCenter = document.querySelector(".carrito__center")
const openCarrito = document.querySelector(".carrito__icon")
const closeCarrito = document.querySelector(".close__carrito")
const overlay = document.querySelector(".carrito__overlay")
const carritoTotal = document.querySelector(".carrito__total")
const clearCarritoBtn = document.querySelector(".clear__carrito")
const itemTotales = document.querySelector(".item__total")
const detalles = document.getElementById(".detalles")

let carrito = [];
let buttonDOM = [];

class UI{
    detallesProducto(id){
        const filtroDato = productos.filter(item => item.id == id)
        let result = ""
        filtroDato.forEach(producto =>{
            result +=
            `
            <article class="detalle-grid">
            <img src=${producto.image} alt="${producto.title}" class="img-fluid">  
              <div class="detalle-content">
                  <h3>${producto.title}</h3>
                  <div class="rating">
                      <span>
                          <div class="i bx bxs-star"></div>
                        </span>
                        <span>
                          <div class="i bx bxs-star"></div>
                        </span>  
                        <span>
                          <div class="i bx bxs-star"></div>
                        </span>  
                        <span>
                          <div class="i bx bxs-star"></div>
                        </span>  
                        <span>
                          <div class="i bx bxs-star"></div>
                        </span>
                      </div>
                        <p class="price"><b>precio: </b>$${producto.price}</p>
                        <p class="description">
                        <b>Descripcion: </b> <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Amet omnis minus dolores quidem. Similique quae ex quia a quaerat debitis, 
                      saepe explicabo odio dolore maiores accusamus et natus id minus!
                  </span>
              </p>
              <p class="description">
                  <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                  Atque debitis doloremque tenetur nisi dolorum laudantium et alias nemo placeat expedita, dicta facilis. 
                  Sed dolorum quisquam voluptatum voluptas asperiores iure autem? Voluptatem laudantium dignissimos odio.
              </span>
              </p>
              <div class="botton">
                  <div class="btn__group">
                      < class="btn addToCard"  data-id = ${producto.id}>Añadir al carrito</a>
                  </div>
              </div>
              </div>
          </article>
            `
        });
        detalles.innerHTML = result;
    }
    renderProductos(productos){
        let result = ""
        productos.forEach((producto) => {
            result += `
            <div class="productos__center">
            <div class="producto">
            <div class="image__container">
            <img src=${producto.image} alt=""> 
          </div>
                <div class="producto__footer">
                    <h1>${producto.title}</h1>
                    <div class="rating">
                      <span>
                        <div class="i bx bxs-star"></div>
                      </span>
                      <span>
                        <div class="i bx bxs-star"></div>
                      </span>  
                      <span>
                        <div class="i bx bxs-star"></div>
                      </span>  
                      <span>
                        <div class="i bx bxs-star"></div>
                      </span>  
                      <span>
                        <div class="i bx bxs-star"></div>
                      </span>    
                    </div>
                    <div class="price">$${producto.price}</div>
                </div>
                <div class="botton"></div>
                <div class="btn__group">
                    <button class="btn addTocart" data-id=${producto.id}>añadir carrito</a>
                    <a href="/html/Productos-De.html? id=${producto.id}" class="btn view">vista </a>
                </div>
            </div>
        </div>
            `
        });
        productoDOM.innerHTML = result
    }
    getButtons(){
        const buttons = [...document.querySelectorAll(".addTocart")];
        buttonDOM = buttons;
        buttons.forEach(button =>{
        const id = button.dataset.id;
        const inCart = carrito.find(item => item.id === parseInt(id,10));
        if(inCart){
            button.innerHTML = "En el carrito"
            button.disable = true
        }
        button.addEventListener("click", e=>{
            e.preventDefault();
            e.target.innerHTML = "En el carrito"
            e.target.disable = true

            //GET productos al carrito 
            const carritoItem = {...Storage.getProductos(id), cantidad: 1}

            //agregar el producto al carrito

            carrito = [...carrito,carritoItem]

            //Guardar el carrito al localStorage
            Storage.saveCart(carrito)

            //SET cart values

            this.setItemValues(carrito)
            this.addCarritoItem(carritoItem)
            //show al carrito
        })
        })
    }
    setItemValues(carrito){
        let TempTotal = 0;
        let itemTotal = 0;
        carrito.map(item =>{
            TempTotal += item.price * item.cantidad;
            itemTotal += item.cantidad;
        });
        carritoTotal.innerHTML = parseFloat(TempTotal.toFixed(2));
        itemTotales.innerText = itemTotal
    }
    addCarritoItem(image, price, title, id){
        const div = document.createElement("div")
        div.classList.add("carrito__item")
        div.innerHTML = 
        `
        <img src=${image} alt=${title}>
        <div>
         <h3>${title}</h3>
         <p class="price">$${price}</p>
        </div>
        <div>
         <span class= "increase" data-id = ${id}>
             <i class="bx bxs-up-arrow"></i>
         </span>
         <p class = "item__cantidad">1</p>
         <span class = "decrease" data-id =${id} >
             <i class="bx bxs-down-arrow"></i>
         </span>
        </div>
        <div>
         <span class="remove__item" data-id =${id}>
             <i class="bx bx-trash"></i>
         </span>
        </div>
        `
        carritoCenter.appendChild(div)
    }
    show(){
        carritoDOM.classList.add("show")
        overlay.classList.remove("show")
    }
    hide(){
        carritoDOM.classList.remove("show")
        overlay.classList.remove("show")
    }
    setApp(){
        carrito = Storage.getCart()
        this.setItemValues(carrito)
        this.populate(carrito)
        openCarrito.addEventListener("click", this.show)
        closeCarrito.addEventListener("click", this.hide)
    }
    populate(carrito){
        carrito.forEach(item=>this.addCarritoItem(item))
    }
    cartLogic(){
        clearCarritoBtn.addEventListener("click", ()=>{
            this.clearCarrito()
            this.hide()
        });
        carritoCenter.addEventListener("click", e=>{
            const target = e.target.closest("span")
            const targetElement = target.classList.contains("remove__item");
            if(!target) return
            if(targetElement){
                const id = parseInt(target.dataset.id);
                this.removeItem(id)
                carritoCenter.removeChild(target.parentElement.parentElement)
            }else if(target.classList.contains("increase")){
                const id = parseInt(target.dataset.id,10);
                let TempItem = carrito.find(item => item.id === id);
                TempItem.cantidad++;
                Storage.saveCart(carrito)
                this.setItemValues(carrito)
                target.nextEklementSibling.innerText = TempItem.cantidad
            }else if(target.classList.contains("decrease")){
                const id = parseInt(target.dataset.id,10);
                let TempItem = carrito.find(item => item.id === id);
                TempItem.cantidad--;
                if(TempItem.cantidad>0){
                    Storage.saveCart(carrito)
                    this.setItemValues(carrito)
                    target.previousElementSibling.innerText = TempItem.cantidad;
                }else{
                    this.removeItem(id);
                    carritoCenter.removeChild(target.parentElement.parentElement)
                }
            }
        });
    }
    clearCarrito(){
        const cartItems = carrito.map(item =>item.id)
        cartItems.forEach(id => this.removeItem(id))
        while(carritoCenter.children.length > 0){
            carritoCenter.removeChild(carritoCenter.children[0])
        }
    }
    removeItem(id){
        carrito = carrito.filter(item => item.id !== id);
        this.setItemValues(carrito)
        Storage.saveCart(carrito)
        let botton =this.singleButton(id);
        if(button){
            button.disable = false;
            button.innerText = "añadir al carrito"
        }
    }
    singleButton(id){
        return buttonDOM.find(button => parseInt(button.dataset.id)===id)
    }
}

class Storage{
    static saveProduct(obj){
        localStorage.setItem("productos", JSON.stringify(obj))
    }
    static saveCart(carrito){
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    static getProductos(id){
        const producto = JSON.parse(localStorage.getItem("productos"))
        return producto.find(product => product.id === parseFloat(id,10))
    }
    static getCart(){
        return localStorage.getItem("carrito")? JSON.parse(localStorage.getItem("carrito")) : [];
    }
}

class Productos{
    async getProductos(){
        try{
            const result = await fetch("/Json/productos.json")
            const data = await result.json()
            const productos = data.items
            return productos
        }catch(err){
            console.log(err)
        }
    }
}

let caetgory = "";
let productos = [];
function categoryValue(){
    const ui = new UI();
    caetgory = document.getElementById("category").value
    if(category.length > 0){
        const producto = productos.filter(regx => regx.caetgory ===caetgory)
        ui.renderProductos(producto)
    }else{
        ui.renderProductos(productos)
    }   
}
const query = new URLSearchParams(window.location.search)
let id = query.get('id')

document.addEventListener("DOMContentLoaded", async()=>{
    const productosLista = new Productos();
    const ui = new UI();
    ui.setApp()
    productos = await productosLista.getProductos()
    if(id){
    ui.detallesProducto(id)
    Storage.saveProduct(productos)
    ui.getButtons();
    ui.cartLogic();
    }else{
    ui.renderProductos(productos)
    Storage.saveProduct(productos)
    ui.getButtons();
    ui.cartLogic();
    }
})