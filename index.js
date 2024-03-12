/*Get api with product data*/

let num = 0;
async function getData(skip, limit) {
  const response = await fetch(
    `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
  );
  const data = await response.json();
  let col = document.getElementById("col");

  if (data.products.length === data.total) {
    return;
  }

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
    newButton.className = "addtocart"
    newImg.src = el.thumbnail;
    price.textContent = "Price " + el.price;
    title.textContent = el.title;
    newElement.appendChild(newButton);
    newElement.appendChild(newImg);
    newElement.appendChild(title);
    newElement.appendChild(price);
    col.appendChild(newElement);
  });
  console.log(data);
  return;
}
getData(num, 12);


/* menu bar button function */
function openMenu() {
  console.log("work");
  let menu = document.getElementById("menu");
  let button = document.getElementsByClassName("addtocart");
  let cardElements = document.getElementsByClassName("card");
  if (menu.style.visibility === "hidden") {
    menu.style.visibility = "visible";
    for (let i = 0; i < cardElements.length; i++) {
      let card = cardElements[i];
      let btn = button[i]
      card.style.position = "static";
      btn.style.visibility = "hidden"
    }
  } else {
    menu.style.visibility = "hidden";
    for (let i = 0; i < cardElements.length; i++) {
      let card = cardElements[i];
      let btn = button[i]
      card.style.position = "relative";
      btn.style.visibility = "visible"
    }
  }
}


function Next() {
  num++;
  getData(num, 12);
}
