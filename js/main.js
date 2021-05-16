const urlAPIpost = 'http://localhost:3000/api/cameras/order';
const urlAPIget = 'http://localhost:3000/api/cameras';

const panierstorage = JSON.parse(localStorage.getItem('panier'));
// Si le panier en local storage n'existe pas ou est vide, on l'instancie à vide
if (panierstorage === null || panierstorage.length == 0) {
    panier = [];
    let nbPanier = 0;
} else {
    panier = panierstorage;
    let nbPanier = panier.length    
    document.getElementById("nbPanier").style.display = "flex";
    document.getElementById("nbPanier").textContent = nbPanier;    
}
