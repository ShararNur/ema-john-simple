import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import fakeData from '../../fakeData/products.json'
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

const Shop = () => {
    const shuffledData = shuffleArray(fakeData);
    const first10 = shuffledData.slice(0, 10)
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    }, [])

    // useEffect(() => {
    //     //*! Fetch Data from API */
    //     fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON')
    //         .then(response => response.json())
    //         .then(data => {
    //             let fakeData = shuffleArray(data)
    //             setProducts(fakeData.slice(0, 10))
    //         })
    // }, []);

    const handleAddProduct = (product) => {
        // console.log('Product added', product);
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        // console.log(sameProduct);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            // console.log(count)
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);
        addToDb(product.key);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className="main-button">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;