var curentProduct;

function getProduct() {
  let searchParams = new URLSearchParams(location.search);
  console.log(searchParams);

  fetch("http://localhost:3000/api/teddies/" + searchParams.get("id"))
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (ourson) {
      console.log(ourson);

      curentProduct = ourson;

      let htmlContent = "";
      let formattedPrice = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(ourson.price);
      htmlContent += `<img class="peluche_img" src="${ourson.imageUrl}" alt="image d\'ourson">
            <h1 class="peluche_name"> ${ourson.name}</h1>
            <h2 class="peluche_price">${formattedPrice}</h2>
            <p class="peluche_description">${ourson.description}</p>`;
      console.log(htmlContent);

      document.getElementById("product").innerHTML = htmlContent;

      htmlContent = `<option value="">--Please choose an option--</option>`;
      for (couleurs of ourson.colors) {
        htmlContent += `<option value="">${couleurs}</option>`;
      }
      document.getElementById("ourson_couleur").innerHTML = htmlContent;

      htmlContent = `<input id="quantityOurson" type="number" step="1" min="0"></input>`;
      document.getElementById("quantity").innerHTML = htmlContent;
    })
    .catch(function (error) {});
}
getProduct();

function addCart() {
  console.log(curentProduct);

  let cart = JSON.parse(localStorage.getItem("panier"));
  console.log(cart);
  if (cart == null) cart = [];

  let quantityOurson =
    document.getElementById("quantityOurson").value != "" ? Number(document.getElementById("quantityOurson").value) : 0; //Condition ternaire
  console.log(quantityOurson);

  curentProduct.quantityOurson = quantityOurson;

  let found = false;
  for (let ourson of cart) {
    if (ourson._id == curentProduct._id) {
      ourson.quantityOurson += quantityOurson;
      found = true;
      break;
    }
  }
  if (!found) {
    cart.push(curentProduct);
  }
  localStorage.setItem("panier", JSON.stringify(cart));
}
