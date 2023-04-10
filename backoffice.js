//endpoint da contattare e token da utilizzare per la fetch
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkYTdlMWIxNGE1MTAwMTQ2NjNmZmYiLCJpYXQiOjE2ODA3MTM2OTgsImV4cCI6MTY4MTkyMzI5OH0.N_Yr4TQ2Cc4qTFpBrUUgzeyVxQRYXwLd_TlAZtiXtX8";
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

//funzione che aggiunge un nuovo prodotto
const addNewProduct = async (name, desc, brand, imgUrl, price) => {

    let data;
    const myProduct = {

        name: name,
        description: desc,
        brand: brand,
        imageUrl: imgUrl,
        price: price
    };

    try {
        await fetch(endpoint, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(myProduct),
        }).then(response => response.json()).then(result => data = result);

        return data;
    } catch (error) {
        console.log(error);
    }
};

const resetFields = () => {
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('brand').value = '';
    document.getElementById('imgUrl').value = '';
    document.getElementById('price').value = '';
};

//al caricamento della pagina...
window.addEventListener('load', () => {
    let addButton = document.getElementById('add');
    //imposto un listener associato al pulsante di aggiunta del prodotto
    addButton.addEventListener('click', async () => {
        //recupero le informazioni del prodoitto inserite dall'utente
        let name = document.getElementById('name').value;
        let description = document.getElementById('description').value;
        let brand = document.getElementById('brand').value;
        let imgUrl = document.getElementById('imgUrl').value;
        let price = document.getElementById('price').value;
        //verifico se sono tutte presenti
        if (name !== '' && description !== '' && brand !== '' && imgUrl !== '' && price !== '') {
            //aggiungo il nuovo prodotto
            const data = await addNewProduct(name, description, brand, imgUrl, parseFloat(price));
            //reset dei campi
            resetFields();
        } else {
            //alert che appare in caso di dati mancanti
            alert('Dati mancanti');
        }

    });
});