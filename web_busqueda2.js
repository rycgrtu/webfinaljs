
const buscarInput = document.querySelector('#busqueda');
const opt = document.querySelector('#op_codigo');
const opt2 = document.querySelector('#op_descripcion');
const listaSugerencias = document.querySelector('#sugerencias');

const tCarritoOriginal = '<tr><td>producto</td><td>precio unitario</td><td>cantidad</td><td>precio total</td><td id="celdaTotal" style="border: solid 5px black;"></td></tr>';

var producto_seleccionado;

var carrito = [];

document.addEventListener("keydown", function(event) {

    if (event.ctrlKey && event.key === " ")
    {
        window.open("definicion2.html")
        event.preventDefault();
    }
    
});


window.onload = function () {
    //Si no existe un item de localstorage productos, (por ejemplo, la primera vez que se entra a la página) asigna la lista original a la variable 
    //productos (con la que trabjaan todas las funciones), y crea el item en base a esta
    if (localStorage.getItem('productos') == undefined) {

        productos = lista;

        let productosString = JSON.stringify(productos);
        localStorage.setItem('productos', productosString);
    }

    //en caso contrario, asigna a la variable productos la almacenada en el item de LS productos

    else {
        let productosString = localStorage.getItem('productos');
        productos = JSON.parse(productosString);
    }

    //Si existe el item carrito(porque se haya quedado el carrito sin pagar) se recoge en la variable carrito...
    if (localStorage.getItem('carrito') != null) {

        let carritoString = localStorage.getItem('carrito');
        carrito = JSON.parse(carritoString);

        //...se asigna a la tabla del carrito el item creado para la tabla (tcarrito), y se desactiva la propiedad disabled por defecto del botón pagar
        document.getElementById("listaCarrito").innerHTML = localStorage.getItem('tcarrito');

        document.getElementById("botonPago").disabled = false;

    }


}



buscarInput.addEventListener('input', busqueda);
opt.addEventListener('change', busqueda);
opt2.addEventListener('change', busqueda);

function busqueda() {
    const textoBuscado = buscarInput.value;
    if (textoBuscado.trim().length > 0) {
        getSugerencias(textoBuscado)
            .then(mostrarSugerencias)
            .catch(gestionarError);
    } else {
        limpiarSugerencias();
    }
}

function getSugerencias(textoBuscado) {
    return new Promise((resolve, reject) => {
        // Peticion asincrona para obtener sugerencias y resolver la promesa con
        // los resultados. Aqui se devuelven sugerencias estáticas.
        const sugerencias_codigo = productos.map(e => e.codigo);
        const sugerencias_descripcion = productos.map(e => e.descripcion);
        let sugerenciasFiltradas = "";
        if (document.getElementById('op_codigo').checked) {
            sugerenciasFiltradas = sugerencias_codigo.filter(sugerencia =>
                sugerencia.toLowerCase().includes(textoBuscado.toLowerCase())
            );
        }
        else if (document.getElementById('op_descripcion').checked) {
            sugerenciasFiltradas = sugerencias_descripcion.filter(sugerencia =>
                sugerencia.toLowerCase().includes(textoBuscado.toLowerCase())
            );
        }
        resolve(sugerenciasFiltradas);
    });
}

function mostrarSugerencias(sugerencias) {
    listaSugerencias.innerHTML = '';
    sugerencias.forEach(sugerencia => {
        const li = document.createElement('li');
        li.textContent = sugerencia;
        li.setAttribute("onclick", "seleccionar_producto(this.textContent)");
        li.setAttribute("onmouseover", " mostrarImagen(this.textContent); this.style.backgroundColor='gray'; this.style.cursor= 'pointer    '");
        li.setAttribute("onmouseout", "this.style.backgroundColor='transparent'; document.getElementById('imgProd').setAttribute('src', '')")


        listaSugerencias.appendChild(li);
    });
}

