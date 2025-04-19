const subtotal = () => carrito.reduce((acc, el) => acc + el.precioFinal, 0);
let total = subtotal;

let temp = null;
fetch(`https://api.openweathermap.org/data/2.5/weather?id=3435910&appid=9aa0d7d7ace195e870036d608160609b`)
  .then(respuesta => respuesta.json())
  .then(data => {
    if (data && data.main && typeof data.main.temp === 'number') {
      temp = Math.round(data.main.temp - 273.15);
    } else {
      console.warn("No se pudo obtener la temperatura");
    }
  })
  .catch(err => console.error("Error al obtener datos del clima:", err));

const basePorcentaje = (n) => {
    return (m) => (m * n) / 100
}


const porcentaje10 = basePorcentaje(10);
const porcentaje25 = basePorcentaje(25);
const porcentaje35 = basePorcentaje(35);


// CARGAR PÁGINA / RECARGAR STORAGE
const guardarStorage = (clave, valor) => {
  try {
    localStorage.setItem(clave, valor);
  } catch (e) {
    console.error(`Error guardando ${clave} en localStorage:`, e);
  }
};

const obtenerStorageSeguro = (clave) => {
    try {
      const item = localStorage.getItem(clave);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error(`Error al parsear ${clave}:`, e);
      return null;
    }
  };


  window.onload = () => {
    let productoCarritoGuardado = localStorage.getItem("productosCarritoStorage");
    let carritoGuardado = localStorage.getItem("carritoStorage");
    let productoGuardadoEnStorage = localStorage.getItem("productosNuevos");
    let usuarioGuardadoEnStorage = localStorage.getItem("usuarioNuevo");
    let usuarioIngresadoStorage = localStorage.getItem("usuarioIngresado");
    let temperaturaEnStorage = localStorage.getItem("temperatura");
    let darkModeStorage = localStorage.getItem("darkMode");

    // PRODUCTO CARRITO GUARDADO
    if (productoCarritoGuardado != null) {
        try {
            productoCarritoGuardado = JSON.parse(productoCarritoGuardado);
            if (Array.isArray(productoCarritoGuardado) || typeof productoCarritoGuardado === "string") {
                carritoProductosElegidos.innerHTML = `${productoCarritoGuardado}`;
                final.push(productoCarritoGuardado);
            }
        } catch (e) {
            console.error("Error al parsear productosCarritoStorage", e);
        }
    }

    // CARRITO GUARDADO
    try {
        carritoGuardado = JSON.parse(carritoGuardado);
    } catch (e) {
        console.error("Error al parsear carritoStorage", e);
        carritoGuardado = undefined;
    }

    if (carritoGuardado !== undefined && Array.isArray(carritoGuardado)) {
        for (let i = 0; i < carritoGuardado.length; i++) {
            for (let e of stock) {
                if (carritoGuardado[i]?.producto === e?.nombre) {
                    if (typeof carritoGuardado[i].cantidades === "number" && typeof e.cantidad === "number") {
                        e.cantidad = e.cantidad - carritoGuardado[i].cantidades;
                        e.stock = (e.cantidad === 0 ? "no" : "si");

                        carrito.push(carritoGuardado[i]);

                        final.push(`
                            <div class="d-flex justify-content-between muestrarioCarrito align-items-center">
                                <img src=${e.imagen} alt="..." class="imagenEnCarrito">
                                <div class="productosEnCarrito">
                                    <h3 class="nombreProductoEnCarrito">${e.nombre}</h3>
                                    <div class="sumadorCarrito">
                                        <button class="botonCarritoIngresado botonMenosCarrito">-</button>
                                        <p>${carrito[i].cantidades}</p>
                                        <button class="botonCarritoIngresado botonMasCarrito">+</button>
                                    </div>
                                    <p>${carrito[i].precioFinal}$</p>
                                </div>
                            </div>`);
                        carritoProductosElegidos.innerHTML = `${final.join("")}`;
                    }
                }
            }
        }

        if (typeof subtotal === "function" && subtotal() != 0) {
            carritoSubtotal.innerHTML = `
                <div class="d-flex justify-content-around subtotalEnCarrito">Subtotal = ${subtotal()}$</div>
                <div class="d-flex justify-content-center divCompletarCompra">
                    <button type="button" class="btn btn-primary boton6" id="botonCompletarCompra">Completar compra</button>
                    <button type="button" class="btn btn-primary boton7" id="botonDescuento">Código de descuento</button>
                </div>
                <button type="button" class="btn btn-primary boton8 botonReset">Eliminar compra</button>`;
        }
    }

    // PRODUCTO GUARDADO EN STORAGE
    if (productoGuardadoEnStorage != undefined) {
        try {
            productoGuardadoEnStorage = JSON.parse(productoGuardadoEnStorage);

            if (
                productoGuardadoEnStorage &&
                productoGuardadoEnStorage["nombre"] &&
                productoGuardadoEnStorage["precio"] &&
                productoGuardadoEnStorage["imagen"]
            ) {
                productoNuevo = new Prendas(
                    productoGuardadoEnStorage["nombre"],
                    productoGuardadoEnStorage["tipo"],
                    productoGuardadoEnStorage["talle"],
                    productoGuardadoEnStorage["categoria"],
                    productoGuardadoEnStorage["precio"],
                    productoGuardadoEnStorage["cantidad"],
                    productoGuardadoEnStorage["imagen"]
                );
                stock.push(productoNuevo);

                tarjetanueva.setAttribute("class", "card col-4");
                tarjetanueva.setAttribute("style", "width: 18rem");
                tarjetanueva.innerHTML = `
                    <img src="${productoGuardadoEnStorage["imagen"]}" class="card-img-top imagenProductos" alt="...">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <p class="card-text ventaProducto">${productoGuardadoEnStorage["nombre"]}</p>
                        <input type="number" class="botonCantidad" value="0">
                        <input type="button" value="Boton" class="boton btn-primary" name="Agregar">
                    </div>`;
                padreTarjeta.appendChild(tarjetanueva);
            }
        } catch (e) {
            console.error("Error al parsear productosNuevos", e);
        }
    }

    // USUARIO GUARDADO EN STORAGE
    if (usuarioGuardadoEnStorage != undefined) {
        try {
            usuarioGuardadoEnStorage = JSON.parse(usuarioGuardadoEnStorage);
            if (
                usuarioGuardadoEnStorage?.nombre &&
                usuarioGuardadoEnStorage?.edad &&
                usuarioGuardadoEnStorage?.mail &&
                usuarioGuardadoEnStorage?.contraseña
            ) {
                usuarios.push({
                    nombre: usuarioGuardadoEnStorage["nombre"],
                    edad: usuarioGuardadoEnStorage["edad"],
                    mail: usuarioGuardadoEnStorage["mail"],
                    contraseña: usuarioGuardadoEnStorage["contraseña"]
                });
            }
        } catch (e) {
            console.error("Error al parsear usuarioNuevo", e);
        }
    }

    // USUARIO INGRESADO
    if (usuarioIngresadoStorage != undefined && usuarioIngresadoStorage === "si") {
        linkCargaProducto.style.display = "block";
        try {
            let saludoDeStorage = JSON.parse(localStorage.getItem("saludo"));
            if (saludoDeStorage && saludo[0]) {
                saludo[0].style.display = "block";
                saludo[0].innerText = `${saludoDeStorage}`;
                if (saludo[0].style.display === "block") {
                    formularioIngreso.innerHTML = `<h3> Ya has ingresado a tu cuenta</h3>`;
                }
            }
        } catch (e) {
            console.error("Error al parsear saludo", e);
        }
    }

    // TEMPERATURA
    if (temperaturaEnStorage != undefined) {
        try {
            temperaturaEnStorage = JSON.parse(temperaturaEnStorage);
            if (temperaturaEnStorage) {
                let ingresoNuevo = document.createElement("div");
                ingresoNuevo.classList.add("corrido");
                ingresoNuevo.innerHTML = temperaturaEnStorage;
                navbar.append(ingresoNuevo);
            }
        } catch (e) {
            console.error("Error al parsear temperatura", e);
        }
    }

    // DARK MODE
    if (darkModeStorage != undefined && darkModeStorage === "si") {
        if (Array.isArray(logo) && logo.length >= 2 && botonCambioPagina && body[0]) {
            for (let i = 0; i < 2; i++) {
                logo[i].src = "./Footage/logo2.png";
            }

            botonCambioPagina.checked = true;
            body[0].classList.add("bodyDark");
        }
    }
};



