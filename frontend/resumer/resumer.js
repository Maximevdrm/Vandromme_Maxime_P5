function afficherResumer(){
    let prixAfficher = localStorage.getItem('resumerPrix');
console.log(prixAfficher)
    document
        .getElementById("afficherPrix")
        .innerHTML = `${prixAfficher}`;
}
afficherResumer();

function afficherId(){
    let id = localStorage.getItem('orderId');
console.log(afficherId)
    document
        .getElementById("afficherNuméro")
        .innerHTML = `${id}`;
}
afficherId();




function clearPanier(){
    localStorage.removeItem('panier');
}
clearPanier();
//Fonction qui clear le local storage pannier quand la page s'ouvre