

affichePanier(panier);


// Affichage du contenu du panier
function affichePanier(panier) {
    let contenupanier = document.getElementById('panier');
    // Si le panier est vide
    if(panier.length == 0)
    {
        let textepanier = 
            '<p>Votre panier est vide</p>'+
            '<a href="index.html"><button class="btn btn-info">Continuer vos achats</button></a>'
        contenupanier.innerHTML += textepanier
    }
    // Si le panier comporte au moins un article 
    else 
    {
        let textepanier = '<table><tr><th></th><th>Désignation</th><th>Qte</th><th>Prix</th><th></th></tr>'
        // On instancie une variable i qui permettra de définir l'ordre de l'article dans le panier
        let i = 0
        let totalPanier = 0
        panier.forEach((produit) => {
            textepanier += `<tr>
                <td><img src="${produit.image}" class="vignettePanier"></td>
                <td><a href="produit.html?id=${produit.id}" target="_self">${produit.nom} - ${produit.lentille}</a></td>
                <td>${produit.quantite}</td>
                <td>${produit.prix/100}.00 €</td>
                <td><i class="fas fa-trash-alt supprimerarticle" data-index="${i}"></i></td>
            </tr>`
            i++
            totalPanier+= produit.prix
        })
        textepanier += '</table>'
        // On affiche le montant total des articles du panier
        textepanier += `<p>Montant total : ${totalPanier/100}.00 €</p>`
        // On affiche un bouton permettant de vider la totalité du panier
        textepanier += '<button id="supprimertout" class="btn btn-danger">Vider le panier<i class="fas fa-trash-alt"></i></button>'
        contenupanier.innerHTML += textepanier
    }

}


// Prise en compte des boutons permettant de retirer un article du panier
const boutonsSuppArticle = document.getElementsByClassName('supprimerarticle');
for (let i = 0; i < boutonsSuppArticle.length; i++)
{
    boutonsSuppArticle[i].addEventListener("click", function (event) {
        event.preventDefault();
        // On récupère la valeur de data-index
        let index = this.dataset.index
        // On supprime l'entrée correspondante dans le panier
        panier.splice(index, 1)
        // On remet à jour le panier dans le local storage et on rafraichit la page
        localStorage.setItem('panier', JSON.stringify(panier))
        window.location.reload()
    })    
}

// Prise en compte du bouton permettant de vider tout le panier
const boutonsSuppTout = document.getElementById('supprimertout');
boutonsSuppTout.addEventListener("click", function (event) {
    event.preventDefault();
    // On supprime le panier du local storage
    localStorage.removeItem('panier')
    window.location.reload()
})
