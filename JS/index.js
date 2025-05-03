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
      if (typeof clave !== 'string') {
        throw new TypeError('La clave debe ser una cadena');
      }
  
      if (valor === undefined) {
        throw new Error('El valor no puede ser undefined');
      }
  
      const valorString = typeof valor === 'string' ? valor : JSON.stringify(valor);
      localStorage.setItem(clave, valorString);
    } catch (e) {
      console.error(`Error guardando ${clave} en localStorage:`, e);
    }
};
  
const obtenerStorageSeguro = (clave) => {
    try {
      if (typeof clave !== 'string') {
        throw new TypeError('La clave debe ser una cadena');
      }
  
      const item = localStorage.getItem(clave);
      if (!item) return null;
  
      const parsed = JSON.parse(item);
      return parsed;
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
    
        if (
            Array.isArray(productoCarritoGuardado) ||
            typeof productoCarritoGuardado === "string"
        ) {
            carritoProductosElegidos.innerHTML = `${productoCarritoGuardado}`;
            final.push(productoCarritoGuardado);
        } else {
            throw new Error("El formato de productosCarritoStorage no es válido");
        }
        } catch (e) {
        console.error("Error al parsear productosCarritoStorage:", e);
        }
    }
  
    // CARRITO GUARDADO
    try {
        carritoGuardado = JSON.parse(carritoGuardado);
    } catch (e) {
        console.error("Error al parsear carritoStorage:", e);
        carritoGuardado = undefined;
    }
    
    if (carritoGuardado !== undefined && Array.isArray(carritoGuardado)) {
        for (let i = 0; i < carritoGuardado.length; i++) {
        const item = carritoGuardado[i];
    
        if (!item || typeof item !== "object") continue;
    
        for (let e of stock) {
            if (!e || typeof e !== "object") continue;
    
            if (item?.producto === e?.nombre) {
            if (
                typeof item.cantidades === "number" &&
                typeof e.cantidad === "number"
            ) {
                e.cantidad = e.cantidad - item.cantidades;
    
                if (e.cantidad < 0) e.cantidad = 0;
    
                e.stock = e.cantidad === 0 ? "no" : "si";
    
                carrito.push(item);
    
                final.push(`
                <div class="d-flex justify-content-between muestrarioCarrito align-items-center">
                    <img src=${e.imagen} alt="..." class="imagenEnCarrito">
                    <div class="productosEnCarrito">
                    <h3 class="nombreProductoEnCarrito">${e.nombre}</h3>
                    <div class="sumadorCarrito">
                        <button class="botonCarritoIngresado botonMenosCarrito">-</button>
                        <p>${item.cantidades}</p>
                        <button class="botonCarritoIngresado botonMasCarrito">+</button>
                    </div>
                    <p>${item.precioFinal}$</p>
                    </div>
                </div>
                `);
    
                carritoProductosElegidos.innerHTML = `${final.join("")}`;
            } else {
                console.warn(
                `Tipos inválidos para cantidades o e.cantidad en el producto "${e.nombre}"`
                );
            }
            }
        }
        }
    
        if (typeof subtotal === "function") {
        const valorSubtotal = subtotal();
    
        if (typeof valorSubtotal === "number" && valorSubtotal !== 0) {
            carritoSubtotal.innerHTML = `
            <div class="d-flex justify-content-around subtotalEnCarrito">Subtotal = ${valorSubtotal}$</div>
            <div class="d-flex justify-content-center divCompletarCompra">
                <button type="button" class="btn btn-primary boton6" id="botonCompletarCompra">Completar compra</button>
                <button type="button" class="btn btn-primary boton7" id="botonDescuento">Código de descuento</button>
            </div>
            <button type="button" class="btn btn-primary boton8 botonReset">Eliminar compra</button>`;
        }
        }
    }
    

    // PRODUCTO GUARDADO EN STORAGE
    if (productoGuardadoEnStorage !== undefined && productoGuardadoEnStorage !== null) {
        try {
        productoGuardadoEnStorage = JSON.parse(productoGuardadoEnStorage);
    
        const {
            nombre,
            tipo,
            talle,
            categoria,
            precio,
            cantidad,
            imagen
        } = productoGuardadoEnStorage;
    
        if (
            typeof nombre === "string" &&
            typeof precio === "number" &&
            typeof imagen === "string"
        ) {
            productoNuevo = new Prendas(nombre, tipo, talle, categoria, precio, cantidad, imagen);
            stock.push(productoNuevo);
    
            if (tarjetanueva instanceof HTMLElement && padreTarjeta instanceof HTMLElement) {
            tarjetanueva.setAttribute("class", "card col-4");
            tarjetanueva.setAttribute("style", "width: 18rem");
            tarjetanueva.innerHTML = `
                <img src="${imagen}" class="card-img-top imagenProductos" alt="...">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <p class="card-text ventaProducto">${nombre}</p>
                    <input type="number" class="botonCantidad" value="0">
                    <input type="button" value="Boton" class="boton btn-primary" name="Agregar">
                </div>`;
            padreTarjeta.appendChild(tarjetanueva);
            } else {
            console.warn("Los elementos HTML necesarios no están definidos correctamente.");
            }
        } else {
            console.warn("Datos insuficientes o inválidos para crear un producto.");
        }
        } catch (e) {
        console.error("Error al parsear productosNuevos:", e);
        }
    }
  
    // USUARIO GUARDADO EN STORAGE
    if (usuarioGuardadoEnStorage !== undefined && usuarioGuardadoEnStorage !== null) {
        try {
        usuarioGuardadoEnStorage = JSON.parse(usuarioGuardadoEnStorage);
    
        const {
            nombre,
            edad,
            mail,
            contraseña
        } = usuarioGuardadoEnStorage;
    
        if (
            typeof nombre === "string" &&
            typeof edad === "number" &&
            typeof mail === "string" &&
            typeof contraseña === "string"
        ) {
            usuarios.push({ nombre, edad, mail, contraseña });
        } else {
            console.warn("Datos de usuario inválidos o incompletos.");
        }
        } catch (e) {
        console.error("Error al parsear usuarioNuevo:", e);
        }
    }
  

    // USUARIO INGRESADO
    if (usuarioIngresadoStorage === "si") {
        if (linkCargaProducto instanceof HTMLElement) {
        linkCargaProducto.style.display = "block";
        }
    
        try {
        const saludoDeStorage = JSON.parse(localStorage.getItem("saludo"));
        if (saludoDeStorage && Array.isArray(saludo) && saludo[0] instanceof HTMLElement) {
            saludo[0].style.display = "block";
            saludo[0].innerText = `${saludoDeStorage}`;
    
            if (saludo[0].style.display === "block" && formularioIngreso instanceof HTMLElement) {
            formularioIngreso.innerHTML = `<h3> Ya has ingresado a tu cuenta</h3>`;
            }
        }
        } catch (e) {
        console.error("Error al parsear saludo:", e);
        }
    }
  
    // TEMPERATURA
    if (typeof temperaturaEnStorage === "string") {
        try {
        temperaturaEnStorage = JSON.parse(temperaturaEnStorage);
        if (temperaturaEnStorage && navbar instanceof HTMLElement) {
            const ingresoNuevo = document.createElement("div");
            ingresoNuevo.classList.add("corrido");
            ingresoNuevo.innerHTML = temperaturaEnStorage;
            navbar.appendChild(ingresoNuevo);
        }
        } catch (e) {
        console.error("Error al parsear temperatura:", e);
        }
    }
    
    // DARK MODE
    if (darkModeStorage === "si") {
        if (
        Array.isArray(logo) &&
        logo.length >= 2 &&
        logo[0] instanceof HTMLImageElement &&
        logo[1] instanceof HTMLImageElement &&
        botonCambioPagina instanceof HTMLInputElement &&
        Array.isArray(body) &&
        body[0] instanceof HTMLElement
        ) {
        logo[0].src = "./Footage/logo2.png";
        logo[1].src = "./Footage/logo2.png";
    
        botonCambioPagina.checked = true;
        body[0].classList.add("bodyDark");
        } else {
        console.warn("Elementos para el modo oscuro no están bien definidos.");
        }
    }
  
};