// AGREGAR A CARRITO
let botonCarrito = document.querySelectorAll(".boton");
let ventaProducto = document.querySelectorAll(".ventaProducto");
let botonCantidad = document.querySelectorAll(".botonCantidad");
let final = [];
const carrito = [];

let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("contraseña");
let linkCargaProducto = document.getElementById("linkCargaProducto");
let imagenProductos = document.getElementsByClassName("imagenProductos");


const botonCompra = (compra, cantidad) => {
    // 🔁 Aseguramos que cantidad sea número (por si viene de un input)
    cantidad = parseInt(cantidad);

    // Verificamos datos
    if (
        compra &&
        typeof compra === "object" &&
        typeof compra.stock === "string" &&
        typeof compra.nombre === "string" &&
        typeof compra.imagen === "string" &&
        !isNaN(compra.precio) &&
        !isNaN(compra.cantidad) &&
        !isNaN(cantidad)
    ) {
        if (cantidad > 0 && compra.stock === "si") {
            if (cantidad <= compra.cantidad) {
                compra.cantidad -= cantidad;
                compra.stock = compra.cantidad > 0 ? "si" : "no";

                let precioParcial = compra.precio * cantidad;
                let buscador = carrito.some((el) => el.producto === compra.nombre);

                if (buscador) {
                    for (let el of carrito) {
                        if (el.producto === compra.nombre) {
                            el.cantidades += cantidad;
                            el.precioFinal += precioParcial;
                        }
                    }
                } else {
                    carrito.push({
                        cantidades: cantidad,
                        producto: compra.nombre,
                        precioFinal: precioParcial,
                        precioIndividual: compra.precio,
                        imagen: compra.imagen,
                    });
                }

                // Mostrar confirmación
                if (typeof Toastify === "function") {
                    Toastify({
                        text: `Agregaste ${cantidad} productos a tu carrito`,
                        className: "info",
                        duration: 1000,
                        style: {
                            background: "#D74E09",
                            borderRadius: "30px",
                        }
                    }).showToast();
                } else {
                    console.warn("Toastify no está disponible");
                }
            } else {
                console.warn("Cantidad solicitada mayor que el stock disponible");
            }
        } else {
            console.warn("Cantidad inválida o producto sin stock");
        }
    } else {
        console.error("Objeto 'compra' malformado o datos inválidos", compra);
    }
};



