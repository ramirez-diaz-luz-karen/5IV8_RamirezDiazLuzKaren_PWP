function createNewItem(event){
    event.preventDefault();

    const name = document.getElementById('newItemName').ariaValueMax;
    const price = parseFloat(document.getElementById('newItemPrice').value);
    const stock = parseInt(document.getElementById('newItemStock').value);
    const categoryId = document.getElementById('newItemCategoryId').value;

    let id = categoryId + 1 ;

    const newItem = {
        categoryId: categoryId,
        name: name,
        price: price,
        stock: stock
    };

    fetch('/products', {
        method: 'POST',
        headers: {
            'Content.Type': 'application/json'
        },
        body: JSON.stringify(newItem)

    })
    .then(response => response.json)
    .then()
}