// AGREGAR A CARRITO
const botonCarrito = document.querySelectorAll(".boton");
const ventaProducto = document.querySelectorAll(".ventaProducto");
const botonCantidad = document.querySelectorAll(".botonCantidad");
const imagenProductos = document.getElementsByClassName("imagenProductos");
const carrito = [];
const final = [];

const usuario = document.getElementById("usuario");
const contraseña = document.getElementById("contraseña");
const linkCargaProducto = document.getElementById("linkCargaProducto");

/**
 * Añade un producto al carrito.
 * @param {Object} compra - Objeto que representa el producto.
 * @param {number|string} cantidad - Cantidad deseada del producto.
 */
const botonCompra = (compra, cantidad) => {
    const cantidadNumerica = parseInt(cantidad);

    if (
        typeof compra === "object" &&
        compra !== null &&
        typeof compra.nombre === "string" &&
        typeof compra.stock === "string" &&
        typeof compra.imagen === "string" &&
        typeof compra.precio === "number" &&
        typeof compra.cantidad === "number" &&
        !isNaN(cantidadNumerica)
    ) {
        if (cantidadNumerica > 0 && compra.stock.toLowerCase() === "si") {
        if (cantidadNumerica <= compra.cantidad) {
            compra.cantidad -= cantidadNumerica;
            compra.stock = compra.cantidad > 0 ? "si" : "no";

            const precioParcial = compra.precio * cantidadNumerica;
            const yaEnCarrito = carrito.find((el) => el.producto === compra.nombre);

            if (yaEnCarrito) {
            yaEnCarrito.cantidades += cantidadNumerica;
            yaEnCarrito.precioFinal += precioParcial;
            } else {
            carrito.push({
                cantidades: cantidadNumerica,
                producto: compra.nombre,
                precioFinal: precioParcial,
                precioIndividual: compra.precio,
                imagen: compra.imagen,
            });
            }

            // Confirmación visual
            if (typeof Toastify === "function") {
            Toastify({
                text: `Agregaste ${cantidadNumerica} productos a tu carrito`,
                className: "info",
                duration: 1000,
                style: {
                background: "#D74E09",
                borderRadius: "30px",
                },
            }).showToast();
            } else {
            console.warn("Toastify no está disponible");
            }
        } else {
            console.warn("La cantidad solicitada supera el stock disponible.");
        }
        } else {
        console.warn("Cantidad inválida o el producto no tiene stock.");
        }
    } else {
        console.error("El objeto 'compra' no es válido o los datos son incorrectos:", compra);
    }
};


