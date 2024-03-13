/*Get api with product data*/
// https://dummyjson.com/products/search?q=phone
let num = 0;
let totalItem = 0;
async function getData(skip) {
  let limit = 4;
  const response = await fetch(
    `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
  );
  const data = await response.json();
  let col = document.getElementById("col");
  col.innerHTML = "";
  data.products.forEach((el) => {
    let newElement = document.createElement("div");
    newElement.className = "card";
    newElement.id = "card";
    let newButton = document.createElement("button");
    let newImg = document.createElement("img");
    let price = document.createElement("p");
    price.className = "price";
    let title = document.createElement("p");
    newButton.textContent = "ADD TO CART";
    newButton.className = "addToCart";
    newImg.src = el.thumbnail;
    newImg.id = "productImg";
    price.textContent = "Price " + el.price;
    title.textContent = el.title;
    newElement.appendChild(newButton);
    newElement.appendChild(newImg);
    newElement.appendChild(title);
    newElement.appendChild(price);
    col.appendChild(newElement);
    newElement.addEventListener("click", function () {
      localStorage.setItem("thumbnail", el.thumbnail);
      localStorage.setItem("price", el.price);
      localStorage.setItem("title", el.title);
      localStorage.setItem("description", el.description);
      console.log(el);
      location.replace("details.html");
    });
  });
  totalItem = data.total;
  console.log(data);
  return;
}

getData(0);
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
  let btn1 = document.getElementById("0");
  let btn2 = document.getElementById("1");
  let btn3 = document.getElementById("2");
  let btn4 = document.getElementById("3");
  let btn5 = document.getElementById("4");

  console.log("totalItem", totalItem, parseInt(btn5.textContent));
  if (totalItem <= parseInt(btn5.textContent)) {
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
  getData(parseFloat(num));
});
document.getElementById("1").addEventListener("click", () => {
  let num = document.getElementById("1").textContent;
  getData(parseFloat(num));
});
document.getElementById("2").addEventListener("click", () => {
  let num = document.getElementById("2").textContent;
  getData(parseFloat(num));
});
document.getElementById("3").addEventListener("click", () => {
  let num = document.getElementById("3").textContent;
  getData(parseFloat(num));
});
document.getElementById("4").addEventListener("click", () => {
  let num = document.getElementById("4").textContent;
  getData(parseFloat(num));
});

/* search input function*/

document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    var searchInputValue = document.getElementById("searchInput").value;
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchInputValue}`
    );
    const data = await response.json();
    let col = document.getElementById("col");
    col.innerHTML = "";
    data.products.forEach((el) => {
      let newElement = document.createElement("div");
      newElement.className = "card";
      newElement.id = "card";
      let newButton = document.createElement("button");
      let newImg = document.createElement("img");
      let price = document.createElement("p");
      price.className = "price";
      let title = document.createElement("p");
      newButton.textContent = "ADD TO CART";
      newButton.className = "addToCart";
      newImg.src = el.thumbnail;
      price.textContent = "Price " + el.price;
      title.textContent = el.title;
      newElement.appendChild(newButton);
      newElement.appendChild(newImg);
      newElement.appendChild(title);
      newElement.appendChild(price);
      col.appendChild(newElement);
      newElement.addEventListener("click", function () {
        localStorage.setItem("thumbnail", el.thumbnail);
        localStorage.setItem("price", el.price);
        localStorage.setItem("title", el.title);
        localStorage.setItem("description", el.description);
        console.log(el);
        location.replace("details.html");
      });
    });
    totalItem = data.total;
    console.log(data);
    return;
  });

console.log(document.getElementById("card"));
