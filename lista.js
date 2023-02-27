var productos;

var lista = [
    { codigo: 'C001', descripcion: 'Zapatos de cuero marrón', precio: 49.99, stock: 10, img: "imagenes/a.jpg" },
    { codigo: 'B002', descripcion: 'Pantalón vaquero negro', precio: 29.99, stock: 25, img: "imagenes/b.jpg" },
    { codigo: 'Z003', descripcion: 'Gafas de sol negras', precio: 19.99, stock: 50, img: "imagenes/c.jpg" },
    { codigo: 'C004', descripcion: 'Botas de piel negras', precio: 79.99, stock: 15, img: "imagenes/d.jpg" },
    { codigo: 'A005', descripcion: 'Camiseta de algodón blanca', precio: 15.99, stock: 50, img: "imagenes/e.jpg" },
    { codigo: 'C006', descripcion: 'Zapatillas de running grises', precio: 39.99, stock: 25, img: "imagenes/f.jpg" },
    { codigo: 'B007', descripcion: 'Chaqueta de cuero marrón', precio: 99.99, stock: 10, img: "imagenes/g.jpg" },
    { codigo: 'A008', descripcion: 'Sudadera con capucha gris', precio: 25.99, stock: 35, img: "imagenes/h.jpg" },
    { codigo: 'C009', descripcion: 'Zapatos de tacón rojos', precio: 49.99, stock: 20, img: "imagenes/a.jpg" },
    { codigo: 'B010', descripcion: 'Vaqueros slim fit azules', precio: 39.99, stock: 30, img: "imagenes/b.jpg" },
    { codigo: 'Z011', descripcion: 'Reloj de pulsera plateado', precio: 49.99, stock: 25, img: "imagenes/c.jpg" },
    { codigo: 'A012', descripcion: 'Camiseta con estampado gráfico', precio: 17.99, stock: 40, img: "imagenes/d.jpg" },
    { codigo: 'C013', descripcion: 'Botines de ante marrón', precio: 59.99, stock: 15, img: "imagenes/e.jpg" },
    { codigo: 'B014', descripcion: 'Pantalones cortos beige', precio: 19.99, stock: 30, img: "imagenes/f.jpg" },
    { codigo: 'A015', descripcion: 'Jersey de lana verde', precio: 45.99, stock: 20, img: "imagenes/g.jpg" },
    { codigo: 'C016', descripcion: 'Sandalias de tacón negro', precio: 24.99, stock: 40, img: "imagenes/h.jpg" },
    { codigo: 'B017', descripcion: 'Pendientes de aro dorados', precio: 14.99, stock: 50, img: "imagenes/a.jpg" },
    { codigo: 'A018', descripcion: 'Cazadora bomber negra', precio: 59.99, stock: 15, img: "imagenes/b.jpg" },
    { codigo: 'Z019', descripcion: 'Pulsera de perlas', precio: 9.99, stock: 50, img: "imagenes/c.jpg" },
    { codigo: 'C020', descripcion: 'Botas de montaña gris oscuro', precio: 89.99, stock: 10, img: "imagenes/d.jpg" },
    { codigo: 'B021', descripcion: 'Falda midi plisada negra', precio: 35.99, stock: 20, img: "imagenes/e.jpg" },
    { codigo: 'A022', descripcion: 'Camisa de lino a rayas', precio: 29.99, stock: 25, img: "imagenes/f.jpg" },
    { codigo: 'C023', descripcion: 'Zapatillas deportivas blancas', precio: 49.99, stock: 20, img: "imagenes/g.jpg" },
    { codigo: 'B024', descripcion: 'Cazadora de cuero negra', precio: 129.99, stock: 10, img: "imagenes/h.jpg" },
    { codigo: 'Z025', descripcion: 'Pendientes de diamantes', precio: 199.99, stock: 5, img: "imagenes/a.jpg" },
    { codigo: 'C026', descripcion: 'Botas de agua verdes', precio: 19.99, stock: 30, img: "imagenes/b.jpg" },
    { codigo: 'A027', descripcion: 'Vestido de verano floral', precio: 39.99, stock: 15, img: "imagenes/c.jpg" },
    { codigo: 'B028', descripcion: 'Jersey de cuello alto gris', precio: 34.99, stock: 20, img: "imagenes/d.jpg" },
    { codigo: 'Z029', descripcion: 'Reloj inteligente negro', precio: 149.99, stock: 5, img: "imagenes/e.jpg" },
    { codigo: 'C030', descripcion: 'Zapatos de tacón dorados', precio: 59.99, stock: 10, img: "imagenes/f.jpg" },
    { codigo: 'A031', descripcion: 'Camiseta de tirantes negra', precio: 9.99, stock: 40, img: "imagenes/g.jpg" },
    { codigo: 'B032', descripcion: 'Pantalones de tela azul marino', precio: 49.99, stock: 15, img: "imagenes/h.jpg" },
    { codigo: 'Z033', descripcion: 'Gafas de sol polarizadas', precio: 29.99, stock: 30, img: "imagenes/a.jpg" },
    { codigo: 'C034', descripcion: 'Botines de cuero marrón oscuro', precio: 79.99, stock: 10, img: "imagenes/b.jpg" },
    { codigo: 'A035', descripcion: 'Blusa de seda blanca', precio: 54.99, stock: 15, img: "imagenes/c.jpg" },
    { codigo: 'B036', descripcion: 'Shorts de mezclilla desgastados', precio: 24.99, stock: 25, img: "imagenes/d.jpg" },
    { codigo: 'Z037', descripcion: 'Collar de plata con colgante', precio: 39.99, stock: 20, img: "imagenes/e.jpg" },
    { codigo: 'C038', descripcion: 'Botas de invierno negras', precio: 99.99, stock: 5, img: "imagenes/f.jpg" },
    { codigo: 'A039', descripcion: 'Jersey de lana con cuello en V', precio: 39.99, stock: 25, img: "imagenes/g.jpg" },
    { codigo: 'B040', descripcion: 'Vestido midi de fiesta rojo', precio: 79.99, stock: 10, img: "imagenes/h.jpg" },
    { codigo: 'Z041', descripcion: 'Pendientes de aro plateados', precio: 19.99, stock: 30, img: "imagenes/a.jpg" },
    { codigo: 'C042', descripcion: 'Botas de cuero negro', precio: 109.99, stock: 10, img: "imagenes/b.jpg" },
    { codigo: 'A043', descripcion: 'Blusa de encaje beige', precio: 29.99, stock: 20, img: "imagenes/c.jpg" },
    { codigo: 'B044', descripcion: 'Pantalón chino gris', precio: 34.99, stock: 30, img: "imagenes/d.jpg" },
    { codigo: 'Z045', descripcion: 'Reloj de pulsera dorado', precio: 69.99, stock: 15, img: "imagenes/e.jpg" },
    { codigo: 'B046', descripcion: 'Sudadera con capucha gris', precio: 39.99, stock: 15, img: "imagenes/f.jpg" },
    { codigo: 'Z047', descripcion: 'Anillo de compromiso de diamante', precio: 899.99, stock: 2, img: "imagenes/g.jpg" },
    { codigo: 'C048', descripcion: 'Botines de ante marrón', precio: 89.99, stock: 10, img: "imagenes/h.jpg" },
    { codigo: 'A049', descripcion: 'Pantalones de cuero negro', precio: 64.99, stock: 15, img: "imagenes/a.jpg" },
    { codigo: 'B050', descripcion: 'Jersey de lana con capucha', precio: 49.99, stock: 20, img: "imagenes/b.jpg" },
    { codigo: 'Z051', descripcion: 'Pulsera de plata con colgante', precio: 29.99, stock: 30, img: "imagenes/c.jpg" },
    { codigo: 'C052', descripcion: 'Botas de invierno marrones', precio: 109.99, stock: 5, img: "imagenes/d.jpg" },
    { codigo: 'A053', descripcion: 'Vestido midi con estampado de flores', precio: 69.99, stock: 10, img: "imagenes/e.jpg" },
    { codigo: 'B054', descripcion: 'Sudadera con capucha negra', precio: 39.99, stock: 20, img: "imagenes/f.jpg" },
    { codigo: 'Z055', descripcion: 'Reloj de pulsera plateado', precio: 69.99, stock: 15, img: "imagenes/g.jpg" },
    { codigo: 'C056', descripcion: 'Botas de senderismo', precio: 129.99, stock: 5, img: "imagenes/h.jpg" },
    { codigo: 'A057', descripcion: 'Blusa de seda rosa', precio: 54.99, stock: 15, img: "imagenes/a.jpg" },
    { codigo: 'B058', descripcion: 'Pantalones de chándal grises', precio: 24.99, stock: 25, img: "imagenes/b.jpg" },
    { codigo: 'Z059', descripcion: 'Pendientes de perlas', precio: 29.99, stock: 20, img: "imagenes/c.jpg" },
    { codigo: 'C060', descripcion: 'Botas de ante negras', precio: 99.99, stock: 10, img: "imagenes/d.jpg" },
    { codigo: 'A061', descripcion: 'Vestido de fiesta largo negro', precio: 129.99, stock: 5, img: "imagenes/e.jpg" },
    { codigo: 'B062', descripcion: 'Jersey de lana con cuello redondo', precio: 44.99, stock: 20, img: "imagenes/f.jpg" },
    { codigo: 'Z063', descripcion: 'Collar de oro con diamantes', precio: 299.99, stock: 3, img: "imagenes/g.jpg" },
    { codigo: 'C064', descripcion: 'Botines de ante negros', precio: 89.99, stock: 10, img: "imagenes/h.jpg" },
    { codigo: 'A065', descripcion: 'Camiseta con estampado de leopardo', precio: 19.99, stock: 30, img: "imagenes/a.jpg" },
    { codigo: 'B066', descripcion: 'Pantalones vaqueros negros', precio: 49.99, stock: 15, img: "imagenes/b.jpg" },
    { codigo: 'Z067', descripcion: 'Gafas de sol de aviador', precio: 39.99, stock: 25, img: "imagenes/c.jpg" },
    { codigo: 'C068', descripcion: 'Zapatillas de deporte blancas', precio: 59.99, stock: 20, img: "imagenes/d.jpg" },
    { codigo: 'C069', descripcion: 'Zapatillas deportivas negras', precio: 59.99, stock: 20, img: "imagenes/e.jpg" },
    { codigo: 'Z070', descripcion: 'Pulsera de cuero trenzado marrón', precio: 19.99, stock: 30, img: "imagenes/f.jpg" }
];

