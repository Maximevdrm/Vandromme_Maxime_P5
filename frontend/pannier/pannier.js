function afficherPanier(){
    let setCart = JSON.parse(localStorage.getItem('panier'));
    console.log(setCart);
    let htmlContent = "";
    if(setCart != null){
            let totalPrice = 0;
        for (let ourson of setCart){
                let formattedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(ourson.price);
                let totalPriceOurson = ourson.price*ourson.quantityOurson;
                let formattedPriceTotalOurson = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPriceOurson);
                totalPrice += totalPriceOurson;
                htmlContent +=
                `<img class="ourson_img" src="${ourson.imageUrl}" alt="image d\'ourson">
            <h1 class="ourson_name"> ${ourson.name}</h1>
            <h2 class="ourson_price">${formattedPrice} x ${ourson.quantityOurson} = ${formattedPriceTotalOurson}</h2>`;
                
            console.log(htmlContent)
        }
        let totalFormattedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPrice);
        htmlContent +=
                `<p>Prix total de votre panier : ${totalFormattedPrice}</p>`
        }            
    document
        .getElementById("panier")
        .innerHTML = htmlContent;
}
afficherPanier();