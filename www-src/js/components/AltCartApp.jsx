import React from 'react';
import CartStore from '../stores/CartStore';
import ProductStore from '../stores/ProductStore';
import AltProduct from './AltProduct';
import AltCart from './AltCart';

function getCartState() {
    return {
        product: ProductStore.getProduct(),
        selectedProduct: ProductStore.getSelected(),
        cartItems: CartStore.getCartItems(),
        cartCount: CartStore.getCartCount(),
        cartTotal: CartStore.getCartTotal(),
        cartVisible: CartStore.getCartVisible()
    };
}

export default class AltCartApp extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = getCartState();
    }

    componentDidMount() {
        ProductStore.listen(this._onChange);
        CartStore.listen(this._onChange);
    }

    componentWillUnmount() {
        ProductStore.removeChangeListener(this._onChange);
        CartStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getCartState());
    }

    render() {
        return (
            <div className="alt-cart-app">
                <AltCart products={this.state.cartItems} count={this.state.cartCount} total={this.state.cartTotal}
                    visible={this.state.cartVisible} />
                <AltProduct product={this.state.product} cartitems={this.state.cartItems}
                    selected={this.state.selectedProduct} />
            </div>
        );
    }
}
