/*Get api with product data*/
const url = "https://dummyjson.com/products/";
let num = 0;
let totalItem = 0;

function product(productId) {
  localStorage.setItem("productId", productId);
  location.replace("details.html");
}

// pagination function as per click on number
function pagination(num) {
  localStorage.clear();
  localStorage.setItem("setNumber", num);
  document.getElementById(`${num}`).style.border = "3px solid #b69188";
  getData(parseFloat(num), 12);
  console.log("num", num);
}

// create new html element
function createNewProduct(data) {
  // new element products
  const col = document.getElementById("col");
  const pageButton = document.getElementById("pageBtn");
  col.innerHTML = " ";
  pageButton.innerHTML = "";
  let newElement = "";
  let newPageElement = "";
  data.products.forEach((el) => {
    newElement += `<div class="card" id="card">
      <img src="${el.thumbnail}" alt="" id="productImg" onclick="product(${el.id})">
      <p class="price">${el.price}</p>
      <p>${el.title}</p>
      <button class="addToCart">ADD TO CART</button>
  </div>`;
  });

  /*pagination buttons*/

  for (let i = 0; i <= Math.ceil(data.total / 12); i++) {
    if (i === 0) {
      newPageElement += `<button class="page"  onclick="pagination(${i})" id="${i}">${i}</button>`;
      continue;
    }
    newPageElement += `<button class="page" onclick="pagination(${i})" id="${i}">${i}</button>`;
  }

  pageButton.innerHTML = newPageElement;
  col.innerHTML = newElement;
  totalItem = data.total;
  return;
}

//fetch all product data
async function getData(page, limit) {
  const skip = (page - 1) * limit;
  const response = await fetch(`${url}?skip=${skip}&limit=${limit}`);
  const data = await response.json();
  createNewProduct(data);
}
getData(0, 12);

// search product
document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    let searchInputValue = document.getElementById("searchInput").value;
    const response = await fetch(`${url}search?q=${searchInputValue}`);
    const data = await response.json();
    createNewProduct(data);
  });

/* menu bar button function */
function openMenu() {
  console.log("work");
  let menu = document.getElementById("menu");
  let button = document.getElementsByClassName("addToCart");
  let cardElements = document.getElementsByClassName("card");
  if (menu.style.visibility === "hidden") {
    menu.style.visibility = "visible";
    for (let i = 0; i < cardElements.length; i++) {
      let card = cardElements[i];
      let btn = button[i];
      card.style.position = "static";
      btn.style.visibility = "hidden";
    }
  } else {
    menu.style.visibility = "hidden";
    for (let i = 0; i < cardElements.length; i++) {
      let card = cardElements[i];
      let btn = button[i];
      card.style.position = "relative";
      btn.style.visibility = "visible";
    }
  }
}

/*pagination number movement*/
function nextPage() {
  let num = parseInt(localStorage.getItem("setNumber"));
  num++;
  if (num <= Math.ceil(totalItem / 12)) pagination(num);
}

function prevPage() {
  let num = parseInt(localStorage.getItem("setNumber"));
  num--;
  if (num >= 0) pagination(num);
}

