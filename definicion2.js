const tablaLista = document.getElementById("tablaListado");

window.onload = function () {

    //Si no existe un item de localstorage productos, (por ejemplo, la primera vez que se entra a la página) asigna la lista original a la variable 
    //productos (con la que trabjaan todas las funciones), y crea el item en base a esta
    if (localStorage.getItem('productos') == undefined) {

        productos = lista;

        let productosString = JSON.stringify(productos);
        localStorage.setItem('productos', productosString);
    }
    
    //en caso contrario, asigna a la variable productos la almacenada en el item de LS productos
    else {let productosString = localStorage.getItem('productos');
    productos = JSON.parse(productosString);}


    //y crea el listado

    crearListado();

}


function crearListado() {

    tablaLista.innerHTML = "";

    let fila = document.createElement("tr");
    let celda1 = document.createElement("td");
    let celda2 = document.createElement("td");
    let celda3 = document.createElement("td");
    let celda4 = document.createElement("td");
    let celda5 = document.createElement("td");


    celda1.textContent = "codigo";
    celda2.textContent = "descripcion";
    celda3.textContent = "precio";
    celda4.textContent = "stock";
    celda5.textContent = "Imagen"

    tablaLista.append(fila);
    fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda4);
    fila.appendChild(celda5);


    productos.forEach(e => {

        let fila = document.createElement("tr");
        let celda1 = document.createElement("td");
        let celda2 = document.createElement("td");
        let celda3 = document.createElement("td");
        let celda4 = document.createElement("td");
        let celda5 = document.createElement("td");
        let celda6 = document.createElement("td");

        celda1.textContent = e.codigo;
        celda2.innerHTML = e.descripcion + "<button onclick='modificarDesc(\"" + e.codigo + "\")'>Mod</button>";
        celda2.setAttribute("id", "desc_" + e.codigo);
        celda3.innerHTML = e.precio + "<button onclick='modificarPrec(\"" + e.codigo + "\")'>Mod</button>";
        celda3.setAttribute("id", "prec_" + e.codigo);
        celda4.innerHTML = e.stock + "<button onclick='modificarSto(\"" + e.codigo + "\")'>Mod</button>";
        celda4.setAttribute("id", "sto_" + e.codigo);
        celda5.innerHTML = ("<img src='" + e.img + "' width='50px'>");
        celda6.innerHTML = ("<button onclick='eliminarDeLista(\"" + e.codigo + "\", crearListado)'>Eliminar</button>");

        //Asigna un id único a cada celda, en función del codigo del producto que representa. Y le asigna un botón para modificar cada campo individualmente


        tablaLista.append(fila);
        fila.appendChild(celda1);
        fila.appendChild(celda2);
        fila.appendChild(celda3);
        fila.appendChild(celda4);
        fila.appendChild(celda5);
        fila.appendChild(celda6);

    });
}


//_----------------------funciones de modificación de datos------------------------//

function modificarDesc(id) {
    let elmod = document.getElementById("desc_" + id);
    elmod.innerHTML = ("<input type='text' id='actDesc'><button onclick='actualizarDesc(\"" + id + "\")'>Ok</button>");
    //modifica el contenido de la celda descripción (en este caso, los demás funcionan igual.) para mostrar un input donde rellenar el dato nuevo
    //y un botón de confirmación que lleva a la siguiente función...
}

function actualizarDesc(id) {
    //Coge el valor del input, hace sus comprobaciones,...
    let actualizado = document.getElementById("actDesc").value;

    if (actualizado == "") {
        alert("La descripción no puede estar vacía");
    }
    else {

        //busca el elemento en fucnión del código y le cambia la descripción(en este caso.)
        productos.forEach(e => {

            if (e.codigo == id) e.descripcion = actualizado;

        })
    }

    //guarda productos en localstorage

    let productosString = JSON.stringify(productos);
    localStorage.setItem('productos', productosString);

    //y vuelve a crear el listado, dando la impresión de que se ha cambiado solamente el dato.

    crearListado();
}

function modificarPrec(id) {
    let elmod = document.getElementById("prec_" + id);
    elmod.innerHTML = ("<input type='text' id='actPrec'><button onclick='actualizarPrec(\"" + id + "\")'>Ok</button>");
}

function actualizarPrec(id) {
    let actualizado = document.getElementById("actPrec").value;

    if (!actualizado.match(/^[0-9]+$/)) {
        alert("El valor introducido debe ser numérico");
    }
    else {
        productos.forEach(e => {

            if (e.codigo == id) e.precio = actualizado;

        })
    }

    let productosString = JSON.stringify(productos);
    localStorage.setItem('productos', productosString);

    crearListado();
}

function modificarSto(id) {
    let elmod = document.getElementById("sto_" + id);
    elmod.innerHTML = ("<input type='text' id='actSto'><button onclick='actualizarSto(\"" + id + "\")'>Ok</button>");
}

function actualizarSto(id) {
    let actualizado = document.getElementById("actSto").value;

    if (!actualizado.match(/^[0-9]+$/)) {
        alert("El valor introducido debe ser numérico");
    }

    else {

        productos.forEach(e => {

            if (e.codigo == id) e.stock = actualizado;

        })
    }

    let productosString = JSON.stringify(productos);
    localStorage.setItem('productos', productosString);

    crearListado();
}

//_----------------------funciones de modificación de datos------------------------//


function añadirProducto() {

    //simplemente recoge los datos del formulario de añadir y llama a la función de la lista, pasando crearListado como callback para 
    //que se actualice en el momento.

    let c = document.getElementById("añadirCodigo").value;
    let d = document.getElementById("añadirDescripcion").value;
    let p = document.getElementById("añadirPrecio").value;
    let s = document.getElementById("añadirStock").value;
    let i = document.getElementById("añadirImagen").value;


    añadirALista(c, d, p, s, i, crearListado);

}