function mostrarImagen(sugerencia) {


    //función que se ejecuta en evento mouseover en productos sugeridos
    //asigna a variable prod el parametro pasado(código o descripcion) y le asigna a elemento imgProd la imagen del prodcuto

    let prod = productos.filter(e => e.codigo == sugerencia)[0];

    if (prod == undefined) prod = productos.filter(e => e.descripcion == sugerencia)[0];

    document.getElementById("imgProd").setAttribute("src", prod.img);
    document.getElementById("imgProd").setAttribute("width", "400px")

}

function seleccionar_producto(sugerencia) {

    //asigna a la variable globar producto_seleccionado el producto con el código o descripción seleccionado
    producto_seleccionado = productos.filter(e => e.codigo == sugerencia)[0];
    if (producto_seleccionado == undefined) producto_seleccionado = productos.filter(e => e.descripcion == sugerencia)[0];

    //muestra el div de la cantidad y la información del producto seleccionado
    document.getElementById("div_cantidad").style.display = "block";
    document.getElementById("inf_prod").textContent =
        "Has seleccionado " + producto_seleccionado.descripcion + ", que cuesta: " + producto_seleccionado.precio + "€.";


}

function comprobar_disponibilidad(cantidad) {

    //función que comprueba que hay disponibilidad en la propiedad stock de la variable global producto_seleccionado

    if (cantidad > producto_seleccionado.stock) return false

    return true;

    //devuelve true si hay, false si no
}

function seleccionar_cantidad() {

    //obtiene el elemento cantidad pasado como input en el html 

    var cant = document.getElementById("input_cantidad");


    //comprueba que sea un número mediante expr regular, alerta si no lo cumple
    if (!cant.value.match(/^[0-9]+$/)) {
        alert("Debes introducir un número en el campo cantidad");
        return;
    }

    if (!comprobar_disponibilidad(cant.value)) {

        //si no hay disponibilidad filtra la lista para obtener una lista con los productos cuyo codigo comienza por la misma letra que producto_Seleccionado

        let similares = productos.filter(e => e.codigo.charAt(0) == producto_seleccionado.codigo.charAt(0));

        //muestra en pantalla que no hay stock 
        document.getElementById("precioLinea").textContent = "No hay stock sufiente de este producto. Busca en \"Sugerencias\" productos similaresº";


        let lista = document.createElement("ul");

        //reinicia la lista de sugerencias

        document.getElementById("sugerencias").innerHTML = "";
        document.getElementById("sugerencias").appendChild(lista)

        similares.forEach(e => {

            //añade a la lista de sugerencias la descripción de los porductos similares(misma letra inicial en código)

            let lis = document.createElement('li');
            lis.textContent = e.descripcion;
            lis.setAttribute("onclick", "seleccionar_producto(this.textContent)")
            lis.setAttribute("onmouseover", "this.style.backgroundColor='gray'")
            lis.setAttribute("onmouseout", "this.style.backgroundColor='transparent'")


            document.getElementById("sugerencias").append(lis);

        });



    }
    else {

        //si si hay disponibilidad muestra el precio unitario y el total y activa el botón de añadir al carrito

        let precioLinea = producto_seleccionado.precio * cant.value;
        document.getElementById("precioLinea").textContent = "Has seleccionado " + cant.value + " productos, por un total de " + precioLinea + "€.";

        document.getElementById("botonCarrito").disabled = false;

    }


}

