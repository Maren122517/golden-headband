class Prendas {
    constructor(nombre, tipo, talla, categoria, precio, cantidad, imagen) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.talla = talla;
        this.categoria = categoria;
        this.precio = precio;
        this.cantidad = cantidad;
        this.cantidad > 0 ? this.stock = "si" : this.stock = "no";
        this.imagen = imagen;
        
    }
}

const Camisa1 = new Prendas("Camisa 1", "manga corta", "xxl", "camisa", 1500, 25,"../Img/camisa1.jpeg");
const remeraAzul = new Prendas("remera azul", "manga corta", "xl", "remeras", 2500, 42, "https://http2.mlstatic.com/D_NQ_NP_648987-MLA40813897195_022020-O.jpg");
const remeraRoja = new Prendas("remera roja", "manga larga", "m", "remeras", 1800, 35, "https://http2.mlstatic.com/D_NQ_NP_629947-MLA48096395323_112021-O.jpg")
const jeanNegro = new Prendas("jean negro", "al cuerpo", "40", "jeans", 4000, 33, "https://www.distritomoda.com.ar/sites/default/files/styles/producto_interior/public/imagenes/2019_-_jean_negro_chupin_con_roturas_1599828487.jpeg?itok=PRopPe7q");
const jeanCeleste = new Prendas("jean celeste", "holgado", "42", "jeans", 6000, 0,"https://static.dafiti.com.ar/p/fac-town-6866-439302-1-product.jpg");
const pantalonGamuza = new Prendas("pantalon de gamuza", "3/4", "38 y 1/2", "pantalones", 1200, 50, "https://s.cornershopapp.com/product-images/4119026.jpg?versionId=kEmIKOB8HpGATEltPlKoMci9bTvOw8AU");
const pantalonLargo = new Prendas("pantalon largo", "pantalon", "40", "pantalones", 8000, 81,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePYRFKqNztclkW5q7flzOBQ8vlxZdZ3U4EvOW-Miav_6s95_Fs1ZmUV6UwBPWD4E0Ezo&usqp=CAU");
const bermuda = new Prendas("bermuda", "pantalon corto", "40", "pantalones", 3500, 25,"https://d368r8jqz0fwvm.cloudfront.net/1695-product_lg/bermuda-de-hombre-ilheus.jpg")
const poleraBeige = new Prendas("polera beige", "manga larga", "xl", "poleras", 7500, 40,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0LXbJW_Y9j8Q3qz96g6QnljFDaiZg4uxguQ&usqp=CAU");


const stock = [
    remeraGris,
    remeraAzul,
    remeraRoja,
    jeanNegro,
    jeanCeleste,
    pantalonGamuza,
    pantalonLargo,
    bermuda,
    poleraBeige
];







const usuarios = [
 {
        nombre: "nano",
        edad: "29",
        mail: "mariano.p.z@hotmail.com",
        contraseña: "1234"  
  },
 {
      nombre: "stefano",
      edad: "xx",
      mail: "xx",
      contraseña: "1234"
  },
  {
      nombre: "david",
      edad: "xx",
      mail: "xx",
      contraseña: "1234"
  }
]
