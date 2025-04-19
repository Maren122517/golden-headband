class Prendas {
    constructor(nombre, tipo, talla, categoria, precio, cantidad, imagen) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.talle = talla;
        this.categoria = categoria;
        this.precio = precio;
        this.cantidad = cantidad;
        this.cantidad > 0 ? this.stock = "si" : this.stock = "no";
        this.imagen = imagen;
        
    }
}

const remeraGris = new Prendas("remera gris", "manga corta", "xxl", "remeras", 1500, 25,"https://www.segutecnica.com/images/000000000001756537023remera-gris-segutecnica.png");
const remeraAzul = new Prendas("remera azul", "manga corta", "xl", "remeras", 2500, 42, "https://http2.mlstatic.com/D_NQ_NP_648987-MLA40813897195_022020-O.jpg");
const remeraRoja = new Prendas("remera roja", "manga larga", "m", "remeras", 1800, 35, "https://http2.mlstatic.com/D_NQ_NP_629947-MLA48096395323_112021-O.jpg")
const remeraNegra = new Prendas("remera negra", "manga corta", "xxl", "remeras", 1500, 30,"https://static.vecteezy.com/system/resources/thumbnails/049/223/501/small_2x/black-t-shirt-mock-up-ai-generative-free-png.png");
const remeraBlanca = new Prendas("remera blanca", "manga corta", "xxl", "remeras", 1500, 50,"https://static.vecteezy.com/system/resources/thumbnails/008/534/684/small/white-t-shirt-mockup-cutout-file-png.png");

const jeanNegro = new Prendas("jean negro", "al cuerpo", "40", "jeans", 4000, 33, "https://w7.pngwing.com/pngs/863/837/png-transparent-slim-fit-pants-clothing-fashion-jeans-western-style-trousers-zipper-fashion-black.png");
const jeanCeleste = new Prendas("jean celeste", "holgado", "42", "jeans", 6000, 44,"https://pieers.com/media/catalog/product/cache/334416996b13b45056f516cf8b55981c/p/e/ped03134czz-1.jpg");
const jeanBeige = new Prendas("jean beige", "holgado", "42", "jeans", 6000, 64,"https://w7.pngwing.com/pngs/478/600/png-transparent-jeans-khaki-jeans-beige-chino-clothing-thumbnail.png");
const jeanAzul = new Prendas("jean azul", "holgado", "42", "jeans", 6000, 16,"https://w7.pngwing.com/pngs/370/237/png-transparent-pants-navy-blue-jeans-t-shirt-jeans-pocket-zipper-blue-navy-blue.png");
const jeanBlanco = new Prendas("jean blanco", "holgado", "42", "jeans", 6000, 34,"https://w7.pngwing.com/pngs/303/849/png-transparent-jeans-waist-pants-jeans-white-active-pants-binnenbeenlengte.png");

const pantalonGamuza = new Prendas("pantalon de gamuza", "3/4", "38 y 1/2", "pantalones", 1200, 50, "https://s.cornershopapp.com/product-images/4119026.jpg?versionId=kEmIKOB8HpGATEltPlKoMci9bTvOw8AU");
const pantalonLargo = new Prendas("pantalon largo", "pantalon", "40", "pantalones", 8000, 81,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePYRFKqNztclkW5q7flzOBQ8vlxZdZ3U4EvOW-Miav_6s95_Fs1ZmUV6UwBPWD4E0Ezo&usqp=CAU");
const pantalonJogger = new Prendas("pantalon jogger", "pantalon", "40", "pantalones", 8000, 13,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJk1XYn3k_UUTNWFBaXMcMeKdJVvN1cVx1hw&s");
const pantalonCamo = new Prendas("pantalon camo", "pantalon", "40", "pantalones", 8000, 25,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRClOGQYvyzw6ehY3aqOvPsQRFmw_XvZlmHrA&s");
const pantalonVestir = new Prendas("pantalon vestir", "pantalon", "40", "pantalones", 8000, 49,"https://png.pngtree.com/png-vector/20240824/ourlarge/pngtree-3d-dress-pant-for-man-png-image_13603787.png");

const bermuda = new Prendas("bermuda", "pantalon corto", "40", "pantalones", 3500, 25,"https://d368r8jqz0fwvm.cloudfront.net/1695-product_lg/bermuda-de-hombre-ilheus.jpg")
const bermudaCargo = new Prendas("bermuda cargo", "pantalon corto", "40", "pantalones", 3500, 15,"https://w7.pngwing.com/pngs/549/396/png-transparent-bermuda-shorts-belt-khaki-cargo-pants-belt-fashion-active-shorts-norway.png")
const bermudaMezclilla = new Prendas("bermuda mezclilla", "pantalon corto", "40", "pantalones", 3500, 5,"https://png.pngtree.com/png-vector/20201129/ourmid/pngtree-denim-shorts-png-image_2400987.jpg")
const bermudaDeportiva = new Prendas("bermuda deportiva", "pantalon corto", "40", "pantalones", 3500, 28,"https://w7.pngwing.com/pngs/446/1003/png-transparent-shorts-football-sport-white-netshoes-football-white-sport-sporting-goods.png")
const bermudaSastre = new Prendas("bermuda sastre", "pantalon corto", "40", "pantalones", 3500, 39,"https://phantom-telva.unidadeditorial.es/17d51279d6cf3febdac79fd05f0c19fd/assets/multimedia/imagenes/2020/04/07/15862561587838.png")

const poleraBeige = new Prendas("polera beige", "manga larga", "xl", "poleras", 7500, 40,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqCamkKYRMwiPcwCunEzToW8QWrdAIrLDAVQ&s");
const poleraPolo = new Prendas("polera tipo polo", "manga larga", "xl", "poleras", 7500, 87,"https://w7.pngwing.com/pngs/961/152/png-transparent-t-shirt-polo-shirt-sleeve-red-t-shirt-red-and-black-polo-shirt-tshirt-fashion-cloth-thumbnail.png");
const poleraCuelloV = new Prendas("polera cuello en v", "manga larga", "xl", "poleras", 7500, 68,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYYokTmHCkwrzT4GUlxrFVv-wyPbOu0q8msQ&s");
const poleraOversized = new Prendas("polera oversized", "manga larga", "xl", "poleras", 7500, 98,"https://tavostore.com/cdn/shop/products/IMG_5027.jpg?v=1682225532");
const poleraSinMangas = new Prendas("polera sin mangas", "manga larga", "xl", "poleras", 7500, 62,"https://sparta.cl/media/catalog/product/p/o/polera-sin-mangas-hombre-nike-sportswear-negra-trasera.png?quality=80&bg-color=255,255,255&fit=bounds&height=550&width=600&canvas=600:550");


const stock = [
    remeraGris,
    remeraAzul,
    remeraRoja,
    remeraNegra,
    remeraBlanca,
    jeanNegro,
    jeanCeleste,
    jeanBeige,
    jeanAzul,
    jeanBlanco,
    pantalonGamuza,
    pantalonLargo,
    pantalonJogger,
    pantalonCamo,
    pantalonVestir,
    bermuda,
    bermudaCargo,
    bermudaMezclilla,
    bermudaDeportiva,
    bermudaSastre,
    poleraBeige,
    poleraPolo,
    poleraCuelloV,
    poleraOversized,
    poleraSinMangas
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
