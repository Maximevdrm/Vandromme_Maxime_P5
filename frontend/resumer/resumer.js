function afficherResumer(){
    let prixAfficher = localStorage.getItem('resumerPrix');

    document
        .getElementById("afficherPrix")
        .innerHTML = `${prixAfficher}`;
}