let setCart = JSON.parse(localStorage.getItem("panier"));
function afficherPanier() {
  console.log(setCart);
  let htmlContent = "";
  if (setCart != null) {
    let totalPrice = 0;
    for (let ourson of setCart) {
      let formattedPrice = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(ourson.price);
      let totalPriceOurson = ourson.price * ourson.quantityOurson;
      let formattedPriceTotalOurson = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
        totalPriceOurson
      );
      totalPrice += totalPriceOurson;
      htmlContent += `<img class="ourson_img" src="${ourson.imageUrl}" alt="image d\'ourson">
            <h1 class="ourson_name"> ${ourson.name}</h1>
            <h2 class="ourson_price">${formattedPrice} x ${ourson.quantityOurson} = ${formattedPriceTotalOurson}</h2>`;

      console.log(htmlContent);
    }
    let totalFormattedPrice = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(totalPrice);
    localStorage.setItem("resumerPrix", totalFormattedPrice);
    htmlContent += `<p>Prix total de votre panier : ${totalFormattedPrice}</p>`;
  }
  document.getElementById("panier").innerHTML = htmlContent;
}
afficherPanier();

let firstname = "";
let lastname = "";
let email = "";
let message = "";
let ville = "";

function validateForm() {
  firstname = document.forms["myForm"]["firstname"];
  lastname = document.forms["myForm"]["lastname"];
  email = document.forms["myForm"]["email"];
  message = document.forms["myForm"]["message"];
  ville = document.forms["myForm"]["ville"];

  if (firstname.value == "") {
    document.getElementById("errorname").innerHTML = "Veuillez entrez un prénom valide";
    firstname.focus();
    return false;
  } else {
    document.getElementById("errorname").innerHTML = "";
  }

  if (lastname.value == "") {
    document.getElementById("errorname").innerHTML = "Veuillez entrez un nom valide";
    lastname.focus();
    return false;
  } else {
    document.getElementById("errorname").innerHTML = "";
  }

  if (email.value == "") {
    document.getElementById("erroremail").innerHTML = "Veuillez entrez une adresse mail valide";
    email.focus();
    return false;
  } else {
    document.getElementById("erroremail").innerHTML = "";
  }

  if (email.value.indexOf("@", 0) < 0) {
    document.getElementById("erroremail").innerHTML = "Veuillez entrez une adresse mail valide";
    email.focus();
    return false;
  }

  if (email.value.indexOf(".", 0) < 0) {
    document.getElementById("erroremail").innerHTML = "Veuillez entrez une adresse mail valide";
    email.focus();
    return false;
  }

  if (message.value == "") {
    document.getElementById("errormsg").innerHTML = "Veuillez entrez une adresse valide";
    message.focus();
    return false;
  } else {
    document.getElementById("errormsg").innerHTML = "";
  }

  if (ville.value == "") {
    document.getElementById("errorcity").innerHTML = "Veuillez entrez une ville";
    ville.focus();
    return false;
  } else {
    document.getElementById("errorcity").innerHTML = "";
  }

  return true;
}

document.getElementById("boutonEnvoyer").addEventListener("click", (evt) => {
  evt.preventDefault();
  if (validateForm() == true) {
    console.log(firstname);
    const contact = {
      firstName: firstname.value,
      lastName: lastname.value,
      email: email.value,
      address: message.value,
      city: ville.value,
    };
    let products = [];
    for (let product of setCart) {
      products.push(product._id);
    }
    const send = {
      contact: contact,
      products: products,
    };
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response) => {
        localStorage.setItem("orderId", response.orderId);
        document.location.href="../resumer/resumer.html";
      });
      
  }
});
