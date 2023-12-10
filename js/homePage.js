import axios from "../node_modules/axios/dist/esm/axios.min.js";

//Funzioni per il caricamento della pagina
const spinner = document.getElementById("spinner");
function showSpinner() {
  spinner.style.display = "block";
}
showSpinner();

function hideSpinner() {
  spinner.style.display = "none";
}

// Funzione per la chiamata GET dei prodotti
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
    hideSpinner()
  } catch (error) {
    console.error(error);
  }
}
getBooks();

//Funzione per creare le card dei prodotti in HomePage
function productGen(product) {
  const card = document.createElement("div");
  card.classList.add("col-md-4", "mb-3");
  card.innerHTML = `
    <div class="card shadow-sm h-100 ">
      <img src="${product.imageUrl}" alt="foto">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">
        ${product.description}</p>
        <p>${product.brand}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-danger btn-sm btn-outline-secondary modify-btn">
              <a href="Office.html" class="text-white text-decoration-none">Modify</a>
            </button>
            <button type="button" class="btn btn-primary btn-sm text-dark btn-outline-secondary del-btn">
               <a href="details.html?id=${product._id}" class="text-white text-decoration-none">Discover</a>
            </button>
          </div>
          <small class="text-muted">${product.price}€</small>
        </div>
      </div>
    </div>
    `;

  return card;
}

