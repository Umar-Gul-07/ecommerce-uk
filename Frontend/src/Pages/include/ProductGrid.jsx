import React, {useContext} from "react";
import {Link} from "react-router-dom";
import api from "../../Utils/Axios";
import {toast} from "react-toastify";
import {Store} from "../../Utils/Store";

const ProductGrid = ({product}) => {
    const {state, dispatch} = useContext(Store);

    const addToCart = async () => {
        try {
            const response = await api.get(`/check-stock/?product_id=${product.id}`);
            const {in_stock, stock} = response.data;
            if (in_stock <= 0) {
                toast.error("Product is out of stock");
                return;
            }
            const currentCartItem = state.Cart.find((item) => item.id === product.id);
            const currentQuantity = currentCartItem ? currentCartItem.quantity : 0;

            if (currentQuantity + 1 > stock) {
                toast.error(`Product out of Stock`);
                return;
            }
            if (in_stock > 0) {
                toast.success("Product Added  Cart");
                dispatch({type: "add-to-cart", payload: product});
                localStorage.setItem("CartItem", JSON.stringify([product]));
                return;
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <>
            <div className="bd-grid__singel-item mb-30">
                <div className="row align-items-center">
                    <div className="col-xxl-4 col-lg-6 col-md-6">
                        <div className="bd-trending__item">
                            <div
                                className="bd-trending__product-thumb text-center">
                                <Link to={{pathname: `/product-details/${product.slug}`,}} state={{product: product}}>
                                    <img
                                        width="200"
                                        height="150"
                                        src={product.image}
                                        alt="product-img"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-8 col-lg-6 col-md-6">
                        <div className="bd-trending__content">
                            <div className="bd-product__content mb-10">
                                <h4 className="bd-product__title ">
                                    <Link to=" product-details">
                                        {product.name}
                                    </Link>
                                </h4>
                                {product.discount_active ?
                                    <div className="bd-product__price">
                                      <span className="bd-product__old-price">
                                        <del className="text-danger">RS {product.price}</del>
                                      </span>
                                        <span
                                            className="bd-product__new-price">
                                        RS {product.discounted_price}
                                      </span>
                                    </div> : <div className="bd-product__price">

                        <span
                            className="bd-product__new-price ">
                                        RS {product.price}
                                      </span>
                                    </div>

                                }
                            </div>
                            <p className="mb-25">
                                {product.description}
                            </p>
                            <div className="bd-product__action-btn">
                                <Link
                                    className="cart-btn bd-add__cart-btn"
                                    onClick={addToCart}

                                >
                                    Add To Cart
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductGrid