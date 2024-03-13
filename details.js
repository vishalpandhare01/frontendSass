function menuButton() {
  let mobileNav = document.getElementById("mobileNav");
  if (mobileNav.style.display === "none") {
    mobileNav.style.display = "";
  } else {
    mobileNav.style.display = "none";
    console.log("click");
  }
}

document.getElementById("productImg").src = localStorage.getItem("thumbnail");
document.getElementById("title").textContent = localStorage.getItem("title");
document.getElementById("description").textContent = localStorage.getItem("description");
document.getElementById("price").textContent = "₹" + "" + localStorage.getItem("price");

