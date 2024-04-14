/*Selectores */
const tbody = document.querySelector("#tbody_table");
const btnAgregar = document.querySelector("#btn-agreagar");
const btnOpenDrawer = document.querySelector("#btnOpenDrawer");
const tituloDrawer = document.querySelector("#offcanvasNavbarLabel");
const btnClose = document.querySelector("#btnClose")

let producto;

/*Eventos */
btnClose.addEventListener("click", ()=>{
  producto = undefined;
  document.querySelector("#form-agregar").reset();
})


btnAgregar.addEventListener("click", (event) => {
  //PreventDefault() previene los eventos que vienen por defecto
  event.preventDefault();

  //Si hay un producto guardado quiere decir que estamos editando

  //De lo contrario estamos agregando
  agregarProductos();
  console.log(event);
});

tbody.addEventListener("click", (event) => {
  console.log("diste click en tbody ", event.target);
  //Validamos que al elemento que se dio click sea el boton actualizar
  if (event.target.classList.contains("edit_product")) {
    //Obtenemos el atributo data-id que contiene el id del producto
    const id = event.target.getAttribute("data-id");
    //Validamos que si exista un id, si existe llamamos a la funcion editaproc¡duco
    if (id) cargarDrawer(id);
    return
  }

    //Si al elemento al que le dimos click contiene la clase delete
  if(event.target.classList.contains("delete_product")){
    const id = event.target.getAttribute("data-id");
    eliminarProducto(id)
  }
});

/*Lista para guardar todos lo productos */
let listaProductos = [
  {
    id: Date.now(),
    nombre: "Pastas",
    precio: "5",
    cantidad: 10,
    imagen:
      "https://recetinas.com/wp-content/uploads/2018/05/espaguetis-a-la-napolitana.jpg",
    categoria: "carbohidratos",
  },
];

/*FUncion para listar los productos y listarlos en la tabla */
function mostrarProductos() {
  //Limpiar la tabla
  tbody.innerHTML = "";

  /*Recorro la lista con foreach*/
  //DOnde producto es el que se esta iterando en el momento
  //y el index es el indice de la lista de ese item

  listaProductos.forEach((producto, index) => {
    //Desestructurar el objeto que se esta recorriendo
    const { cantidad, categoria, id, imagen, nombre, precio } = producto;
    //Dar formato al precio
    const precioFormat = Number(precio).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    const imgDefault =
      "https://cdn-icons-png.flaticon.com/512/4192/4192361.png";

    //Modifico el HTML del tbody
    tbody.innerHTML += `
    <tr>
    
        <td>${index + 1}</td>
        <td>
        <img 
            class = "rounded-circle"
            src = "${imagen || imgDefault} "
            alt = "Imagen producto"
            width = "50px
            height = "50px"
            
        />
        
        </td>
        <td>${nombre}</td>
        <td>${precioFormat}</td>
        <td>${categoria}</td>
        <td>${cantidad}</td>

        <td>
        <button 
            class="btn btn-primary edit_product"
            data-id ="${id}"
        >
            <i class="bx bxs-edit edit_product" style = "pointer-events:none;"></i>
        </button>

        <button 
            class="btn btn-danger delete_product"
            data-id = "${id}"  
        >
            <i class="bx bxs-trash style = "pointer-events:none;""></i>
        </button>
        </td>
    </tr>
    `;
  });
}

//Funcion para agregar un producto
function agregarProductos() {
  if (!producto) {
    //Modificar el texto al boton
    btnAgregar.textContent = "Agregar Producto";

    //Modificar el titulo del drawer
    tituloDrawer.textContent = "Agregar producto";
  }

  //Selectores, los inputs y al mismo tiempo acceder al valor
  const nombreText = document.querySelector("#nombre_producto").value;
  const cantidadText = document.querySelector("#cantidad").value;
  const precioText = document.querySelector("#precio").value;
  const imagenText = document.querySelector("#imagen").value;
  const categoriaText = document.querySelector("#categoria").value;

  console.log({
    nombreText,
    cantidadText,
    precioText,
    imagenText,
    categoriaText,
  });
  const alerta = document.querySelector("#alert-error");
  alerta.classList = "alert alert-danger d-none";

  if ([nombreText, cantidadText, precioText, categoriaText].includes("")) {
    alerta.textContent = "Todos los compos son obligatorios.";

    alerta.classList.remove("d-none");
    return;
  }
  alerta.classList.add("d-none");

  if (!producto) {
    // agregar
    listaProductos.push({
      id: Date.now(),
      nombre: nombreText,
      cantidad: cantidadText,
      precio: precioText,
      imagen: imagenText,
      categoria: categoriaText,
    });
  } else {
    //editar
    producto.nombre = nombreText;
    producto.cantidad = cantidadText;
    producto.precio = precioText;
    producto.imagen = imagenText;
    producto.categoria = categoriaText;

    //Cambiamos el valor del producto
    producto = undefined;
    btnClose.click();
  }

  alerta.classList.replace("alert-danger", "alert-success");
  alerta.classList.remove("d-none");
  alerta.textContent = `El producto ${nombreText} fue agregado exitosamente`;

  //La alerta se deja de mostrar despues de 2 segundos
  setTimeout(()=>alerta.classList.add("d-none"),2000)
  document.querySelector("#form-agregar").reset();

  mostrarProductos();
}

//Funcion para editar un producto

function cargarDrawer(id) {
  console.log(id);
  //Buscar el producto que tiene el id proporcionado en los parametros
  producto = listaProductos.find((product) => product.id == id);

  //Selectores, los inputs y al mismo tiempo acceder al valor
  document.querySelector("#nombre_producto").value = nombreText =
    producto.nombre;
  document.querySelector("#cantidad").value = cantidadText = producto.cantidad;
  document.querySelector("#precio").value = precioText = producto.precio;
  document.querySelector("#imagen").value = imagenText = producto.imagen;
  document.querySelector("#categoria").value = categoriaText =
    producto.categoria;

  //Hacemos un evento click al boton que abre el drawer
  btnOpenDrawer.click();

  //Modificar el texto al boton
  btnAgregar.textContent = "Editar Producto";

  //Modificar el titulo del drawer
  tituloDrawer.textContent = "Editar producto";

  console.log(producto);
}
//ELiminar un producto
function eliminarProducto(id){
  listaProductos = listaProductos.filter(producto => producto.id != id)
  mostrarProductos()
}

mostrarProductos();
