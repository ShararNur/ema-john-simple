import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON')
        .then(response => response.json())
        .then(data => setProducts(data.slice(0,10)))
    }, []);

    const handleAddProduct = (product) => {
        // console.log('Product added', product);
        const newCart = [...cart,product];
        setCart(newCart);

    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd => <Product
                        handleAddProduct = {handleAddProduct} 
                        product={pd}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;