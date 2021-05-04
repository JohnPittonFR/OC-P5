const urlAPI = 'http://localhost:3000/api/cameras';

(async function () {
    const produits = await getProduits()
    afficheProduits(produits)
    
})()

async function getProduits() {
    let response = await fetch(urlAPI)
    let data = await response.json() 
    .catch((error) => {
        alert("Connexion au serveur impossible")
      })
    return data
}

function afficheProduits(produits) {
    const divProduits = document.getElementById('produits');
    produits.forEach((produit) => {
        let cardCode = 
        `<div class="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 product-card">
            <div class="card h-100">
                <a id="" href="pages/view-product.html?product_id=${produit._id}"><img id="product_img" class="card-img-top" src="${produit.imageUrl}" alt="Ourson ${produit.name}"></a>
                <div class="card-body">
                    <h4 class="card-title d-flex justify-content-center">
                        <a class="product_name" class="text-info" href="pages/view-product.html?product_id=${produit._id}"">${produit.name}</a>
                    </h4>
                    <h5 id="product_price" class="d-flex justify-content-center">${produit.price/100}.00€</h5>
                    <hr>
                    <a href="pages/view-product.html?product_id=${produit._id}" class="btn btn-info col-xl-9 col-lg-9 col-md-12 d-flex justify-content-center mx-auto">Voir le produit</a>
                </div>
            </div>
        </div>`;
        divProduits.innerHTML += cardCode
    })
}