// Agregar elementos a carrito:
for (let i = 0; i < stock.length; i++) {

    // Validamos que el botón exista antes de agregar el event listener
    if (botonCarrito[i] && typeof botonCarrito[i].addEventListener === "function") {
        botonCarrito[i].addEventListener("click", agregarCarrito);
    } else {
        console.warn(`botonCarrito[${i}] no existe o no es un botón válido`);
        continue;
    }

    function agregarCarrito() {
        // Validaciones defensivas previas
        if (
            stock[i] &&
            typeof stock[i].cantidad === "number" &&
            botonCantidad[i] &&
            !isNaN(parseInt(botonCantidad[i].value))
        ) {
            let cantidadSeleccionada = parseInt(botonCantidad[i].value);

            if (stock[i].cantidad >= 1 && stock[i].cantidad >= cantidadSeleccionada) {
                if (cantidadSeleccionada > 0) {
                    botonCompra(stock[i], cantidadSeleccionada);
                    final.length = 0;

                    for (let el of carrito) {
                        final.push(`
                            <div class="d-flex justify-content-between muestrarioCarrito align-items-center">
                                <img src=${el.imagen} alt="..." class="imagenEnCarrito">
                                <div class="productosEnCarrito">
                                    <h3 class="nombreProductoEnCarrito">${el.producto}</h3>
                                    <div class="sumadorCarrito">
                                        <button class="botonCarritoIngresado botonMenosCarrito">-</button>
                                        <p>${el.cantidades}</p>
                                        <button class="botonCarritoIngresado botonMasCarrito">+</button>
                                    </div>
                                    <p>${el.precioFinal}$</p>
                                </div>
                            </div>
                        `);
                    }

                    if (carritoProductosElegidos) {
                        carritoProductosElegidos.innerHTML = `${final.join("")}`;
                        carritoProductosElegidos.style.overflowY = "scroll";
                    }

                    if (carritoSubtotal && typeof subtotal === "function") {
                        carritoSubtotal.innerHTML = null;
                        carritoSubtotal.innerHTML = `
                            <div class="d-flex justify-content-around subtotalEnCarrito">
                                Subtotal = ${subtotal()}$
                            </div>
                            <div class="d-flex justify-content-center divCompletarCompra">
                                <button type="button" class="btn btn-primary boton6" id="botonCompletarCompra">Completar compra</button>
                                <button type="button" class="btn btn-primary boton7" id="botonDescuento">Código de descuento</button>
                            </div>
                            <button type="button" class="btn btn-primary boton8 botonReset">Eliminar compra</button>
                        `;
                    }

                    if (textoCarritoVacio && textoCarritoVacio[0]) {
                        textoCarritoVacio[0].innerHTML = carrito[0] != undefined && "Mi pedido";
                    }

                    try {
                        let carritoStorage = JSON.stringify(carrito);
                        guardarStorage("carritoStorage", carritoStorage);
                    } catch (e) {
                        console.error("Error guardando en localStorage", e);
                    }

                    if (typeof contadorCarritoIcono === "function") {
                        contadorCarritoIcono();
                    }

                } else {
                    console.warn("Cantidad ingresada debe ser mayor a 0");
                }
            } else {
                // Fuera de stock o no alcanza la cantidad pedida
                if (ventaProducto[i]) {
                    ventaProducto[i].innerHTML = `${ventaProducto[i].innerHTML} <p>Fuera de stock</p> <br> Stock: ${stock[i].cantidad}`;
                }
            }
        } else {
            console.error("Stock o cantidad inválida en índice", i);
        }
    }
}



// CONTADOR
let contadorIcono = document.getElementById("contador");

function contadorCarritoIcono() {
    // Verificamos que carrito exista y sea un array
    if (Array.isArray(carrito)) {
        let contadorCarrito = carrito.length;

        // Validamos que contadorIcono existe antes de usar innerText
        if (contadorIcono) {
            contadorIcono.innerText = `${contadorCarrito}`;
        } else {
            console.warn("Elemento con id 'contador' no encontrado");
        }
    } else {
        console.error("'carrito' no está definido o no es un array");
    }
}



// CARRITO
let iconoCarrito = document.getElementById("iconoCarrito");
let productosEnCarrito = document.getElementById("posBotonCarrito");
let textoCarritoVacio = document.getElementsByClassName("carritoVacio");
let carritoProductosElegidos = document.getElementById("carritoProductosElegidos");
let carritoSubtotal = document.getElementById("carritoSubtotal");
let botonMenosCarrito = document.getElementsByClassName("botonMenosCarrito");
let botonMasCarrito = document.getElementsByClassName("botonMasCarrito");
let nombreProductoEnCarrito = document.getElementsByClassName("nombreProductoEnCarrito");
let cantidadesEnCarrito = document.querySelectorAll(".cantidadesEnCarrito");
let botonDescuento = document.getElementsByClassName("boton7");
let carritoAplicarDescuento = document.getElementById("carritoAplicarDescuento");
let botonVolverDescuento = document.getElementById("botonVolverDescuento");
let codigoDescuento = document.getElementById("codigoDescuento");
let botonAplicarDescuento = document.getElementById("botonAplicarDescuento");
let intervalo;
let iconoCuenta = document.getElementById("iconoCuenta");
let formularioIngreso = document.getElementById("formulario");
let contenedorForm = document.getElementById("contenedorForm");
let botonSubmit = document.getElementsByClassName("boton2");


const descuento = (codigo) => {
    // Normalizamos el código a minúsculas y validamos que sea string
    if (typeof codigo !== "string") {
        console.warn("Código de descuento inválido");
        return;
    }

    codigo = codigo.toLowerCase();

    // Validamos que subtotal exista y sea función
    if (typeof subtotal !== "function") {
        console.error("La función 'subtotal' no está definida");
        return;
    }

    let subtotalActual = subtotal();

    if (isNaN(subtotalActual)) {
        console.error("El subtotal no es un número válido");
        return;
    }

    // Declaramos 'total' localmente si no es global (defensiva contra errores)
    let totalCalculado;

    if (codigo === "hipocampo") {
        if (typeof porcentaje10 === "function") {
            totalCalculado = subtotalActual - porcentaje10(subtotalActual);
        } else {
            console.error("La función 'porcentaje10' no está definida");
            return;
        }
    } else if (codigo === "bolso") {
        if (typeof porcentaje25 === "function") {
            totalCalculado = subtotalActual - porcentaje25(subtotalActual);
        } else {
            console.error("La función 'porcentaje25' no está definida");
            return;
        }
    } else {
        totalCalculado = parseInt(subtotalActual);
    }

    // Usamos una variable global si existe, o devolvemos el valor
    if (typeof total !== "undefined") {
        total = totalCalculado;
    } else {
        console.log("Total calculado:", totalCalculado);
        return totalCalculado;
    }
};



