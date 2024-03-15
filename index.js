/*Get api with product data*/
const url = "https://dummyjson.com/products/";
let num = 0;
let totalItem = 0;

function product(productId) {
  localStorage.setItem("productId", productId);
  console.log(productId);
  location.replace("details.html");
}

// create new html element
function createNewProduct(data) {
  let newElement = "";
  data.products.forEach((el) => {
    newElement += `<div class="card" id="card">
      <img src="${el.thumbnail}" alt="" id="productImg" onclick="product(${el.id})">
      <p class="price">${el.price}</p>
      <p>${el.title}</p>
      <button class="addToCart">ADD TO CART</button>
  </div>`;
  });
  col.innerHTML = newElement;
  totalItem = data.total;
  console.log(data);
  return;
}

//fetch all product data
async function getData(page, limit) {
  const col = document.getElementById("col");
  col.innerHTML = " ";
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
    const col = document.getElementById("col");
    col.innerHTML = " ok ";
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
  let paginationElement = document.getElementById("pagination");
  let btn1 = document.getElementById("0");
  let btn2 = document.getElementById("1");
  let btn3 = document.getElementById("2");
  let btn4 = document.getElementById("3");
  let btn5 = document.getElementById("4");

  console.log("totalItem", totalItem, parseInt(btn5.textContent));
  if (totalItem / 12 < parseInt(btn5.textContent)) {
    return;
  }

  btn1.textContent = parseInt(btn1.textContent) + 5;
  btn2.textContent = parseInt(btn2.textContent) + 5;
  btn3.textContent = parseInt(btn3.textContent) + 5;
  btn4.textContent = parseInt(btn4.textContent) + 5;
  btn5.textContent = parseInt(btn5.textContent) + 5;
}

function prevPage() {
  let btn1 = document.getElementById("0");
  let btn2 = document.getElementById("1");
  let btn3 = document.getElementById("2");
  let btn4 = document.getElementById("3");
  let btn5 = document.getElementById("4");

  if (parseInt(btn1.textContent) === 0) {
    return;
  }

  btn1.textContent = parseInt(btn1.textContent) - 5;
  btn2.textContent = parseInt(btn2.textContent) - 5;
  btn3.textContent = parseInt(btn3.textContent) - 5;
  btn4.textContent = parseInt(btn4.textContent) - 5;
  btn5.textContent = parseInt(btn5.textContent) - 5;
}

/*pagination buttons*/
document.getElementById("0").addEventListener("click", () => {
  let num = document.getElementById("0").textContent;
  getData(parseFloat(num), 12);
});

document.getElementById("1").addEventListener("click", () => {
  let num = document.getElementById("1").textContent;
  getData(parseFloat(num), 12);
});

document.getElementById("2").addEventListener("click", () => {
  let num = document.getElementById("2").textContent;
  getData(parseFloat(num), 12);
});

document.getElementById("3").addEventListener("click", () => {
  let num = document.getElementById("3").textContent;
  getData(parseFloat(num), 12);
});

document.getElementById("4").addEventListener("click", () => {
  let num = document.getElementById("4").textContent;
  if (totalItem / 12 <= parseInt(num)) {
    getData(parseFloat(num), 4);
    return;
  }
  getData(parseFloat(num), 12);
});

