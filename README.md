# CRUD

This is a simple **CRUD (Create, Read, Update, Delete)** application for managing products.  
It is built with **Node.js, Express, MySQL** (backend) and **HTML, CSS, JavaScript** (frontend).  
The system allows you to create, list, update, and delete products in a database.

---

## Features

- 📋 **List Products**: Display all products in a dynamic HTML table.  
- ➕ **Add Products**: Add new products using a form (modal).  
- ✏️ **Edit Products**: Update product information.  
- ❌ **Delete Products**: Remove products from the database.  
- 🔄 **Real-time Updates**: The table refreshes automatically after each operation.  

---

## Technologies Used

### Backend
- Node.js  
- Express.js  
- MySQL2 (with connection pool)  
- CORS  

### Frontend
- HTML5  
- CSS3 (basic styling for table and layout)  
- JavaScript (fetch API to connect with backend)  
- Bootstrap (for modal and responsive design)  

---

## Project Structure

node_modules/
public/
   └── database.sql
server/
   └── api.js
src/
   ├── CSS/
   │    └── style.css
   └── js/
        └── main.js
.gitignore
index.html
package-lock.json
package.json
README.md




---

## API Endpoints

| Method | Endpoint              | Description               |
|--------|-----------------------|---------------------------|
| GET    | `/api/productos`      | Get all products          |
| POST   | `/api/productos`      | Create a new product      |
| PUT    | `/api/productos/:id`  | Update a product by ID    |
| DELETE | `/api/productos/:id`  | Delete a product by ID    |

---

## Installation & Setup

1. **Clone this repository**  
   ```bash
   git clone https://github.com/RafaeRamirez/CRUD.git
   cd CRUD
Install dependencies

bash
Copiar
Editar
npm install
Configure the database

Create a MySQL database (e.g., products_db)

Create a table:

sql
Copiar
Editar
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(255) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL
);
Update your database credentials in db.js.

Run the server

bash
Copiar
Editar
npm start
The backend will run on http://localhost:3000.

Open the frontend

Open public/index.html in your browser.

You should see the product table and CRUD functionality.

Example Screenshot
(Add a screenshot of your running app here)

License
This project is licensed under the MIT License.