if (iconoCarrito) {
    iconoCarrito.onclick = () => {
        if (!productosEnCarrito || !contenedorForm) {
            console.error("No se encontraron elementos del carrito o del formulario.");
            return;
        }

        if (productosEnCarrito.style.display === "none") {
            productosEnCarrito.style.display = "block";
            contenedorForm.style.display = "none";

            let botonFinalizarCompra = document.getElementsByClassName("boton6");
            if (carrito[0] != undefined && textoCarritoVacio[0] && carritoProductosElegidos) {
                textoCarritoVacio[0].innerHTML = `Mi pedido`;
                carritoProductosElegidos.style.overflowY = "scroll";
            }

            intervalo = setInterval(() => {
                if (typeof subtotal === "function" && subtotal() != 0) {
                    for (let i = 0; i < carrito.length; i++) {
                        if (!botonMasCarrito[i] || !botonMenosCarrito[i] || !nombreProductoEnCarrito[i]) continue;

                        botonMasCarrito[i].onclick = () => {
                            for (let el of carrito) {
                                if (el.producto === nombreProductoEnCarrito[i].innerText) {
                                    el.cantidades += 1;
                                    el.precioFinal = el.precioIndividual * el.cantidades;

                                    let nuevo = (`
                                        <div class="d-flex justify-content-between muestrarioCarrito align-items-center">
                                            <img src=${el.imagen} alt="..." class= "imagenEnCarrito">
                                            <div class="productosEnCarrito">
                                                <h3 class="nombreProductoEnCarrito">${el.producto}</h3>
                                                <div class="sumadorCarrito">
                                                    <button class="botonCarritoIngresado botonMenosCarrito">-</button>
                                                    <p>${el.cantidades}</p>
                                                    <button class="botonCarritoIngresado botonMasCarrito">+</button>
                                                </div>
                                                <p>${el.precioFinal}$</p>
                                            </div>
                                        </div>`);

                                    final.splice(i, 1, nuevo);
                                    if (carritoProductosElegidos) carritoProductosElegidos.innerHTML = `${final.join("")}`;

                                    if (carritoSubtotal) {
                                        carritoSubtotal.innerHTML = null;
                                        carritoSubtotal.innerHTML = `
                                            <div class="d-flex justify-content-around subtotalEnCarrito"> Subtotal = ${subtotal()}$ </div>
                                            <div class="d-flex justify-content-center divCompletarCompra">
                                                <button type="button" class="btn btn-primary boton6" id="botonCompletarCompra">Completar compra</button>
                                                <button type="button" class="btn btn-primary boton7" id="botonDescuento">Código de descuento</button>
                                            </div>
                                            <button type="button" class="btn btn-primary boton8 botonReset">Eliminar compra</button>`;
                                    }

                                    if (textoCarritoVacio[0]) textoCarritoVacio[0].innerHTML = carrito[0] != undefined && `Mi pedido`;

                                    try {
                                        guardarStorage("carritoStorage", JSON.stringify(carrito));
                                    } catch (err) {
                                        console.error("Error guardando en storage", err);
                                    }
                                }
                            }
                        }

                        botonMenosCarrito[i].onclick = () => {
                            for (let el of carrito) {
                                if (el.producto === nombreProductoEnCarrito[i].innerText) {
                                    el.cantidades -= 1;
                                    el.precioFinal -= el.precioIndividual;

                                    if (el.cantidades <= 0) {
                                        final.splice(i, 1);
                                        if (carritoProductosElegidos) carritoProductosElegidos.innerHTML = `${final.join("")}`;
                                        carrito.splice(i, 1);
                                        if (typeof contadorCarritoIcono === "function") contadorCarritoIcono();

                                        if (carrito[0] === undefined) {
                                            if (textoCarritoVacio[0]) textoCarritoVacio[0].innerHTML = `Aún no contas con ningún producto en tu carrito`;
                                            if (carritoSubtotal) carritoSubtotal.innerHTML = null;
                                            localStorage.removeItem("carritoStorage");
                                            localStorage.removeItem("productosCarritoStorage");
                                        } else {
                                            guardarStorage("carritoStorage", JSON.stringify(carrito));
                                            if (carritoSubtotal) {
                                                carritoSubtotal.innerHTML = null;
                                                carritoSubtotal.innerHTML = `
                                                    <div class="d-flex justify-content-around subtotalEnCarrito"> Subtotal = ${subtotal()}$ </div>
                                                    <div class="d-flex justify-content-center divCompletarCompra">
                                                        <button type="button" class="btn btn-primary boton6" id="botonCompletarCompra">Completar compra</button>
                                                        <button type="button" class="btn btn-primary boton7" id="botonDescuento">Código de descuento</button>
                                                    </div>
                                                    <button type="button" class="btn btn-primary boton8 botonReset">Eliminar compra</button>`;
                                            }
                                        }
                                    } else {
                                        let nuevo = (`
                                            <div class="d-flex justify-content-between muestrarioCarrito align-items-center">
                                                <img src=${el.imagen} alt="..." class= "imagenEnCarrito">
                                                <div class="productosEnCarrito">
                                                    <h3 class="nombreProductoEnCarrito">${el.producto}</h3>
                                                    <div class="sumadorCarrito">
                                                        <button class="botonCarritoIngresado botonMenosCarrito">-</button>
                                                        <p>${el.cantidades}</p>
                                                        <button class="botonCarritoIngresado botonMasCarrito">+</button>
                                                    </div>
                                                    <p>${el.precioFinal}$</p>
                                                </div>
                                            </div>`);

                                        final.splice(i, 1, nuevo);
                                        if (carritoProductosElegidos) carritoProductosElegidos.innerHTML = `${final.join("")}`;
                                        if (carritoSubtotal) {
                                            carritoSubtotal.innerHTML = null;
                                            carritoSubtotal.innerHTML = `
                                                <div class="d-flex justify-content-around subtotalEnCarrito"> Subtotal = ${subtotal()}$ </div>
                                                <div class="d-flex justify-content-center divCompletarCompra">
                                                    <button type="button" class="btn btn-primary boton6" id="botonCompletarCompra">Completar compra</button>
                                                    <button type="button" class="btn btn-primary boton7" id="botonDescuento">Código de descuento</button>
                                                </div>
                                                <button type="button" class="btn btn-primary boton8 botonReset">Eliminar compra</button>`;
                                        }

                                        if (textoCarritoVacio[0]) textoCarritoVacio[0].innerHTML = `Mi pedido`;
                                        guardarStorage("carritoStorage", JSON.stringify(carrito));
                                    }
                                }
                            }
                        }
                    }

                    if (subtotal() !== 0 && botonFinalizarCompra[0]) {
                        botonFinalizarCompra[0].onclick = () => {
                            Swal.fire({
                                title: '¡PRONTO PODRÁS COMPLETAR EL PROCESO!',
                                width: 600,
                                padding: '3em',
                                confirmButtonColor: '#D74E09',
                                color: '#FFFFFF',
                                background: '#D74E09',
                                backdrop: `rgba(0,0,123,0.1) left top no-repeat`
                            });
                        }
                    }

                    if (botonDescuento[0]) {
                        botonDescuento[0].onclick = () => {
                            if (!carritoAplicarDescuento) return;

                            carritoProductosElegidos.style.display = "none";
                            carritoSubtotal.style.display = "none";
                            carritoAplicarDescuento.style.display = "block";
                            textoCarritoVacio[0].innerHTML = `Descuento`;

                            botonVolverDescuento.onclick = () => {
                                carritoProductosElegidos.style.display = "block";
                                carritoSubtotal.style.display = "block";
                                carritoAplicarDescuento.style.display = "none";
                                textoCarritoVacio[0].innerHTML = `Mi pedido`;
                            }

                            botonAplicarDescuento.onclick = () => {
                                let codigoIngresado = (codigoDescuento.value || "").toLowerCase();
                                descuento(codigoIngresado);

                                if (subtotal() != total) {
                                    Swal.fire({
                                        position: 'top',
                                        icon: 'success',
                                        title: `¡Descuento aplicado con éxito! El total es de: ${total}`,
                                        showConfirmButton: false,
                                        timer: 3000,
                                        background: '#D74E09',
                                        color: '#FFFFFF'
                                    });

                                    carritoSubtotal.innerHTML = `
                                        <div class="d-flex justify-content-around subtotalEnCarrito"> Subtotal = ${total}$ </div>
                                        <div class="d-flex justify-content-center divCompletarCompra">
                                            <button type="button" class="btn btn-primary boton6" id="botonCompletarCompra">Completar compra</button>
                                            <button type="button" class="btn btn-primary boton7" id="botonDescuento">Código de descuento</button>
                                        </div>
                                        <button type="button" class="btn btn-primary boton8 botonReset">Eliminar compra</button>`;
                                }

                                carritoProductosElegidos.style.display = "block";
                                carritoSubtotal.style.display = "block";
                                carritoAplicarDescuento.style.display = "none";
                                textoCarritoVacio[0].innerHTML = `Mi pedido`;
                            }
                        }
                    }

                    let botonEliminarCompra = document.getElementsByClassName("botonReset");
                    if (subtotal() !== 0 && botonEliminarCompra[0]) {
                        botonEliminarCompra[0].onclick = () => {
                            Swal.fire({
                                title: '¿Estás seguro?',
                                text: "Estás a punto de eliminar todos los productos de tu carrito",
                                icon: 'warning',
                                showCancelButton: true,
                                color: '#FFFFFF',
                                background: '#D74E09',
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: '¡Si, quiero eliminarlo!',
                                cancelButtonText: 'Cancelar',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: 'Eliminado',
                                        text: 'Sacaste todos los productos del carrito',
                                        color: '#FFFFFF',
                                        background: '#D74E09',
                                    });

                                    carrito.splice(0, carrito.length);
                                    textoCarritoVacio[0].innerHTML = `Aún no contas con ningún producto en tu carrito`;
                                    carritoSubtotal.innerHTML = null;
                                    carritoProductosElegidos.innerHTML = null;
                                    contadorIcono.innerText = `0`;
                                    localStorage.removeItem("carritoStorage");
                                    localStorage.removeItem("productosCarritoStorage");
                                }
                            });
                        }
                    }
                }
            }, 0);
        } else {
            productosEnCarrito.style.display = "none";
        }
    };
}



