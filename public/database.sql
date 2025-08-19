USE mi_base_de_datos;

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(255) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL
);
INSERT INTO productos (descripcion, precio, stock) VALUES
('Producto 1', 100.00, 10),
('Producto 2', 200.00, 15),
('Producto 3', 50.00, 30),
('Producto 4', 150.00, 5),
('Producto 5', 80.00, 20);


