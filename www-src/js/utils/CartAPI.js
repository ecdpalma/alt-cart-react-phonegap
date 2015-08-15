import AltProductActions from '../actions/AltProductActions';

export default {

    getProductData() {
        var data = JSON.parse(localStorage.getItem('product'));
        AltProductActions.receive(data);
    }
}
