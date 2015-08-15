import alt from '../alt';
import AltCartActions from '../actions/AltCartActions'

class CartStore {

    constructor() {
        this.products = {};
        this.cartVisible = false;
        this.bindActions(AltCartActions);
    }

    setCartVisible(cartVisible) {
        this.cartVisible = cartVisible;
    }

    static getCartItems() {
        return this.getState().products;
    }

    static getCartCount() {
        return Object.keys(this.getState().products).length;
    }

    static getCartTotal() {
        var total = 0;
        for (var product in this.getState().products) {
            if (this.getState().products.hasOwnProperty(product)) {
                total += this.getState().products[product].price * this.getState().products[product].quantity;
            }
        }
        return total.toFixed(2);
    }

    static getCartVisible() {
        return this.getState().cartVisible;
    }

    onAddProduct(data) {
        this.add(data.sku, data.update);
    }

    onRemoveProduct(sku) {
        this.removeItem(sku)
    }

    onUpdateVisibility(visible) {
        this.setCartVisible(visible);
    }

    add(sku, update) {
        update.quantity = sku in this.products ? this.products[sku].quantity + 1 : 1;
        this.products[sku] = Object.assign({}, this.products[sku], update);
    }

    removeItem(sku) {
        delete this.products[sku];
    }
}

export default alt.createStore(CartStore, 'CartStore')
