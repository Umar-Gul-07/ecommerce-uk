import React, {useContext, useState} from "react";
import Catagories from "./Catagories";
import {Helmet} from "react-helmet";
import {Store} from "../../Utils/Store";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../../Utils/Axios";

const AddToCart = ({title}) => {
        const {state, dispatch} = useContext(Store);
        const {Cart} = state;
        const navigate = useNavigate()


        const [cartItems, setCartItems] = useState(Cart);
        const handleQuantityChange = async (productId, newQuantity) => {
            if (newQuantity < 1) return; // Prevent setting quantity to less than 1

            const currentCartItem = cartItems.find(item => item.id === productId);
            const currentQuantity = currentCartItem ? currentCartItem.quantity : 0;

            // Prevent exceeding stock before making the optimistic update
            if (newQuantity > currentQuantity) {
                const response = await api.get(`/check-stock/?product_id=${productId}`);
                const {in_stock, stock} = response.data;

                if (in_stock <= 0) {
                    toast.error("Product is out of stock");
                    return; // Prevent further action if out of stock
                }

                if (newQuantity > stock) {
                    toast.error(`Product out of Stock`);
                    return; // Prevent further action if exceeding stock
                }
            }

            // Update cart items with the valid quantity
            const updatedCartItems = cartItems.map(item => {
                if (item.id === productId) {
                    return {...item, quantity: newQuantity, total: newQuantity * item.price};
                }
                return item;
            });

            setCartItems(updatedCartItems); // Update the state immediately

            // Dispatch updated cart items to the global state and local storage
            dispatch({type: "update-cart", payload: updatedCartItems});
            localStorage.setItem("CartItem", JSON.stringify(updatedCartItems));
        };


        const handleRemoveItem = (productId) => {
            const updatedCartItems = cartItems.filter(item => item.id !== productId);
            setCartItems(updatedCartItems);
            dispatch({type: "remove-from-cart", payload: {id: productId}});
            localStorage.setItem("CartItem", JSON.stringify(updatedCartItems));
        };

        const getTotalPrice = () => {
            const total = cartItems.reduce((total, item) => {
                const itemTotal = parseFloat(item.total) || 0;
                return total + itemTotal;
            }, 0);
            return total.toFixed(2);
        };

        const addCartCheck = () => {
            toast.warning("Add Product to Cart...");
            setTimeout(() => {
                navigate("/shop");
            }, 500);
        };

        return (
            <div>
                <Helmet>{title}</Helmet>
                <Catagories title={title}/>

                <section className="cart-area pt-110 pb-130">
                    <div className="container small-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="table-content table-responsive">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th className="product-thumbnail">Images</th>
                                                    <th className="cart-product-name">Product</th>
                                                    <th className="product-price">Unit Price</th>
                                                    <th className="product-quantity">Quantity</th>
                                                    <th className="product-subtotal">Total</th>
                                                    <th className="product-remove">Remove</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {cartItems.map(item => (
                                                    <tr key={item.id}>
                                                        <td className="product-thumbnail">
                                                            <Link to={`/product-details/${item.slug}`}>
                                                                <img src={item.image} alt="img"/>
                                                            </Link>
                                                        </td>
                                                        <td className="product-name">
                                                            <Link to={`/product-details/${item.slug}`}>{item.name}</Link>
                                                        </td>
                                                        <td className="product-price">
                                                        <span
                                                            className="amount">RS {parseFloat(item.price).toFixed(2)}</span>
                                                        </td>
                                                        <td className="product-quantity text-center">
                                                            <div className="product-quantity mt-10 mb-10">
                                                                <div className="product-quantity-form">
                                                                    <form action="#">
                                                                        <button
                                                                            type="button"
                                                                            className="cart-minus"
                                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                                        >
                                                                            <i className="far fa-minus"/>
                                                                        </button>
                                                                        <input
                                                                            className="cart-input"
                                                                            type="text"
                                                                            value={item.quantity}
                                                                            readOnly
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            className="cart-plus"
                                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                                        >
                                                                            <i className="far fa-plus"/>
                                                                        </button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="product-subtotal">
                                                            <span className="amount">RS {item.total}</span>
                                                        </td>
                                                        <td className="product-remove">
                                                            <Link to="#" onClick={() => handleRemoveItem(item.id)}>
                                                                <i style={{color: "red"}} className="fa fa-trash"/>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="cart-page-total mt-0">
                                            <h2>Cart totals</h2>
                                            <ul className="mb-20">
                                                <li>
                                                    Subtotal <span>RS {getTotalPrice()}</span>
                                                </li>
                                                <li>
                                                    Total <span>RS {getTotalPrice()}</span>
                                                </li>
                                            </ul>
                                            {Cart.length > 0 ?
                                                <Link className="bd-border__btn" to="/checkout">
                                                    Proceed to checkout
                                                </Link>
                                                :
                                                <Link onClick={addCartCheck} className="bd-border__btn" to="/shop">
                                                    Proceed to checkout
                                                </Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
;

export default AddToCart;
