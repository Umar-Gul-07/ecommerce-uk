import React, {useContext, useEffect, useState} from "react";
import Catagories from "./Catagories";
import {Helmet} from "react-helmet";
import {Link, useLocation} from "react-router-dom";
import Product from "./Product";
import api from "../../Utils/Axios";
import {toast} from "react-toastify";
import {Store} from "../../Utils/Store";

const ProductDetails = ({title}) => {
    const {state, dispatch} = useContext(Store)
    const {Cart} = state;
    const location = useLocation();
    const {product} = location.state || {};
    const [products, setProducts] = useState([])


    const products_list = async () => {
        try {
            const result = await api.get('products-list/');
            const recentProduct = result.data.filter(item =>
                item.category === product.category && item.id !== product.id
            );
            setProducts(recentProduct.slice(0, 4));
        } catch (error) {
        }
    };
    const addToCart = async () => {
        try {
            const response = await api.get(`/check-stock/?product_id=${product.id}`);
            const {in_stock, stock} = response.data;

            if (!in_stock) {
                toast.error("Product is out of stock");
                return;
            }

            const currentCartItem = state.Cart.find((item) => item.id === product.id);
            const currentQuantity = currentCartItem ? currentCartItem.quantity : 0;

            if (currentQuantity + 1 > stock) {
                toast.error(`Product out of Stock`);
                return;
            }
            if (in_stock) {
                toast.success("Product Added to Cart");
                dispatch({type: "add-to-cart", payload: product});
                localStorage.setItem("CartItem", JSON.stringify([...Cart, product]));
                return;
            }
        } catch (e) {
            toast.error(e.message);
        }
    };
    useEffect(() => {
        products_list()
    }, []);

    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Catagories title={title}/>
            <div className="bd__shop-details-area pt-110 pb-75">
                <div className="container small-container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="bd__shop-details-inner mb-55">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="product-details__thumb-inner small-device p-relative">
                                            <div className="bd__shop-details-img-gallery mb-30">
                                                <div
                                                    className="product-details-active swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events swiper-container-free-mode">
                                                    <div className="bd-product__details-large-img w-img">
                                                        <img
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
                                                        <span className="fw-bolder">{product.category}</span>
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
                                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
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
                                                        <div className="tabs-wrapper text-danger mt-35 mb-50">
                                                            {product.discount_percentage} % OFF

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Shop Tab Start */}


                        </div>
                    </div>
                </div>
            </div>

            <div className="bd-related-Product__area mb-95">
                <div className="small-container container">
                    <div className="col-xxl-12 col-xl-12 col-lg-12">
                        <div className="row align-items-center">
                            <div className="col-xxl-4 col-xl-5 col-lg-4">
                                <div className="bd-section__title-wrapper mb-40">
                                    <div className="bd-sm__section-title">
                                        <h3>Related Product</h3>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="bd-trending__item-wrapper">
                            <div className="tab-content" id="nav-tabContent-2">
                                <div
                                    className="tab-pane fade show active"
                                    id="nav-tab-1"
                                    role="tabpanel"
                                    aria-labelledby="nav-tab-1-tab"
                                >
                                    <div className="row">

                                        {products.length > 0 ?
                                            products.map((object) => (
                                                <div className="col-lg-3">
                                                    <Product product={object}/>
                                                </div>
                                            )) :
                                            <div className="text-center">
                                                <span style={{fontSize: "20px"}} className='badge text-danger'>No Related Products Found</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
