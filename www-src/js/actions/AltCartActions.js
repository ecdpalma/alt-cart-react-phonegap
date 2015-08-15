import alt from '../alt'

class AltCartActions {

    addProduct(sku, update) {
        this.dispatch( { sku, update });
    }

    removeProduct(sku) {
        this.dispatch(sku);
    }

    updateVisibility(visible) {
        this.dispatch(visible);
    }
}

export default alt.createActions(AltCartActions);
