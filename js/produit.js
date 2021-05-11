const urlAPI = 'http://localhost:3000/api/cameras';
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

// Execution de la page, on attend que le produits soit récupéré pour lancer l'affichage
(async function () {
    const produit = await getProduit(id)
    afficheProduit(produit)
})()

// Fonction de récupération des infos du produit dont l'id est passé en paramètre
async function getProduit(id) {
    let response = await fetch(`${urlAPI}/${id}`)
    let data = await response.json()
    .catch((error) => {
        alert("Connexion au serveur impossible")
    })
    return data
}

// Fonction d'affichage du produit
function afficheProduit(data) {
    const divProduit = document.getElementById('produit');
    // Pour le produit en question, on génère une vignette
    let vignette =
        `<div class="col-12"><h1 class="detail-produit__titre">${data.name}</h1></div>
        <div class="col-12 mb-4">
            <div class="carte card h-100">
                <img id="product_img" class="card-img-top" src="${data.imageUrl}" alt="Appareil photo ${data.name}">
                <div class="card-body text-center">
                    <p>${data.description}</p>
                    <p id="product_price" class="d-flex justify-content-center">${data.price / 100}.00 €</p>
                    <label for="selectlenses">Choisissez votre optique : </label>
                    <select id="selectlenses"></select>  
                    <hr>
                    <button class="btn btn-info" id="boutonajout">Ajouter au panier</button>
                </div>
            </div>
        </div>`;
    // On rajoute cette vignette à la div #produit
    divProduit.innerHTML = vignette
    // Le select a été créé vide, on le rempli en bouclant sur les lentilles disponibles pour cet article
    const select = document.getElementById("selectlenses")
    for (i = 0; i < data.lenses.length; i++) 
    {
        const selectOption = document.createElement('option');
        select.appendChild(selectOption);
        selectOption.textContent = data.lenses[i];
        selectOption.setAttribute("value", data.lenses[i]);
    }
    // On défini ce qui se passe lorsqu'on clique sur le bouton "ajouter au panier"
    const bouton = document.getElementById("boutonajout");
    bouton.addEventListener("click", function (event) {
        event.preventDefault();
        // On stocke toutes les infos de l'article choisi dans la variable articlechoisi
        let articlechoisi = {
            id : data._id,
            nom : data.name,
            lentille : select.value,
            prix : data.price/100,
            quantite : 1
        }
        // On récupère le panier stocké en local storage
        let panier = JSON.parse(localStorage.getItem('panier'));
        // Si le local storage est vide, la variable panier s'instancie sous la forme d'un tableau vide
        if(panier == null) panier = [];
        // La variable existant changera de valeur si un article identique à celui que l'on a choisi est deja présent dans le panier
        let existant = 0
        // On boucle sur tous les articles présents dans le panier
        panier.forEach((article) => {
            // Si un article identique est déjà présent, on incrémente la quantité de 1 au lieu d'ajouter une nouvelle ligne
            // On met la variable existant à 1 , ce qui permettra de ne pas insérer une nouvelle ligne après cette boucle
            if(article.id == articlechoisi.id && article.lentille == articlechoisi.lentille)
            {
                article.quantite+=1
                existant = 1
            } 
        })
        // Si aucun article existant n'a été décelé, on ajoute l'article au panier
        if(existant == 0) panier.push(articlechoisi);  
        // On transforme en chaine de caractère la variable panier     
        panierstring = JSON.stringify(panier)
        // On stocke le panier ainsi transformé en local storage
        localStorage.setItem('panier', panierstring)
        // On recharge la page
        window.location.reload()
    })
}