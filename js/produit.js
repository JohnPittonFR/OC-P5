const urlAPI = 'http://localhost:3000/api/cameras';
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

(async function () {
    const produit = await getProduit(id)
    afficheProduit(produit)
})()

async function getProduit(id) {
    let response = await fetch(`${urlAPI}/${id}`)
    let data = await response.json()
    .catch((error) => {
        alert("Connexion au serveur impossible")
    })
    return data
}

function afficheProduit(data) {
console.log(data);
    const divProduit = document.getElementById('produit');
    let vignette =
        `<div class="col-12"><h1 class="detail-produit__titre">${data.name}</h1></div>
        <div class="col-8 mb-4 carte">
            <div class="card h-100">
                <a id=""><img id="product_img" class="card-img-top" src="${data.imageUrl}" alt="Ourson ${data.name}"></a>
                <div class="card-body">
                    <h1 class="card-title d-flex justify-content-center">
                        ${data.name}
                    </h1>
                    <p>${data.description}</p>
                    <p id="product_price" class="d-flex justify-content-center">${data.price / 100}.00 €</p>
                    <hr>
                </div>
            </div>
        </div>`;
    divProduit.innerHTML = vignette
}