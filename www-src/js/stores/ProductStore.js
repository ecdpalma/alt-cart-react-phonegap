import alt from '../alt';
import AltProductActions from '../actions/AltProductActions'

class ProductStore {

    constructor(data) {
        this.product = {};
        this.selected = {};

        this.bindActions(AltProductActions);
    }

    static getProduct() {
        return this.getState().product;
    }

    static getSelected() {
        return this.getState().selected;
    }

    setSelected(index) {
        this.selected = this.product.variants[index];
    }

    onReceive(data) {
        this.product = data[0];
        this.selected = data[0].variants[0];
    }

    onSelect(index) {
        this.setSelected(index);
    }
}

export default alt.createStore(ProductStore, 'ProductStore')