// CIERRE CARRITO/USUARIO
let cruzDeCierre = document.getElementsByClassName("cruzCierre");

// Asegurarse de que la variable esté definida
if (cruzDeCierre && cruzDeCierre.length > 0) {
    for (let i = 0; i < cruzDeCierre.length; i++) {
        if (!cruzDeCierre[i]) continue;

        cruzDeCierre[i].onclick = (e) => {
            e.preventDefault();

            if (productosEnCarrito && productosEnCarrito.style)
                productosEnCarrito.style.display = "none";

            if (contenedorForm && contenedorForm.style)
                contenedorForm.style.display = "none";

            if (formularioDeRegistro && formularioIngreso && usuariosTitulo) {
                if (formularioDeRegistro.style.display === "block") {
                    formularioDeRegistro.style.display = "none";
                    formularioIngreso.style.display = "block";
                    usuariosTitulo.innerText = "Ingreso a cuenta";
                }
            }
        };
    }

    // Este código lo ejecutamos solo si el elemento realmente existe
    // y lo hacemos DESPUÉS de que todo haya cargado
    window.addEventListener("load", () => {
        if (cruzDeCierre.length > 5) {
            let cruzExtra = cruzDeCierre[5];
            if (cruzExtra && typeof ventanaCargaProducto !== "undefined") {
                cruzExtra.onclick = () => {
                    if (ventanaCargaProducto && ventanaCargaProducto.style)
                        ventanaCargaProducto.style.display = "none";
                };
            }
        }
    });
}



