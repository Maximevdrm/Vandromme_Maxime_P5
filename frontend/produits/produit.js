function getProduct(){
    let searchParams = new URLSearchParams(location.search);
    console.log(searchParams);

    fetch("http://localhost:3000/api/teddies/"+searchParams.get('id'))
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(function(ourson){
        console.log(ourson);
        
        let htmlContent = "";
            let formattedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(ourson.price);
            htmlContent +=
            `<img class="peluche_img" src="${ourson.imageUrl}" alt="image d\'ourson">
            <h1 class="peluche_name"> ${ourson.name}</h1>
            <h2 class="peluche_price">${formattedPrice}</h2>
            <p class="peluche_description">${ourson.description}</p>`;
            console.log(htmlContent)

        document
            .getElementById("product")
            .innerHTML = htmlContent;

            htmlContent =
            `<option value="">--Please choose an option--</option>` 
            for (couleurs of ourson.colors){
                htmlContent +=
                `<option value="">${couleurs}</option>`
            }
        document
            .getElementById("ourson_couleur")
            .innerHTML = htmlContent
            
    })
    .catch(function(error){
    })
}
getProduct();