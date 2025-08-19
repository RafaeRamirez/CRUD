// ⚠️ Usa http si tu backend no tiene certificado SSL
const url = 'http://localhost:3000/api/productos';

const contenedor = document.querySelector('tbody');
let resultado = '';

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));
const formProducto = document.getElementById('formProducto');
const descripcion = document.getElementById('descripcion');
const precio = document.getElementById('precio');
const stock = document.getElementById('stock');

let option = '';  // 'crear' o 'editar'
let productoEditadoId = null;

const btnCrear = document.getElementById('btnCrear');

// Botón Crear
btnCrear.addEventListener('click', () => {
  descripcion.value = '';
  precio.value = '';
  stock.value = '';
  option = 'crear';
  modalArticulo.show();
});

// Mostrar productos en la tabla
const mostrar = (productos) => {
  resultado = '';
  productos.forEach(producto => {
    resultado += `
      <tr>
        <td>${producto.id}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.precio}</td>
        <td>${producto.stock}</td>
        <td>
          <button class="btn btn-primary btnEditar" data-id="${producto.id}">Editar</button>
          <button class="btn btn-danger btnEliminar" data-id="${producto.id}">Eliminar</button>
        </td>
      </tr>
    `;
  });
  contenedor.innerHTML = resultado;
};

// Cargar productos al inicio
const mostrarProductosActualizados = () => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("Productos recibidos:", data);
      mostrar(data);
    })
    .catch(error => console.error("Error al cargar productos:", error));
};

mostrarProductosActualizados();

// Guardar producto (crear o editar)
formProducto.addEventListener('submit', (e) => {
  e.preventDefault();

  const nuevoProducto = {
    descripcion: descripcion.value,
    precio: precio.value,
    stock: stock.value
  };

  if (option === 'crear') {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto)
    })
    .then(() => {
      mostrarProductosActualizados();
      modalArticulo.hide();
    });
  }

  if (option === 'editar') {
    fetch(`${url}/${productoEditadoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto)
    })
    .then(() => {
      mostrarProductosActualizados();
      modalArticulo.hide();
    });
  }
});

// Delegación de eventos para Editar y Eliminar
contenedor.addEventListener('click', (e) => {
  if (e.target.classList.contains('btnEditar')) {
    const id = e.target.dataset.id;

    fetch(`${url}/${id}`)
      .then(response => response.json())
      .then(producto => {
        descripcion.value = producto.descripcion;
        precio.value = producto.precio;
        stock.value = producto.stock;

        productoEditadoId = id;
        option = 'editar';
        modalArticulo.show();
      });
  }

  if (e.target.classList.contains('btnEliminar')) {
    const id = e.target.dataset.id;
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      fetch(`${url}/${id}`, { method: 'DELETE' })
        .then(() => mostrarProductosActualizados());
    }
  }
});