// REGISTRAR USUARIO
let botonRegistrarme = document.getElementsByClassName("boton3");
let formularioDeRegistro = document.getElementById("formularioDeRegistro");
let formRegistrarse = document.getElementById("formRegistrarse");
let botonCompletarRegistro = document.getElementsByClassName("boton4");
let usuariosTitulo = document.getElementById("usuariosTitulo");
let botonVolverRegistrarse = document.getElementsByClassName("boton5")


if (botonRegistrarme && botonRegistrarme[0]) {
    botonRegistrarme[0].onclick = (e) => {
        e.preventDefault();

        if (formularioIngreso && formularioIngreso.style)
            formularioIngreso.style.display = "none";

        if (formularioDeRegistro && formularioDeRegistro.style)
            formularioDeRegistro.style.display = "block";

        if (usuariosTitulo)
            usuariosTitulo.innerText = "Registro de cuentas";

        if (botonVolverRegistrarse && botonVolverRegistrarse[0]) {
            botonVolverRegistrarse[0].onclick = () => {
                if (usuariosTitulo)
                    usuariosTitulo.innerText = "Ingreso a cuenta";

                if (formularioIngreso && formularioIngreso.style)
                    formularioIngreso.style.display = "block";

                if (formularioDeRegistro && formularioDeRegistro.style)
                    formularioDeRegistro.style.display = "none";
            };
        }

        if (formRegistrarse) {
            formRegistrarse.onsubmit = (el) => {
                el.preventDefault();

                let datosUsuarioNuevo = el.target;

                if (datosUsuarioNuevo.length >= 4) {
                    const usuarioNuevo = {
                        nombre: (datosUsuarioNuevo[0].value || "").toLowerCase(),
                        edad: (datosUsuarioNuevo[1].value || "").toLowerCase(),
                        mail: (datosUsuarioNuevo[2].value || "").toLowerCase(),
                        contraseña: (datosUsuarioNuevo[3].value || "").toLowerCase()
                    };

                    let usuarioNuevoStorage = JSON.stringify(usuarioNuevo);
                    guardarStorage("usuarioNuevo", usuarioNuevoStorage);

                    usuarios.push({
                        nombre: usuarioNuevo.nombre,
                        edad: usuarioNuevo.edad,
                        mail: usuarioNuevo.mail,
                        contraseña: usuarioNuevo.contraseña
                    });

                    if (usuariosTitulo)
                        usuariosTitulo.innerText = "Ingreso a cuenta";

                    if (formularioIngreso && formularioIngreso.style)
                        formularioIngreso.style.display = "block";

                    if (formularioDeRegistro && formularioDeRegistro.style)
                        formularioDeRegistro.style.display = "none";
                }
            };
        }
    };
}


// INGRESO DE USUARIO
let recordarmeIngreso = document.getElementById("recordarmeIngreso");
let saludo = document.getElementsByClassName("saludo");
let navbar = document.getElementById("barraInicial");


if (iconoCuenta) {
    iconoCuenta.onclick = () => {

        if (contenedorForm && contenedorForm.style) {
            if (contenedorForm.style.display === "none") {
                contenedorForm.style.display = "block";

                if (productosEnCarrito && productosEnCarrito.style) {
                    productosEnCarrito.style.display = "none";
                }

                if (linkCargaProducto && linkCargaProducto.style && linkCargaProducto.style.display === "block") {
                    if (formularioIngreso)
                        formularioIngreso.innerHTML = `<h3> Ya has ingresado a tu cuenta</h3>`;
                }

                if (formularioIngreso) {
                    formularioIngreso.onsubmit = (e) => {
                        e.preventDefault();

                        let usuarioId = (usuario?.value || "").toLowerCase();
                        let contraseñaId = (contraseña?.value || "").toLowerCase();
                        let ingreso;

                        for (let i in usuarios) {
                            if (usuarios[i].nombre === usuarioId && usuarios[i].contraseña === contraseñaId) {
                                ingreso = true;
                                usuarioId = usuarios[i].nombre;
                            }
                        }

                        if (ingreso === true) {
                            if (linkCargaProducto && linkCargaProducto.style)
                                linkCargaProducto.style.display = "block";

                            if (formularioIngreso)
                                formularioIngreso.innerHTML = `<h3> Ya has ingresado a tu cuenta</h3>`;

                            if (contenedorForm && contenedorForm.style)
                                contenedorForm.style.display = "none";

                            if (saludo && saludo[0]) {
                                saludo[0].style.display = "block";
                                saludo[0].innerText = `${saludo[0].innerText} ${usuarioId}`;
                            }

                            if (typeof temp !== "undefined") {
                                let ingresoNuevo = document.createElement("div");
                                ingresoNuevo.classList.add("corrido");

                                let prenda;
                                if (temp >= 25) {
                                    prenda = "Bermudas";
                                } else if (temp < 25 && temp >= 20) {
                                    prenda = "Remeras";
                                } else if (temp < 20 && temp >= 15) {
                                    prenda = "Jeans";
                                } else if (temp < 15 && temp >= 10) {
                                    prenda = "Pantalones de gamuza";
                                } else {
                                    prenda = "Poleras";
                                }

                                ingresoNuevo.innerHTML = `<div class="divTemperatura">
                                    <h2>Temperatura actual</h2>
                                    <p class="temperatura">${temp}°C</p>
                                    <p class="sugerencia"> Hoy es un buen día para comprar <span>${prenda}</span></p>
                                </div>`;

                                if (navbar)
                                    navbar.append(ingresoNuevo);

                                if (recordarmeIngreso && recordarmeIngreso.checked && saludo && saludo[0]) {
                                    guardarStorage("usuarioIngresado", "si");

                                    let saludoStorage = JSON.stringify(saludo[0].innerText);
                                    guardarStorage("saludo", saludoStorage);

                                    let guardarTemp = JSON.stringify(ingresoNuevo.innerHTML);
                                    guardarStorage("temperatura", guardarTemp);
                                }
                            }
                        }
                    };
                }
            } else {
                contenedorForm.style.display = "none";
            }
        }
    };
}




