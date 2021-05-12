// Execution de la page, on attend que les produits soient récupérés pour lancer l'affichage
(async function () {
    const produits = await getProduits()
    afficheProduits(produits)
    
})()

// Fonction de récupération des produits
async function getProduits() {
    let response = await fetch(urlAPIget)
    let data = await response.json() 
    .catch((error) => {
        alert("Connexion au serveur impossible")
      })
    return data
}

// Fonction d'affichage des produits

function afficheProduits(produits) {
    const divProduits = document.getElementById('produits');
    // Pour chaque produit trouvé, on génère une vignette
    produits.forEach((produit) => {
        let vignette = 
        `<div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-4">
            <a href="produit.html?id=${produit._id}">
                <div class="card carte">
                    <img id="product_img" class="card-img-top p-1" src="${produit.imageUrl}" alt="Appareil photo ${produit.name}">
                    <div class="card-body text-center">
                        <h2 class="card-title h4">${produit.name}</h2>
                        <p id="product_price" class="card-subtitle">${produit.price/100}.00 €</p>
                        <button class="btn btn-info mx-auto mt-4 bouton-voir-produit">Voir le produit</button>
                    </div>
                </div>
            </a>
        </div>`;
        // On rajoute cette vignette à la div #produits
        divProduits.innerHTML += vignette
    })
}