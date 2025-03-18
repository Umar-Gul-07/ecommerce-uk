import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {Store} from "../../Utils/Store";
import {toast} from "react-toastify";
import api from "../../Utils/Axios";

const Product = ({product}) => {
    const {state, dispatch} = useContext(Store);
    const {Cart} = state;

    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

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
            <div className="bd-trending__item text-center mb-30">
                <div className="bd-trending__product-thumb border-5">
                    <Link
                        to={{pathname: `/product-details/${product.slug}`}}
                        state={{product: product}}
                    >
                        <img
                            width="200"
                            height="150"
                            src={product.image}
                            alt="product-img"
                        />
                    </Link>
                    <div className="bd-product__action">
                        <Link
                            to="#"
                            className="cart-btn"
                            title="Add to Cart"
                            onClick={addToCart} // Pass function reference here
                        >
                            <i className="fal fa-cart-arrow-down"/>
                        </Link>
                        <Link
                            to="#"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Quick Shop"
                            onClick={handleModalToggle}
                        >
                            <i className="fal fa-eye"/>
                        </Link>
                    </div>
                </div>
                <div className="bd-trending__content">
                    <h4 className="bd-product__title">
                        <Link to="/product-details">
                            {product.name}
                        </Link>
                    </h4>
                    {product.discount_active ? (
                        <div className="bd-product__price">
                            <span className="bd-product__old-price">
                                <del className="text-danger">RS {product.price}</del>
                            </span>
                            <span className="bd-product__new-price">
                                RS {product.discounted_price}
                            </span>
                        </div>
                    ) : (
                        <div className="bd-product__price">
                            <span className="bd-product__new-price">
                                RS {product.price}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            {showModal && (
                <div
                    className="product__modal-sm modal fade show"
                    id="productmodal"
                    tabIndex={-1}
                    aria-modal="true"
                    role="dialog"
                    style={{display: "block", paddingLeft: 0}}
                >
                    {/* modal content here */}
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="product__modal">
                                <div className="product__modal-wrapper p-relative">
                                    <button
                                        type="button"
                                        onClick={handleModalToggle}
                                        className="close product__modal-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <i className="fal fa-times"/>
                                    </button>
                                    <div className="modal__inner">
                                        <div className="bd__shop-details-inner">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="product-details__thumb-inner p-relative">
                                                        <div
                                                            className="product-details__thumb-inner small-device p-relative">
                                                            <div className="bd__shop-details-img-gallery mb-30">
                                                                <div
                                                                    className="product-details-active swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events swiper-container-free-mode">
                                                                    <div
                                                                        className="bd-product__details-large-img w-img">
                                                                        <img
                                                                            height="100%"
                                                                            src={product.image}
                                                                            alt="product-details-img"
                                                                        />
                                                                    </div>
                                                                    <span
                                                                        className="swiper-notification"
                                                                        aria-live="assertive"
                                                                        aria-atomic="true"
                                                                    />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="modal-product-info shop-details-info">

                                                        <h3>{product.name}</h3>
                                                        <div className="product-price">
                                                            {product.discount_active ?
                                                                <div className="bd-product__price">
                                      <span className="bd-product__old-price">
                                        <del className='text-danger'>RS {product.price}</del>
                                      </span>
                                                                    <span
                                                                        className="bd-product__new-price">
                                        RS {product.discounted_price}
                                      </span>
                                                                </div> : <div className="bd-product__price">

                        <span
                            className="bd-product__new-price">
                                        RS {product.price}
                                      </span>
                                                                </div>

                                                            }

                                                        </div>

                                                        <div className="modal-product-meta bd__product-details-menu-1">
                                                            <ul>
                                                                <li>
                                                                    <strong>Category:</strong>
                                                                    <span
                                                                        className="fw-bolder">{product.category}</span>
                                                                </li>
                                                            </ul>
                                                        </div>

                                                        <div className="product-quantity-cart mb-25">

                                                            <Link
                                                                onClick={addToCart}
                                                                className="cart-btn bd-fill__btn"
                                                                to="/shop"
                                                                title="Add to Cart"
                                                            >
                                                                <i className="fal fa-cart-arrow-down"/>
                                                                Add to Cart
                                                            </Link>
                                                        </div>
                                                        <div className="product_info-faq-area pt-50">
                                                            <nav className="product-details-tab">
                                                                <div className="nav nav-tabs" id="nav-tab"
                                                                     role="tablist">
                                                                    <Link
                                                                        className="nav-item nav-link show"
                                                                        id="nav-general-tab"
                                                                        data-bs-toggle="tab"
                                                                        to="#nav-general"
                                                                        role="tab"
                                                                        aria-selected="false"
                                                                    >
                                                                        Description
                                                                    </Link>
                                                                    <Link
                                                                        className="nav-item nav-link active"
                                                                        id="nav-seller-tab"
                                                                        data-bs-toggle="tab"
                                                                        to="#nav-seller"
                                                                        role="tab"
                                                                        aria-selected="true"
                                                                    >
                                                                        Discount Offered
                                                                    </Link>

                                                                </div>
                                                            </nav>
                                                            <div
                                                                className="tab-content product-details-content"
                                                                id="nav-tabContent"
                                                            >
                                                                <div
                                                                    className="tab-pane fade"
                                                                    id="nav-general"
                                                                    role="tabpanel"
                                                                >
                                                                    <div className="tabs-wrapper mt-35 mb-40">
                                                                        <div className="product__details-des">
                                                                            <p>
                                                                                {product.description}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="tab-pane fade active show"
                                                                    id="nav-seller"
                                                                    role="tabpanel"
                                                                >
                                                                    <div
                                                                        className="tabs-wrapper text-danger mt-35 mb-50">
                                                                        {product.discount_percentage} % OFF

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};

export default Product;
