import React from 'react';
import { useParams } from 'react-router';
import data from '../../fakeData/products.json'
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const product = data.find(pd => pd.key === productKey)
    // console.log(product);
    return (
        <div>
            <h1>Your Product Details.</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;