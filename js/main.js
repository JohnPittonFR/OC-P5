const urlAPIpost = 'http://localhost:3000/api/cameras/order';
const urlAPIget = 'http://localhost:3000/api/cameras';

const panier = JSON.parse(localStorage.getItem('panier'));
if (panier == null) panier = [];
let nbPanier = panier.length
if(nbPanier > 0)
{
    document.getElementById("nbPanier").style.display = "flex";
    document.getElementById("nbPanier").textContent = nbPanier;
}