// Agregar elementos a carrito:
for (let i = 0; i < stock.length; i++) {
    // Verificamos que el botón exista y tenga el método addEventListener
    if (botonCarrito[i] && typeof botonCarrito[i].addEventListener === "function") {
        botonCarrito[i].addEventListener("click", () => agregarCarrito(i));
    } else {
        console.warn(`botonCarrito[${i}] no es un botón válido o no existe.`);
    }
}

/**
 * Función para manejar la lógica de agregar productos al carrito.
 * @param {number} index - Índice del producto en stock.
 */
function agregarCarrito(index) {
    const producto = stock[index];
    const inputCantidad = botonCantidad[index];

    // Validaciones básicas
    if (
        producto &&
        typeof producto.cantidad === "number" &&
        inputCantidad &&
        !isNaN(parseInt(inputCantidad.value))
    ) {
        const cantidadSeleccionada = parseInt(inputCantidad.value);

        if (producto.cantidad >= cantidadSeleccionada && cantidadSeleccionada > 0) {
            botonCompra(producto, cantidadSeleccionada);

            // Limpiamos y reconstruimos el HTML del carrito
            final.length = 0;
            for (let el of carrito) {
                final.push(`
                    <div class="d-flex justify-content-between muestrarioCarrito align-items-center">
                        <img src="${el.imagen}" alt="..." class="imagenEnCarrito">
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
                carritoProductosElegidos.innerHTML = final.join("");
                carritoProductosElegidos.style.overflowY = "scroll";
            }

            if (carritoSubtotal && typeof subtotal === "function") {
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
                textoCarritoVacio[0].innerHTML = carrito.length > 0 ? "Mi pedido" : "";
            }

            // Guardar en localStorage
            try {
                guardarStorage("carritoStorage", JSON.stringify(carrito));
            } catch (e) {
                console.error("Error al guardar en localStorage:", e);
            }

            if (typeof contadorCarritoIcono === "function") {
                contadorCarritoIcono();
            }

        } else {
            console.warn(`Cantidad inválida: ${cantidadSeleccionada}. Stock disponible: ${producto.cantidad}`);
            if (ventaProducto[index]) {
                ventaProducto[index].innerHTML += `
                    <p>Fuera de stock</p><br>
                    Stock: ${producto.cantidad}
                `;
            }
        }
    } else {
        console.error(`Datos inválidos para el producto en la posición ${index}`, producto);
    }
}


// CONTADOR
const contadorIcono = document.getElementById("contador");

/**
 * Actualiza el ícono del carrito con la cantidad de productos actuales.
 */
function contadorCarritoIcono() {
    if (!Array.isArray(carrito)) {
        console.error("'carrito' no está definido o no es un array");
        return;
    }

    const cantidadProductos = carrito.length;

    if (contadorIcono && typeof contadorIcono.innerText !== "undefined") {
        contadorIcono.innerText = String(cantidadProductos);
    } else {
        console.warn("Elemento con id 'contador' no encontrado o no válido");
    }
}


// CARRITO - Referencias a elementos del DOM
const iconoCarrito = document.getElementById("iconoCarrito");
const productosEnCarrito = document.getElementById("posBotonCarrito");
const textoCarritoVacio = document.getElementsByClassName("carritoVacio");
const carritoProductosElegidos = document.getElementById("carritoProductosElegidos");
const carritoSubtotal = document.getElementById("carritoSubtotal");
const botonMenosCarrito = document.getElementsByClassName("botonMenosCarrito");
const botonMasCarrito = document.getElementsByClassName("botonMasCarrito");
const nombreProductoEnCarrito = document.getElementsByClassName("nombreProductoEnCarrito");
const cantidadesEnCarrito = document.querySelectorAll(".cantidadesEnCarrito");
const botonDescuento = document.getElementsByClassName("boton7");
const carritoAplicarDescuento = document.getElementById("carritoAplicarDescuento");
const botonVolverDescuento = document.getElementById("botonVolverDescuento");
const codigoDescuento = document.getElementById("codigoDescuento");
const botonAplicarDescuento = document.getElementById("botonAplicarDescuento");
let intervalo; // Temporizador o refresco, depende del uso externo
const iconoCuenta = document.getElementById("iconoCuenta");
const formularioIngreso = document.getElementById("formulario");
const contenedorForm = document.getElementById("contenedorForm");
const botonSubmit = document.getElementsByClassName("boton2");

/**
 * Aplica un descuento según el código ingresado y actualiza el total.
 * @param {string} codigo - Código de descuento (ej. 'hipocampo', 'bolso').
 */
const descuento = (codigo) => {
    if (typeof codigo !== "string") {
        console.warn("Código de descuento inválido");
        return;
    }

    const codigoNormalizado = codigo.toLowerCase();

    if (typeof subtotal !== "function") {
        console.error("La función 'subtotal' no está definida");
        return;
    }

    const subtotalActual = subtotal();

    if (isNaN(subtotalActual)) {
        console.error("El subtotal no es un número válido");
        return;
    }

    let totalCalculado;

    switch (codigoNormalizado) {
        case "hipocampo":
            if (typeof porcentaje10 === "function") {
                totalCalculado = subtotalActual - porcentaje10(subtotalActual);
            } else {
                console.error("La función 'porcentaje10' no está definida");
                return;
            }
            break;

        case "bolso":
            if (typeof porcentaje25 === "function") {
                totalCalculado = subtotalActual - porcentaje25(subtotalActual);
            } else {
                console.error("La función 'porcentaje25' no está definida");
                return;
            }
            break;

        default:
            totalCalculado = parseFloat(subtotalActual);
            break;
    }

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

        try {
            // Prevención: limpiar intervalos anteriores si existiera
            if (intervalo) {
                clearInterval(intervalo);
            }
        } catch (err) {
            console.warn("No se pudo limpiar intervalo anterior", err);
        }

        if (productosEnCarrito.style.display === "none") {
            productosEnCarrito.style.display = "block";
            contenedorForm.style.display = "none";

            let botonFinalizarCompra = document.getElementsByClassName("boton6");
            if (carrito && Array.isArray(carrito) && carrito[0] != undefined && textoCarritoVacio[0] && carritoProductosElegidos) {
                textoCarritoVacio[0].innerHTML = `Mi pedido`;
                carritoProductosElegidos.style.overflowY = "scroll";
            }

            intervalo = setInterval(() => {
                try {
                    if (typeof subtotal === "function" && subtotal() != 0) {
                        for (let i = 0; i < carrito.length; i++) {
                            if (!botonMasCarrito[i] || !botonMenosCarrito[i] || !nombreProductoEnCarrito[i]) continue;
                            if (typeof nombreProductoEnCarrito[i].innerText !== 'string') continue;

                            botonMasCarrito[i].onclick = () => {
                                try {
                                    for (let el of carrito) {
                                        if (el.producto === nombreProductoEnCarrito[i].innerText) {
                                            el.cantidades = Math.max(0, el.cantidades + 1);
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
                                } catch (err) {
                                    console.error("Error al incrementar cantidad", err);
                                }
                            }

                            botonMenosCarrito[i].onclick = () => {
                                try {
                                    for (let el of carrito) {
                                        if (el.producto === nombreProductoEnCarrito[i].innerText) {
                                            el.cantidades = Math.max(0, el.cantidades - 1);
                                            el.precioFinal = el.precioIndividual * el.cantidades;

                                            if (el.cantidades <= 0) {
                                                final.splice(i, 1);
                                                if (carritoProductosElegidos) carritoProductosElegidos.innerHTML = `${final.join("")}`;
                                                carrito.splice(i, 1);
                                                if (typeof contadorCarritoIcono === "function") contadorCarritoIcono();

                                                if (carrito.length === 0) {
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
                                } catch (err) {
                                    console.error("Error al decrementar cantidad", err);
                                }
                            }
                        }

                        if (subtotal() !== 0 && botonFinalizarCompra[0]) {
                            botonFinalizarCompra[0].onclick = () => {
                                try {
                                    Swal.fire({
                                        title: '¡PRONTO PODRÁS COMPLETAR EL PROCESO!',
                                        width: 600,
                                        padding: '3em',
                                        confirmButtonColor: '#D74E09',
                                        color: '#FFFFFF',
                                        background: '#D74E09',
                                        backdrop: `rgba(0,0,123,0.1) left top no-repeat`
                                    });
                                } catch (err) {
                                    console.error("Error mostrando alerta finalizar compra", err);
                                }
                            }
                        }

                        if (botonDescuento[0]) {
                            botonDescuento[0].onclick = () => {
                                try {
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
                                        let codigoIngresado = (codigoDescuento.value || "").toLowerCase().trim();
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
                                } catch (err) {
                                    console.error("Error en aplicar descuento", err);
                                }
                            }
                        }

                        let botonEliminarCompra = document.getElementsByClassName("botonReset");
                        if (subtotal() !== 0 && botonEliminarCompra[0]) {
                            botonEliminarCompra[0].onclick = () => {
                                try {
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
                                } catch (err) {
                                    console.error("Error eliminando compra", err);
                                }
                            }
                        }
                    }
                } catch (err) {
                    console.error("Error en ciclo principal del carrito", err);
                }
            }, 0);
        } else {
            productosEnCarrito.style.display = "none";
        }
    };
}


// CIERRE CARRITO/USUARIO
let cruzDeCierre = document.getElementsByClassName("cruzCierre");

// Asegurarse de que la variable esté definida y es una colección válida
if (cruzDeCierre && cruzDeCierre.length > 0) {
    for (let i = 0; i < cruzDeCierre.length; i++) {
        if (!cruzDeCierre[i] || typeof cruzDeCierre[i].onclick !== "undefined") continue;

        cruzDeCierre[i].onclick = (e) => {
            try {
                if (e && typeof e.preventDefault === "function") {
                    e.preventDefault();
                }

                if (productosEnCarrito && productosEnCarrito.style && typeof productosEnCarrito.style.display !== "undefined") {
                    productosEnCarrito.style.display = "none";
                }

                if (contenedorForm && contenedorForm.style && typeof contenedorForm.style.display !== "undefined") {
                    contenedorForm.style.display = "none";
                }

                if (formularioDeRegistro && formularioDeRegistro.style && formularioIngreso && formularioIngreso.style && usuariosTitulo) {
                    if (formularioDeRegistro.style.display === "block") {
                        formularioDeRegistro.style.display = "none";
                        formularioIngreso.style.display = "block";
                        usuariosTitulo.innerText = "Ingreso a cuenta";
                    }
                }

            } catch (err) {
                console.error("Error al intentar cerrar las ventanas:", err);
            }
        };
    }

    // Este código lo ejecutamos solo si el elemento realmente existe
    // y lo hacemos DESPUÉS de que todo haya cargado
    window.addEventListener("load", () => {
        try {
            if (cruzDeCierre.length > 5) {
                let cruzExtra = cruzDeCierre[5];
                if (cruzExtra && typeof cruzExtra.onclick === "undefined" && typeof ventanaCargaProducto !== "undefined") {
                    cruzExtra.onclick = () => {
                        try {
                            if (ventanaCargaProducto && ventanaCargaProducto.style && typeof ventanaCargaProducto.style.display !== "undefined") {
                                ventanaCargaProducto.style.display = "none";
                            }
                        } catch (err) {
                            console.error("Error al cerrar ventana de carga de producto:", err);
                        }
                    };
                }
            }
        } catch (err) {
            console.error("Error al asignar cierre a cruzExtra:", err);
        }
    });
}


// REGISTRAR USUARIO
let botonRegistrarme = document.getElementsByClassName("boton3");
let formularioDeRegistro = document.getElementById("formularioDeRegistro");
let formRegistrarse = document.getElementById("formRegistrarse");
let botonCompletarRegistro = document.getElementsByClassName("boton4");
let usuariosTitulo = document.getElementById("usuariosTitulo");
let botonVolverRegistrarse = document.getElementsByClassName("boton5");

if (botonRegistrarme && botonRegistrarme[0]) {
    botonRegistrarme[0].onclick = (e) => {
        try {
            if (e && typeof e.preventDefault === "function") {
                e.preventDefault();
            }

            if (formularioIngreso && formularioIngreso.style && typeof formularioIngreso.style.display !== "undefined") {
                formularioIngreso.style.display = "none";
            }

            if (formularioDeRegistro && formularioDeRegistro.style && typeof formularioDeRegistro.style.display !== "undefined") {
                formularioDeRegistro.style.display = "block";
            }

            if (usuariosTitulo) {
                usuariosTitulo.innerText = "Registro de cuentas";
            }

            if (botonVolverRegistrarse && botonVolverRegistrarse[0]) {
                botonVolverRegistrarse[0].onclick = () => {
                    try {
                        if (usuariosTitulo) {
                            usuariosTitulo.innerText = "Ingreso a cuenta";
                        }

                        if (formularioIngreso && formularioIngreso.style && typeof formularioIngreso.style.display !== "undefined") {
                            formularioIngreso.style.display = "block";
                        }

                        if (formularioDeRegistro && formularioDeRegistro.style && typeof formularioDeRegistro.style.display !== "undefined") {
                            formularioDeRegistro.style.display = "none";
                        }
                    } catch (err) {
                        console.error("Error al volver al formulario de ingreso:", err);
                    }
                };
            }

            if (formRegistrarse && typeof formRegistrarse.onsubmit === "undefined") {
                formRegistrarse.onsubmit = (el) => {
                    try {
                        if (el && typeof el.preventDefault === "function") {
                            el.preventDefault();
                        }

                        let datosUsuarioNuevo = el.target;
                        if (!datosUsuarioNuevo || typeof datosUsuarioNuevo.length === "undefined") {
                            console.error("Formulario de registro no válido.");
                            return;
                        }

                        // Validación estricta: asegurar que los 4 campos existan y tengan valores
                        if (datosUsuarioNuevo.length >= 4 &&
                            datosUsuarioNuevo[0] && datosUsuarioNuevo[1] &&
                            datosUsuarioNuevo[2] && datosUsuarioNuevo[3]) {

                            const usuarioNuevo = {
                                nombre: (datosUsuarioNuevo[0].value || "").toLowerCase().trim(),
                                edad: (datosUsuarioNuevo[1].value || "").toLowerCase().trim(),
                                mail: (datosUsuarioNuevo[2].value || "").toLowerCase().trim(),
                                contraseña: (datosUsuarioNuevo[3].value || "").toLowerCase().trim()
                            };

                            // Validación básica de campos no vacíos
                            if (!usuarioNuevo.nombre || !usuarioNuevo.edad || !usuarioNuevo.mail || !usuarioNuevo.contraseña) {
                                console.error("Todos los campos deben estar completos para registrarse.");
                                return;
                            }

                            try {
                                let usuarioNuevoStorage = JSON.stringify(usuarioNuevo);
                                guardarStorage("usuarioNuevo", usuarioNuevoStorage);
                            } catch (err) {
                                console.error("Error guardando usuario en storage:", err);
                            }

                            usuarios.push({
                                nombre: usuarioNuevo.nombre,
                                edad: usuarioNuevo.edad,
                                mail: usuarioNuevo.mail,
                                contraseña: usuarioNuevo.contraseña
                            });

                            if (usuariosTitulo) {
                                usuariosTitulo.innerText = "Ingreso a cuenta";
                            }

                            if (formularioIngreso && formularioIngreso.style && typeof formularioIngreso.style.display !== "undefined") {
                                formularioIngreso.style.display = "block";
                            }

                            if (formularioDeRegistro && formularioDeRegistro.style && typeof formularioDeRegistro.style.display !== "undefined") {
                                formularioDeRegistro.style.display = "none";
                            }

                        } else {
                            console.error("Formulario incompleto o incorrecto.");
                        }

                    } catch (err) {
                        console.error("Error al completar registro de usuario:", err);
                    }
                };
            }

        } catch (err) {
            console.error("Error en el proceso de registro:", err);
        }
    };
}


// INGRESO DE USUARIO
let recordarmeIngreso = document.getElementById("recordarmeIngreso");
let saludo = document.getElementsByClassName("saludo");
let navbar = document.getElementById("barraInicial");

if (iconoCuenta) {
    iconoCuenta.onclick = () => {
        try {
            if (contenedorForm && contenedorForm.style) {
                if (contenedorForm.style.display === "none") {
                    contenedorForm.style.display = "block";

                    if (productosEnCarrito && productosEnCarrito.style) {
                        productosEnCarrito.style.display = "none";
                    }

                    if (linkCargaProducto && linkCargaProducto.style && linkCargaProducto.style.display === "block") {
                        if (formularioIngreso) {
                            formularioIngreso.innerHTML = `<h3> Ya has ingresado a tu cuenta</h3>`;
                        }
                    }

                    if (formularioIngreso) {
                        formularioIngreso.onsubmit = (e) => {
                            try {
                                if (e && typeof e.preventDefault === "function") {
                                    e.preventDefault();
                                }

                                let usuarioId = (usuario?.value || "").toLowerCase().trim();
                                let contraseñaId = (contraseña?.value || "").toLowerCase().trim();
                                let ingreso = false;

                                // Validación: entradas no vacías
                                if (!usuarioId || !contraseñaId) {
                                    console.warn("Usuario y contraseña son obligatorios.");
                                    return;
                                }

                                // Validación contra lista de usuarios
                                for (let i = 0; i < usuarios.length; i++) {
                                    if (usuarios[i] &&
                                        usuarios[i].nombre === usuarioId &&
                                        usuarios[i].contraseña === contraseñaId) {
                                        ingreso = true;
                                        usuarioId = usuarios[i].nombre; // asegurar nombre exacto
                                        break;
                                    }
                                }

                                if (ingreso === true) {
                                    if (linkCargaProducto && linkCargaProducto.style) {
                                        linkCargaProducto.style.display = "block";
                                    }

                                    if (formularioIngreso) {
                                        formularioIngreso.innerHTML = `<h3> Ya has ingresado a tu cuenta</h3>`;
                                    }

                                    if (contenedorForm && contenedorForm.style) {
                                        contenedorForm.style.display = "none";
                                    }

                                    if (saludo && saludo[0]) {
                                        saludo[0].style.display = "block";
                                        saludo[0].innerText = `${saludo[0].innerText} ${usuarioId}`;
                                    }

                                    if (typeof temp !== "undefined" && !isNaN(temp)) {
                                        let ingresoNuevo = document.createElement("div");
                                        ingresoNuevo.classList.add("corrido");

                                        let prenda = "Poleras";
                                        if (temp >= 25) {
                                            prenda = "Bermudas";
                                        } else if (temp >= 20) {
                                            prenda = "Remeras";
                                        } else if (temp >= 15) {
                                            prenda = "Jeans";
                                        } else if (temp >= 10) {
                                            prenda = "Pantalones de gamuza";
                                        }

                                        ingresoNuevo.innerHTML = `<div class="divTemperatura">
                                            <h2>Temperatura actual</h2>
                                            <p class="temperatura">${temp}°C</p>
                                            <p class="sugerencia"> Hoy es un buen día para comprar <span>${prenda}</span></p>
                                        </div>`;

                                        if (navbar) {
                                            navbar.append(ingresoNuevo);
                                        }

                                        if (recordarmeIngreso && recordarmeIngreso.checked && saludo && saludo[0]) {
                                            try {
                                                guardarStorage("usuarioIngresado", "si");

                                                let saludoStorage = JSON.stringify(saludo[0].innerText);
                                                guardarStorage("saludo", saludoStorage);

                                                let guardarTemp = JSON.stringify(ingresoNuevo.innerHTML);
                                                guardarStorage("temperatura", guardarTemp);
                                            } catch (err) {
                                                console.error("Error guardando información en storage:", err);
                                            }
                                        }
                                    }
                                } else {
                                    console.warn("Usuario o contraseña incorrectos.");
                                }

                            } catch (err) {
                                console.error("Error en el proceso de ingreso:", err);
                            }
                        };
                    }

                } else {
                    contenedorForm.style.display = "none";
                }
            }

        } catch (err) {
            console.error("Error en el evento de apertura de cuenta:", err);
        }
    };
}


// CARGAR PRODUCTO
let cargarProducto = document.getElementById("cargarProducto");
let ventanaCargaProducto = document.getElementById("ventanaCargaProducto");
let formularioCargaProducto = document.getElementById("formularioCargaProducto");
let botonCargaProducto = document.getElementById("botonCargaProducto");
let padreTarjeta = document.getElementById("padreTarjeta");

if (cargarProducto) {
    cargarProducto.onclick = () => {
        try {
            if (ventanaCargaProducto && ventanaCargaProducto.style) {
                if (ventanaCargaProducto.style.display === "none") {
                    ventanaCargaProducto.style.display = "block";

                    if (formularioCargaProducto) {
                        formularioCargaProducto.onsubmit = (e) => {
                            try {
                                if (e && typeof e.preventDefault === "function") {
                                    e.preventDefault();
                                }

                                let DatosCarga = e.target;
                                if (!DatosCarga || DatosCarga.length < 7) {
                                    console.warn("Formulario incompleto.");
                                    return;
                                }

                                // Recolecta valores y limpia espacios
                                let nombre = (DatosCarga[0].value || "").trim();
                                let tipo = (DatosCarga[1].value || "").trim();
                                let talle = (DatosCarga[2].value || "").trim();
                                let categoria = (DatosCarga[3].value || "").trim();
                                let precio = parseFloat(DatosCarga[4].value);
                                let cantidad = parseInt(DatosCarga[5].value);
                                let imagen = (DatosCarga[6].value || "").trim();

                                // Validación estricta
                                if (
                                    nombre && tipo && talle && categoria &&
                                    !isNaN(precio) && precio > 0 &&
                                    !isNaN(cantidad) && cantidad > 0 &&
                                    imagen
                                ) {
                                    let productoNuevo = new Prendas(
                                        nombre, tipo, talle, categoria, precio, cantidad, imagen
                                    );

                                    if (productoNuevo) {
                                        stock.push(productoNuevo);

                                        // Crear una tarjeta NUEVA por cada producto cargado
                                        let tarjetanueva = document.createElement("div");
                                        tarjetanueva.setAttribute("class", "card col-4");
                                        tarjetanueva.setAttribute("style", "width: 18rem");

                                        // Escapar atributos para evitar XSS (usando textContent donde se pueda)
                                        tarjetanueva.innerHTML = `
                                            <div class="card col-4" style="width: 18rem;">
                                                <img src="${encodeURI(imagen)}" class="card-img-top imagenProductos" alt="${nombre}">
                                                <div class="card-body d-flex justify-content-between align-items-center">
                                                    <p class="card-text ventaProducto">${escapeHTML(nombre)}</p>
                                                    <input type="number" class="botonCantidad" value="0" min="0">
                                                    <input type="button" value="Boton" class="boton btn-primary" name="Agregar">
                                                </div>
                                            </div>`;

                                        if (padreTarjeta) {
                                            padreTarjeta.appendChild(tarjetanueva);
                                        }

                                        try {
                                            let productoNuevoStorage = JSON.stringify(productoNuevo);
                                            guardarStorage("productosNuevos", productoNuevoStorage);
                                        } catch (err) {
                                            console.error("Error guardando producto en storage:", err);
                                        }

                                        ventanaCargaProducto.style.display = "none";
                                        location.reload();

                                    }
                                } else {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Campos incompletos',
                                        text: 'Por favor, completa todos los campos correctamente.'
                                    });
                                }

                            } catch (err) {
                                console.error("Error en la carga de producto:", err);
                            }
                        };
                    }

                } else {
                    ventanaCargaProducto.style.display = "none";
                }
            }
        } catch (err) {
            console.error("Error al abrir ventana de carga de producto:", err);
        }
    };
}

// Función auxiliar para escapar texto (prevención de XSS simple)
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}


// Buscador Por nombre
let botonesBuscadorPorNombre = document.getElementsByClassName("botonesBuscadorPorNombre");
let nombreBuscadorPorNombre = document.getElementsByClassName("nombreBuscadorPorNombre");
let cardsCreadas = document.getElementsByClassName("card");
let cardsTexto = document.getElementsByClassName("card-text");

// Función para eliminar acentos
function eliminarAcentos(texto) {
    if (typeof texto !== 'string') return '';
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

// Validación de existencia y correspondencia de arrays
if (
    botonesBuscadorPorNombre && nombreBuscadorPorNombre &&
    cardsCreadas && cardsTexto &&
    botonesBuscadorPorNombre.length === nombreBuscadorPorNombre.length
) {

    for (let i = 0; i < botonesBuscadorPorNombre.length; i++) {
        const boton = botonesBuscadorPorNombre[i];
        const nombreElemento = nombreBuscadorPorNombre[i];

        if (!boton || !nombreElemento) continue;

        boton.onchange = () => {
            try {
                // Si el botón está activado
                if (boton.checked === true) {
                    let textoBuscador = eliminarAcentos((nombreElemento.textContent || "").toLowerCase());

                    // Desmarcar otros botones
                    for (let j = 0; j < botonesBuscadorPorNombre.length; j++) {
                        if (botonesBuscadorPorNombre[j] && i !== j) {
                            botonesBuscadorPorNombre[j].checked = false;
                        }
                    }

                    // Ocultar todas las tarjetas al inicio
                    for (let k = 0; k < cardsCreadas.length; k++) {
                        if (cardsCreadas[k]) {
                            cardsCreadas[k].style.display = "none";
                        }
                    }

                    // Si stock es válido, mostrar solo las tarjetas que coinciden
                    if (Array.isArray(stock) && stock.length > 0) {
                        for (let k = 0; k < cardsTexto.length; k++) {
                            if (!cardsCreadas[k] || !cardsTexto[k]) continue;

                            let textoCard = eliminarAcentos((cardsTexto[k].textContent || "").toLowerCase());

                            let coincide = stock.some(el =>
                                el &&
                                typeof el.nombre === 'string' &&
                                typeof el.categoria === 'string' &&
                                eliminarAcentos(el.nombre.toLowerCase()) === textoCard &&
                                eliminarAcentos(el.categoria.toLowerCase()) === textoBuscador
                            );

                            if (coincide) {
                                cardsCreadas[k].style.display = "flex";
                            }
                        }
                    }

                } else {
                    // Si desmarca, mostrar todas las tarjetas
                    for (let k = 0; k < cardsCreadas.length; k++) {
                        if (cardsCreadas[k]) {
                            cardsCreadas[k].style.display = "flex";
                        }
                    }
                }

            } catch (err) {
                console.error("Error en el buscador por nombre:", err);
            }
        };
    }

} else {
    console.warn("Elementos insuficientes o longitudes inconsistentes en el buscador por nombre.");
}


// BARRA HEADER
let textoBarraFinalHeader = document.querySelectorAll(".textoBarraFinalHeader");

function textoBarra() {
    if (!textoBarraFinalHeader || textoBarraFinalHeader.length === 0) return;

    const total = textoBarraFinalHeader.length;

    for (let i = 0; i < total; i++) {
        const elemento = textoBarraFinalHeader[i];
        if (elemento && elemento.id === "activo") {
            elemento.removeAttribute("id");

            const siguiente = textoBarraFinalHeader[(i + 1) % total];
            if (siguiente) siguiente.id = "activo";

            break; // Solo uno puede tener activo, cortamos el ciclo
        }
    }
}

// Iniciar el ciclo cada 4 segundos
setInterval(textoBarra, 4000);

// BOTÓN CAMBIO DE PÁGINA (DARK MODE)
let botonCambioPagina = document.getElementById("switch");
let body = document.body;
let logos = document.getElementsByClassName("logo");

if (botonCambioPagina) {
    botonCambioPagina.onclick = () => {
        const darkModeActivado = botonCambioPagina.checked === true;

        // Cambiar logos (siempre lo mismo por ahora)
        for (let i = 0; i < logos.length; i++) {
            if (logos[i]) logos[i].src = "../Img/logo.jpg";
        }

        // Alternar modo oscuro
        if (darkModeActivado) {
            body.classList.add("bodyDark");
            guardarStorage("darkMode", "si");
        } else {
            body.classList.remove("bodyDark");
            localStorage.removeItem("darkMode");
        }
    };
} else {
    console.warn("El botón de cambio de página no está disponible.");
}


// BUSCADOR POR PRECIO
function eliminarAcentos(texto) {
    if (typeof texto !== 'string') return '';
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

const botonMin = document.getElementById("min");
const botonMax = document.getElementById("max");
const outputMin = document.getElementById("outputMin");
const outputMax = document.getElementById("outputMax");
const botonAplicarBuscadorPorPrecio = document.getElementById("botonAplicarBuscadorPorPrecio");

if (botonMin && botonMax && outputMin && outputMax) {
    botonMin.oninput = () => {
        outputMin.innerText = `${botonMin.value}`;
    };
    botonMax.oninput = () => {
        outputMax.innerText = `${botonMax.value}`;
    };
}

if (botonAplicarBuscadorPorPrecio && botonMin && botonMax && cardsCreadas && cardsTexto) {
    botonAplicarBuscadorPorPrecio.onclick = () => {
        const precioMin = parseInt(botonMin.value, 10);
        const precioMax = parseInt(botonMax.value, 10);

        if (isNaN(precioMin) || isNaN(precioMax)) {
            Swal.fire({
                icon: 'warning',
                title: 'Valores inválidos',
                text: 'Por favor selecciona un rango de precios válido.'
            });
            return;
        }

        for (let i = 0; i < cardsTexto.length; i++) {
            if (!cardsCreadas[i] || !cardsTexto[i]) continue;

            const palabraClave = eliminarAcentos(cardsTexto[i].textContent.toLowerCase());
            cardsCreadas[i].style.display = "none";

            const coincide = stock.some(el => {
                return (
                    typeof el.nombre === 'string' &&
                    eliminarAcentos(el.nombre.toLowerCase()) === palabraClave &&
                    el.precio >= precioMin &&
                    el.precio <= precioMax
                );
            });

            if (coincide) {
                cardsCreadas[i].style.display = "flex";
            }
        }
    };
} else {
    console.warn("Elementos del buscador por precio no disponibles.");
}

// LINKS A OTRAS SECCIONES (INACTIVOS)
const linksVacios = document.getElementsByClassName("linksVacios");

for (let i = 0; i < linksVacios.length; i++) {
    if (!linksVacios[i]) continue;

    linksVacios[i].onclick = () => {
        Swal.fire({
            title: 'Pronto podrás acceder a estas secciones',
            confirmButtonText: "Aceptar",
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            confirmButtonColor: '#D74E09',
            color: '#FFFFFF',
            background: '#D74E09',
        });
    };
}
