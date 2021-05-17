const urlAPI = 'http://localhost:3000/api/cameras/order';
affichePanier(panier);


// Affichage du contenu du panier
function affichePanier(panier) {
    let contenupanier = document.getElementById('panier');
    let formulairepanier = document.getElementById('sectionform');
    // Si le panier est vide
    if(panier.length == 0)
    {
        let textepanier = 
            '<div class="col-12 text-center mt-2">Votre panier est vide</div>'+
            '<div class="col-12 text-center mt-4"><a href="index.html"><button class="btn btn-info">Continuer vos achats</button></a></div>'
        contenupanier.innerHTML += textepanier
        formulairepanier.style.display = "none"
    }
    // Si le panier comporte au moins un article 
    else 
    {
        let textepanier = '<table class="col-12 text-center mt-2 table-bordered"><tr><th class="d-none d-sm-block"></th><th>Désignation</th><th>Qte</th><th>Prix</th><th></th></tr>'
        // On instancie une variable i qui permettra de définir l'ordre de l'article dans le panier
        let i = 0
        let totalPanier = 0
        panier.forEach((produit) => {
            textepanier += `<tr>
                <td class="p-2 d-none d-sm-block"><img src="${produit.image}" class="vignettePanier"></td>
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
        textepanier += `<div class="col-12 text-center mt-4">Montant total : ${totalPanier/100}.00 €</div>`
        // On affiche un bouton permettant de vider la totalité du panier
        textepanier += '<div class="col-12 text-center mt-4"><button id="supprimertout" class="btn btn-danger">Vider le panier<i class="fas fa-trash-alt"></i></button></div>'
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



// Check en temps réeel des saisies du formulaire

const form = document.getElementById("form");

// On check chaque modification du formulaire pour savoir si on active le bouton validation
addEventListener("input", function(e) {
    let checkForm = testFormulaire()
    if (checkForm == 0)
    {
        document
            .getElementById("valideFormulaire")
            .removeAttribute("disabled")
    } else {
        document
            .getElementById("valideFormulaire")
            .setAttribute("disabled", false);
    }
})

// Fonction qui permet de tester chaque champ du formulaire
function testFormulaire() {
    let lastName = document.getElementById('lastName')
	let firstName = document.getElementById('firstName')
	let address = document.getElementById('address')
	let city = document.getElementById('city')
	let email = document.getElementById('email')
    if (!lastName.checkValidity()) return 1;
    if (!firstName.checkValidity()) return 1;
    if (!address.checkValidity()) return 1;
    if (!city.checkValidity()) return 1;
    if (!email.checkValidity()) return 1;
    return 0;
}

// Validation du formulaire
let boutonValidationFormulaire = document.getElementById('valideFormulaire');
boutonValidationFormulaire.addEventListener("click", function (event) {
    event.preventDefault();
    // On met toutes les données saisies dans le formulaire dans un objet contact
    let lastName = document.getElementById('lastName')
	let firstName = document.getElementById('firstName')
	let address = document.getElementById('address')
	let city = document.getElementById('city')
	let email = document.getElementById('email')  
    let contact = {
        lastName: lastName.value,
        firstName: firstName.value,
        email: email.value,
        city: city.value,
        address: address.value
    };
    let products = []
    let totalPanier = 0
    // On rempli un tableau products avec les id des articles présents dans le panier, on calcule aussi le total du panier
    panier.forEach((produit) => {
        products.push(produit.id)
        totalPanier+= produit.prix
    })
    // On stocke l'objet contact et le tableau products dans une variable que l'on va passer au serveur
    infosCommande = { contact, products };
    let params = {
        method: "POST",
        body: JSON.stringify(infosCommande),
        headers: { "Content-type": "application/json" }
    };
    // On appelle la route du serveur en utilisant les paramètres définis et la variable contenant nos informations
    fetch(urlAPI, params)
        .then(response => response.json())
        // On stocke la réponse dans un objet commande
        .then(function (commande) {
            let orderId = commande.orderId
            // On fait une variable récapitulatif qui contient l'orderId et le montantn total
            let recapitulatif = {orderId, totalPanier}
            // On stocke cette variable dans le local storage
            localStorage.setItem("commande", JSON.stringify(recapitulatif))
            // On supprime le panier stocké dans le local storage
            localStorage.removeItem('panier')
            // On redirige vers la page de confirmation
            window.location = "confirmation.html";
        })
        .catch(error => {
            alert("Connexion au serveur impossible")
        });    
})
