import axios from "../node_modules/axios/dist/esm/axios.min.js";

//Funzione per la chiamata GET dei prodotti
async function getBooks() {
  try {
    const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZjE3MjBkOGEyMDAwMThhNDhiMzkiLCJpYXQiOjE3MDIyMDU0MjIsImV4cCI6MTcwMzQxNTAyMn0.wI1n2pl7S6ZJIoyOkS5jA5KxlKf2CuvRw700UVblnLo"
    const response = await axios.get(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );
    console.log(response.data);
    const booksContainer = document.getElementById("books-container");
    response.data.map((product) => {
      booksContainer.appendChild(productGen(product));
    });
  } catch (error) {
    console.error(error);
  }
}
getBooks();

//Funzione per creare le card dei prodotti in BackOffice
function productGen(product) {
  const card = document.createElement("div");
  card.classList.add("col-md-4","mt-4");
  card.innerHTML = `
  <div class="card shadow-sm h-100">
    <img src="${product.imageUrl}" alt="foto">
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">
      ${product.description}</p>
      <p>${product.brand}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-primary btn-sm btn-outline-secondary modify-btn text-white">
            Modify
          </button>
          <button type="button" class="btn btn-danger btn-sm btn-outline-secondary del-btn text-white">
            Remove
          </button>
        </div>
        <small class="text-muted">${product.price}€</small>
      </div>
    </div>
  </div>
  `;

  card.querySelector(".del-btn").addEventListener("click", () => {
    deleteProduct(product._id);
  });

  card.querySelector(".modify-btn").addEventListener("click", () => {
    showModifyForm(product);
  });

  return card;
}

//Funzione per la chiamata POST (Aggiungi prodotto)
document.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const price = document.getElementById("price").value;

  try {
    const response = await axios.post(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        name,
        description,
        brand,
        imageUrl,
        price,
      },
      {
        headers: {
          Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZjE3MjBkOGEyMDAwMThhNDhiMzkiLCJpYXQiOjE3MDIyMDU0MjIsImV4cCI6MTcwMzQxNTAyMn0.wI1n2pl7S6ZJIoyOkS5jA5KxlKf2CuvRw700UVblnLo"
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
});

//Funzione per il Form di modifica
function showModifyForm(product) {
  const formHtml = `
    <form id="modify-form" class="mt-3" style="border: 1px solid black; border-radius: 20px; background: linear-gradient(to right, #d33d32, #dce5ff); color:white;">
      <fieldset>
      <legend class="ms-3"><b>${product.name}</b></legend>
      <input type="text" id="modify-name" value="${product.name}" class="m-3" required>
      <input type="text" id="modify-description" value="${product.description}" class="ms-3 mt-1" required>
      <input type="text" id="modify-brand" value="${product.brand}" class="ms-3 mt-1 mb-1" required>
      <input type="text" id="modify-imageUrl" value="${product.imageUrl}" class="ms-3 mt-1 mb-2" required>
      <input type="number" id="modify-price" value="${product.price}" class="ms-3 mt-1 mb-2" required> 
      <button type="submit" class="ms-3 mt-1 mb-2 btn btn-danger">Save Changes</button>
      </fieldset>
    </form>
  `;

  const modifyFormContainer = document.getElementById("modify-form-container");
  modifyFormContainer.innerHTML = formHtml;

  document
    .getElementById("modify-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const updatedProduct = {
        name: document.getElementById("modify-name").value,
        description: document.getElementById("modify-description").value,
        brand: document.getElementById("modify-brand").value,
        imageUrl: document.getElementById("modify-imageUrl").value,
        price: document.getElementById("modify-price").value,
      };

      await modifyProduct(product._id, updatedProduct);
      modifyFormContainer.innerHTML = "";
    });
}

//Funzione per la chiamata PUT (Modifica prodotto)
async function modifyProduct(productId, updatedProduct) {
  let mod = confirm("Are you sure you want to modify this product?");
  if (mod == true) {
  try {
    const apiKey =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZjE3MjBkOGEyMDAwMThhNDhiMzkiLCJpYXQiOjE3MDIyMDU0MjIsImV4cCI6MTcwMzQxNTAyMn0.wI1n2pl7S6ZJIoyOkS5jA5KxlKf2CuvRw700UVblnLo"
    const response = await axios.put(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      updatedProduct,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
}

//Funzione per la chiamata DELETE (Elimina prodotto)
async function deleteProduct(productId) {
  let del = confirm("Are you sure you want to delete this product?")
  if (del == true) {
  try {
    const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZjE3MjBkOGEyMDAwMThhNDhiMzkiLCJpYXQiOjE3MDIyMDU0MjIsImV4cCI6MTcwMzQxNTAyMn0.wI1n2pl7S6ZJIoyOkS5jA5KxlKf2CuvRw700UVblnLo"
    const response = await axios.delete(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}}