// CARGAR PRODUCTO
let cargarProducto = document.getElementById("cargarProducto");
let ventanaCargaProducto = document.getElementById("ventanaCargaProducto");
let formularioCargaProducto = document.getElementById("formularioCargaProducto");
let botonCargaProducto = document.getElementById("botonCargaProducto");
let DatosCarga;
let contador = 0;
let tarjetanueva = document.createElement("div");
let padreTarjeta = document.getElementById("padreTarjeta");



// CARGAR PRODUCTOS
if (cargarProducto) {
    cargarProducto.onclick = () => {

        if (ventanaCargaProducto && ventanaCargaProducto.style && ventanaCargaProducto.style.display === "none") {
            if (ventanaCargaProducto.style) ventanaCargaProducto.style.display = "block";

            if (formularioCargaProducto && formularioCargaProducto.onsubmit) {
                formularioCargaProducto.onsubmit = (e) => {

                    e.preventDefault();

                    let DatosCarga = e.target;

                    let nombre = DatosCarga && DatosCarga[0] ? DatosCarga[0].value : "";
                    let tipo = DatosCarga && DatosCarga[1] ? DatosCarga[1].value : "";
                    let talle = DatosCarga && DatosCarga[2] ? DatosCarga[2].value : "";
                    let categoria = DatosCarga && DatosCarga[3] ? DatosCarga[3].value : "";
                    let precio = DatosCarga && DatosCarga[4] ? DatosCarga[4].value : 0;
                    let cantidad = DatosCarga && DatosCarga[5] ? DatosCarga[5].value : 0;
                    let imagen = DatosCarga && DatosCarga[6] ? DatosCarga[6].value : "";

                    if (nombre && tipo && talle && categoria && precio > 0 && cantidad > 0 && imagen) {
                        let productoNuevo = new Prendas(
                            nombre, tipo, talle, categoria,
                            parseInt(precio), parseInt(cantidad), imagen
                        );

                        if (productoNuevo) {
                            stock.push(productoNuevo);

                            if (tarjetanueva) {
                                tarjetanueva.setAttribute("class", "card col-4");
                                tarjetanueva.setAttribute("style", "width: 18rem");
                                tarjetanueva.innerHTML = `
                                    <div class="card col-4" style="width: 18rem;">
                                        <img src="${imagen}" class="card-img-top imagenProductos" alt="...">
                                        <div class="card-body d-flex justify-content-between align-items-center">
                                            <p class="card-text ventaProducto">${nombre}</p>
                                            <input type="number" class="botonCantidad" value="0">
                                            <input type="button" value="Boton" class="boton btn-primary" name="Agregar">
                                        </div>
                                    </div>`;

                                if (padreTarjeta) {
                                    padreTarjeta.appendChild(tarjetanueva);
                                }
                            }

                            if (productoNuevo) {
                                let productoNuevoStorage = JSON.stringify(productoNuevo);
                                guardarStorage("productosNuevos", productoNuevoStorage);
                            }

                            if (ventanaCargaProducto && ventanaCargaProducto.style) {
                                ventanaCargaProducto.style.display = "none";
                            }

                            location.reload();
                        }
                    } else {
                        // Si falta algún campo obligatorio
                        Swal.fire({
                            icon: 'warning',
                            title: 'Campos incompletos',
                            text: 'Por favor, completa todos los campos correctamente.'
                        });
                    }
                }
            }
        } else if (ventanaCargaProducto && ventanaCargaProducto.style) {
            ventanaCargaProducto.style.display = "none";
        }
    };
}



// Buscador Por nombre

let botonesBuscadorPorNombre = document.getElementsByClassName("botonesBuscadorPorNombre");
let nombreBuscadorPorNombre = document.getElementsByClassName("nombreBuscadorPorNombre");
let cardsCreadas = document.getElementsByClassName("card");
let cardsTexto = document.getElementsByClassName("card-text");
let click = 0;

