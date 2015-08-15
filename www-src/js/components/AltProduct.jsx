import React from 'react';
import AltCartActions from '../actions/AltCartActions';
import AltProductActions from '../actions/AltProductActions';

export default class AltProduct extends React.Component {

    constructor() {
        super();
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(event) {
        var sku = this.props.selected.sku;
        var update = {
            name: this.props.product.name,
            type: this.props.selected.type,
            price: this.props.selected.price
        };
        AltCartActions.addProduct(sku, update);
        AltCartActions.updateVisibility(true);
    }

    selectVariant(event) {
        AltProductActions.select(event.target.value);
    }

    render() {
        var ats = (this.props.selected.sku in this.props.cartitems) ?
        this.props.selected.inventory - this.props.cartitems[this.props.selected.sku].quantity :
            this.props.selected.inventory;
        return (
            <div className="alt-product">
                <img src={'img/' + this.props.product.image} />
                <div className="alt-product-detail">
                    <h1 className="name">{this.props.product.name}</h1>
                    <p className="description">{this.props.product.description}</p>
                    <p className="price">Price: ${this.props.selected.price}</p>
                    <select onChange={this.selectVariant}>
                        {this.props.product.variants.map(function(variant, index) {
                            return (
                                <option key={index} value={index}>{variant.type}</option>
                            );
                        })}
                    </select>
                    <button type="button" onClick={this.addToCart} disabled={ats > 0 ? '' : 'disabled'}>
                        {ats > 0 ? 'Add To Cart' : 'Sold Out'}
                    </button>
                </div>
            </div>
        );
    }
}
