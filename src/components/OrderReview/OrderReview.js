import React from 'react';

import useProducts from '../../Hooks/useProducts';
import useCart from '../../Hooks/useCart';
import Cart from '../Cart/Cart';
import ItemReview from '../ItemReview/ItemReview';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';
import { useHistory } from 'react-router';
// import { getStoredCart } from '../../utilities/fakedb';


const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    const history = useHistory();

    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key);

    }
    const handlePlaceOrder = () => {
        history.push('/placeorder')
        setCart([]);
        clearTheCart();

    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ItemReview
                        key={product.key}
                        product={product}
                        handleRemove={handleRemove}
                    ></ItemReview>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="btn-regular">place order</button>

                </Cart>

            </div>

        </div>
    );
};

export default OrderReview;