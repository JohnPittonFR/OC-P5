const commande = JSON.parse(localStorage.getItem('commande'));
afficheConfirmation(commande)

function afficheConfirmation(commande) {
    let confirmation = document.getElementById('confirmation');
    let texteConfirmation = ` 
        <div class="col-12 text-center mt-3">Votre commande <span class="font-weight-bold">${commande.orderId}</span> a bien été prise en compte</div>
        <div class="col-12 text-center mt-4">Un montant de <span class="font-weight-bold">${commande.totalPanier/100}.00 €</span> vous sera débité à l'expédition</div>
        <div class="col-12 text-center mt-5">Tout l'équipe d'Orinoco vous remercie</div>
        `
    confirmation.innerHTML += texteConfirmation
}