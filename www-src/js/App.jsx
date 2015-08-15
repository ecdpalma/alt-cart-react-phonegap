import '../css/app.css';
import React from 'react';
import ProductData from './ProductData';
import CartAPI from './utils/CartAPI';
import AltCartApp from './components/AltCartApp';

if (typeof window.cordova !== "undefined") {
    require('./index');
}

main();

function main() {

    ProductData.init();

    CartAPI.getProductData();

    var app = document.createElement('div');
    document.body.appendChild(app);

    React.render(<AltCartApp />, app);
}