//-----funciones de la lista--------//

function añadirALista(cod, desc, prec, st, im, callback) {

    let esta = false;

    productos.forEach(e => {
        if (e.codigo == cod) esta = true;
    })

    if (esta) {alert("El producto ya está en la lista, actualiza el stock");
    return;}

    //Hasta aquí, la función comprueba qeu el código identificativo del producto que se intenta añadir no existe, 
    //en caso contrario, sale de la función

    //Si el producto es nuevo, lo añade al final de la lista y acutaliza el item de LS productos. 
    //Finalmente, ejecuta un callback en caso de haberse pasado como argumento

    productos.push({
        codigo: cod,
        descripcion: desc,
        precio: prec,
        stock: st,
        img: im
    })

    let productosString = JSON.stringify(productos);
    localStorage.setItem('productos', productosString);

    if (callback==undefined) return;
    else callback();



}


function eliminarDeLista(cod, callback) {

    //Busca la posción del prodcuto en la lista, lo elimina y acutaliza el item de LS productos. 
    //Finalmente, ejecuta un callback en caso de haberse pasado como argumento

        
    let cont = 0;
    let fin;

    productos.filter(e => {
        cont++;
        if (e.codigo == cod) fin = cont;
    })

    productos.splice(fin - 1, 1);

    let productosString = JSON.stringify(productos);
    localStorage.setItem('productos', productosString);
    
    
    if (callback==undefined) return;
    else callback();

}