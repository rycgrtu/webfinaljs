
var listaP=productos;
var productosString;


function parsearLS(callback) {



    productosString = localStorage.getItem('productos');
    productos = JSON.parse(productosString);


    if (callback==undefined) return;
    else callback();

}


function strLS(){   

  productosString = JSON.stringify(productos);
  localStorage.setItem('productos', productosString);

}



function reiniciarLS(callback){

  productos=listaP;
  
  if (callback==undefined) return;
  else callback();
  
}