function añadir_carrito() {

    //crea un array vacio donde irá el código del producto, el precio/u y la cantidad (este array valdrá para obtener los datos y se incluirá al array global carrito)

    let a = [];
    var cant = document.getElementById("input_cantidad");

    //crea un array filtrando los arrays dentro del array global carrito...
    let esta = carrito.filter(e => e[0].match(producto_seleccionado.codigo));

    //si este array no queda vacío, significa que el producto ya se encuentra en el carrito, con lo que en vez de añadir un nuevo array a carrito y mostrar una
    //linea en el html, actualiza ambos datos. También comprueba aquí la disponibildad.
    if (esta.length > 0) {
        carrito.forEach(e => {

            if (e[0].match(producto_seleccionado.codigo)) {

                var cantidadActualizada = Number(e[1]) + Number(cant.value);

                if (!comprobar_disponibilidad(cantidadActualizada)) {

                    alert("No hay suficiente disponibilidad");
                }

                else {
                    e[1] = cantidadActualizada;


                    document.getElementById("cant_" + producto_seleccionado.codigo).textContent = e[1];
                    document.getElementById("total_" + producto_seleccionado.codigo).textContent = e[1] * producto_seleccionado.precio;
                    document.getElementById("celdaTotal").textContent = carrito.reduce((a, b) => a + (Number(b[2]) * Number(b[1])), 0);
                }

            }

        })
    }

    else {

        //si el array esta queda vacio, significa que el producto aún no está en el carrito, añade un nuevo array al array carrito y muestra en el html una 
        //nueva línea con los datos
        a.push(producto_seleccionado.codigo);
        a.push(Number(cant.value));
        a.push(producto_seleccionado.precio);

        carrito.push(a);

        let listaCarrito = document.getElementById("listaCarrito");

        let filaCarrito = document.createElement("tr");
        let celdaCarrito1 = document.createElement("td");
        let celdaCarrito2 = document.createElement("td");
        let celdaCarrito3 = document.createElement("td");
        let celdaCarrito4 = document.createElement("td");
        let celdaCarrito5 = document.createElement("td");

        celdaCarrito1.textContent = producto_seleccionado.descripcion;
        celdaCarrito2.textContent = producto_seleccionado.precio;
        celdaCarrito3.textContent = cant.value;
        celdaCarrito3.setAttribute("id", "cant_" + producto_seleccionado.codigo)
        celdaCarrito4.textContent = cant.value * producto_seleccionado.precio;
        celdaCarrito4.setAttribute("id", "total_" + producto_seleccionado.codigo)
        //se le asigna un id a las celdas de cantidad y de precio total para actualizarlas en caso de añadir mas unidades del mismo producto.

        listaCarrito.append(filaCarrito);
        filaCarrito.appendChild(celdaCarrito1);
        filaCarrito.appendChild(celdaCarrito2);
        filaCarrito.appendChild(celdaCarrito3);
        filaCarrito.appendChild(celdaCarrito4);



        document.getElementById("celdaTotal").textContent = carrito.reduce((a, b) => a + (Number(b[2]) * Number(b[1])), 0);

        document.getElementById("botonPago").disabled = false;


    }


    //Guarda items en el localstorage para carrito y para el html de la tabla

    let carritoString = JSON.stringify(carrito);
    localStorage.setItem('carrito', carritoString);


    localStorage.setItem('tcarrito', document.getElementById("listaCarrito").innerHTML);


}

function actualizar_stock() {

    let error = true;

    carrito.forEach(e => {

        productos.forEach(a => {

            if (a.codigo == e[0]) a.stock = a.stock - e[1];

        })
    })

    let productosString = JSON.stringify(productos);
    localStorage.setItem('productos', productosString);

    if (error) return false;

    return true;

}

function pagar(callback) {

    let copiaSeguridadStr = JSON.stringify(productos);


    let error = false;
    var totalReduce = carrito.reduce((a, b) => a + (Number(b[2]) * Number(b[1])), 0);
    if (error) totalReduce = -1;


    //Ejecuta el callback, que será para comprobar stock, agradece la compra, reinicia el carrito y los items de LS de carrito y tabla del carrito y 
    //redirige al usuario a otra página

    var call = callback();

    if (!call || totalReduce < 0 || totalReduce == NaN) {

        localStorage.setItem('productos', copiaSeguridadStr);

        alert("error. A amazon")
        
        window.location.replace('https://www.amazon.com/');
    
     

    }

    else {

        alert("Gracias por la compra. Has pagado en total " + totalReduce + "€.")

        carrito = [];

        let carritoString = JSON.stringify(carrito);
        localStorage.setItem('carrito', carritoString);


        localStorage.setItem('tcarrito', tCarritoOriginal);


        window.location.href = "ipse.html";

    }



}

function gestionarError(error) {
    console.error(error);
}

function limpiarSugerencias() {
    listaSugerencias.innerHTML = '';
}

