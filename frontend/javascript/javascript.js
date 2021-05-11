function produits(){
    //On récupère l'api des oursons
    fetch("http://localhost:3000/api/teddies")
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(function(oursons){
        console.log(oursons);
        //On crée la boucle pour récuperer une à une les informations des différents oursons
        let htmlContent = "";
        for (let ourson of oursons){
            let formattedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(ourson.price);
            htmlContent +=
            `<div class="carte_oursons" id="${ourson._id}"><img src="${ourson.imageUrl}" alt="image d\'ourson">
            <h1> ${ourson.name}</h1>
            <h2>${formattedPrice}</h2>
            <p>${ourson.description}</p></div>`;
            console.log(htmlContent)
        }
        //On implémente dans notre HTML sur la balise avec l'id les_oursons notre boucle
        document
            .getElementById("les_oursons")
            .innerHTML = htmlContent;
    })
    .catch(function(error){
    })
}
produits();