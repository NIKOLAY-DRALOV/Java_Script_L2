const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
let btnBasket = document.getElementById('cart-btn');

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


//Создаем класс корзина Cart
class ProductCart {
    constructor(container = '.basket-products'){
        this.container = container;
        this.goods = [];//массив товаров
        this._getProductsCart()
            .then(data => { //data - объект js
                this.goods = [data];
                this.render()
            });
    }
    _getProductsCart(){
        return fetch(`${API}/getBasket.json`)
            .then( result=> result.json())
            .catch(error => {
                console.log(error);
                
            })
    }

    render() {
        const block = document.querySelector(this.container);
            for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.goods.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
            
        }
    }

    // метод добавления товара в корзину
    addCartItem(cartItem) {
        
    }
    // метод удаления товара из корзины
    clearCartItem(cartItem) {
        
    }

    // Метод для вывода итоговой суммы корзины
    totalCartPrice () {
        let totalPrice = document.getElementById('goods-list__total'); 
        let sum = 0;
        this.goods.forEach (good => { 
            sum += good.price
        });
        totalPrice.innerText = `Итого  ${sum} рублей`;
    }
}





class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}


let list = new ProductsList();
list.render();

var openBasket = () => {
    cart.render();
    goodsListSection.style.display = 'block';
};
let cart = new ProductCart();
btnBasket.addEventListener('click', openBasket);