function eliminarAcentos(texto) {
    if (typeof texto !== 'string') return '';
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

if (
    botonesBuscadorPorNombre &&
    nombreBuscadorPorNombre &&
    cardsCreadas &&
    cardsTexto &&
    botonesBuscadorPorNombre.length === nombreBuscadorPorNombre.length
) {
    for (let i = 0; i < botonesBuscadorPorNombre.length; i++) {

        if (!botonesBuscadorPorNombre[i]) continue;

        botonesBuscadorPorNombre[i].onchange = () => {

            if (botonesBuscadorPorNombre[i].checked === true) {

                const nombreElemento = nombreBuscadorPorNombre[i];
                if (!nombreElemento || !nombreElemento.textContent) return;

                let textoBuscador = eliminarAcentos(nombreElemento.textContent.toLowerCase());

                for (let o = 0; o < botonesBuscadorPorNombre.length; o++) {
                    if (botonesBuscadorPorNombre[o] && i !== o) {
                        botonesBuscadorPorNombre[o].checked = null;
                    }
                }

                for (let o = 0; o < cardsTexto.length; o++) {
                    if (!cardsCreadas[o] || !cardsTexto[o]) continue;

                    cardsCreadas[o].style.display = "none";
                    let textoCard = eliminarAcentos(cardsTexto[o].textContent.toLowerCase());

                    if (typeof stock !== "undefined" && Array.isArray(stock)) {
                        stock.forEach((el) => {
                            if (
                                el &&
                                typeof el.nombre === 'string' &&
                                typeof el.categoria === 'string' &&
                                eliminarAcentos(el.nombre.toLowerCase()) === textoCard &&
                                eliminarAcentos(el.categoria.toLowerCase()) === textoBuscador
                            ) {
                                cardsCreadas[o].style.display = "flex";
                            }
                        });
                    }
                }

            } else {
                for (let o = 0; o < cardsCreadas.length; o++) {
                    if (cardsCreadas[o]) {
                        cardsCreadas[o].style.display = "flex";
                    }
                }
            }

        };
    }
} else {
    console.warn("Algunos elementos necesarios no están disponibles o las longitudes no coinciden.");
}




// BARRA HEADER
let textoBarraFinalHeader = document.querySelectorAll(".textoBarraFinalHeader")

textoBarra = () => {
    if (textoBarraFinalHeader && textoBarraFinalHeader.length > 0) {

        if (textoBarraFinalHeader[0] && textoBarraFinalHeader[0].id === "activo") {
            if (textoBarraFinalHeader[0].removeAttribute) {
                textoBarraFinalHeader[0].removeAttribute("id");
            }
            if (textoBarraFinalHeader[1]) {
                textoBarraFinalHeader[1].id = "activo";
            }

        } else if (textoBarraFinalHeader[1] && textoBarraFinalHeader[1].id === "activo") {
            if (textoBarraFinalHeader[1].removeAttribute) {
                textoBarraFinalHeader[1].removeAttribute("id");
            }
            if (textoBarraFinalHeader[2]) {
                textoBarraFinalHeader[2].id = "activo";
            }

        } else if (textoBarraFinalHeader[2] && textoBarraFinalHeader[2].id === "activo") {
            if (textoBarraFinalHeader[2].removeAttribute) {
                textoBarraFinalHeader[2].removeAttribute("id");
            }
            if (textoBarraFinalHeader[0]) {
                textoBarraFinalHeader[0].id = "activo";
            }
        }
    }
}


setInterval(() => {
    textoBarra()
}, 4000);



// BOTON CAMBIO DE PÁGINA:
let botonCambioPagina = document.getElementById("switch");
let body = document.getElementsByTagName("body");
let logo = document.getElementsByClassName("logo")

botonCambioPagina.onclick = () => {
    if (botonCambioPagina.checked === true) {

        for (let i = 0; i < 2; i++){
            logo[i].src = "./Footage/logo2.png"
        }

        body[0].classList.add("bodyDark");

        guardarStorage("darkMode", "si");


    } else {
        for (let i = 0; i < 2; i++){
            logo[i].src = "./Footage/logo2.png"
        }
        body[0].classList.remove("bodyDark");
        localStorage.removeItem("darkMode");

    }
}


// BUSCADOR POR PRECIO
const buscadorPorPrecio = () => {
    buscador = stock.filter((num) => num.precio <= precioMaximo && num.precio >= precioMinimo);
    buscador.forEach((el) => alert(`${el.nombre} se adecua a tu búsquedas`))
}

let botonMin = document.getElementById("min");
let botonMax = document.getElementById("max");
let divMin = document.getElementById("divMin");
let outputMin = document.getElementById("outputMin");
let outputMax = document.getElementById("outputMax");
let cardPrecio = document.getElementsByClassName("cardPrecio");
let botonAplicarBuscadorPorPrecio = document.getElementById("botonAplicarBuscadorPorPrecio")

botonAplicarBuscadorPorPrecio.onclick = () => {



    for (let i = 0; i < cardsTexto.length; i++) {
        let palabraClave = eliminarAcentos((cardsTexto[i].textContent).toLowerCase());
        cardsCreadas[i].style.display = "none";
        stock.forEach((el) => {
            if (el.precio >= botonMin.value && el.precio <= botonMax.value) {
                if (el.nombre === palabraClave) {

                    cardsCreadas[i].style.display = "flex";
                } else if (cardsCreadas[i].style.display === "flex") {
                    cardsCreadas[i].style.display === "flex"
                }
            }
        })
    }
}

botonMax.oninput = () => {
    outputMax.innerText = `${botonMax.value}`;

}



botonMin.oninput = () => {
    outputMin.innerText = `${botonMin.value}`;

}


// Links a otras secciones
let linksVacios = document.getElementsByClassName("linksVacios");


for (let i = 0; i <= linksVacios.length; i++){
    linksVacios[i].onclick = () =>{

        Swal.fire({
            title: 'Pronto podrás acceder a estas secciones',
            confirmButtonText: "Aceptar",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            confirmButtonColor: `#D74E09`,
            color: '#FFFFFF',
            background: '#D74E09',
          })

    }
}