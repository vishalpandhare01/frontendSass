function menuButton() {
  let mobileNav = document.getElementById("mobileNav");
  if (mobileNav.style.display === "none") {
    mobileNav.style.display = "";
  } else {
    mobileNav.style.display = "none";
    console.log("click");
  }
}

async function getProductData() {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/" + localStorage.getItem("productId")
    );
    const data = await response.json(); // Parse JSON response

    document.getElementById("productImg").src = data.thumbnail;
    document.getElementById("title").textContent = data.title;
    document.getElementById("description").textContent = data.description;
    document.getElementById("price").textContent = "₹" + data.price;
  } catch (err) {
    alert(err);
  }
}

getProductData();

