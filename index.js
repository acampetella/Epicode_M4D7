//endpoint da contattare e token da utilizzare per la fetch
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkYTdlMWIxNGE1MTAwMTQ2NjNmZmYiLCJpYXQiOjE2ODA3MTM2OTgsImV4cCI6MTY4MTkyMzI5OH0.N_Yr4TQ2Cc4qTFpBrUUgzeyVxQRYXwLd_TlAZtiXtX8";

//funzione che recupera i prodotti dall'endpoint
const getProducts = async () => {

    let products;
    try {
        await fetch(endpoint, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            }
        }).then(response => response.json()).then(data => products = data);

        return products;
    } catch (error) {
        console.log(error);
    }

};

//funzione che crea e restituisce una card
const createCard = () => {
    let bodyCard = '<ul class="list-group list-group-flush">' + 
    '<li class="list-group-item"></li>' +
    '<li class="list-group-item"></li>' + 
    '<li class="list-group-item"></li>' +
    '<li class="list-group-item"></li>'+ '</ul>';
    let card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';
    card.innerHTML = bodyCard;
    return card;
};

//funzione che imposta i valori del prodotto nella card
const setCard = (card, product) => {
    let listItems = card.getElementsByTagName('li');
    listItems[0].innerHTML = `<strong>Nome: </strong>${product.name}`;
    listItems[1].innerHTML = `<strong>Descrizione: </strong>${product.description}`;
    listItems[2].innerHTML = `<strong>Marca: </strong>${product.brand}`;
    listItems[3].innerHTML = `<strong>Prezzo: </strong>${product.price}`;
    return card;
};

//funzione che crea la griglia a partire dalla lista dei prodotti
const createGrid = (products) => {
    let row = document.querySelector('div.container > div.row');
    products.forEach(item => {
        let card = createCard();
        card = setCard(card, item);
        let col = document.createElement('div');
        col.classList.add('col', 'my-3', 'col-6', 'col-sm-4', 'col-md-3');
        col.append(card);
        row.append(col);
    });
};

//al caricamento della pagina...
window.addEventListener('load', async () => {
    let products = await getProducts();
    createGrid(products);
});