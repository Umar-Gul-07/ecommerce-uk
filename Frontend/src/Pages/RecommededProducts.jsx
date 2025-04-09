import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import api from "../Utils/Axios";
import ProductGrid from "./include/ProductGrid";
import { Store } from "../Utils/Store";
import Product from "./include/Product";

const RecommendedProducts = ({ title }) => {
    const [allProducts, setAllProducts] = useState([]);
    const { state, dispatch } = useContext(Store);
    const { PurchasedProducts } = state;

    // Fetch all products
    const get_products = async () => {
        try {
            const result = await api.get("products-list/");
            setAllProducts(result.data);
        } catch (e) {
            console.log("Products Not Found");
        }
    };

    // Related products for a single product
    const getRelatedProducts = (product) => {
        return allProducts.filter(
            (item) =>
                item.category === product.category && item.id !== product.id
        );
    };

    // Remove product from PurchasedProducts
    const removeFromPurchased = (productId) => {
        // Filter out the removed product
        const updatedPurchased = PurchasedProducts.filter((item) => item.id !== productId);

        // Update the context and localStorage immediately
        localStorage.setItem("PurchasedProducts", JSON.stringify(updatedPurchased));
        dispatch({ type: "remove-from-purchased", payload: updatedPurchased });
        window.location.reload(); // Reload the page after removing the item
    };

    useEffect(() => {
        get_products();
    }, []);

    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <main>
                <section className="bd-shop__area pt-110 pb-85">
                    <div className="container">
                        {PurchasedProducts.length > 0 ? (
                            PurchasedProducts.map((product) => (
                                <div key={product.id} className="mb-5">
                                    <div className="row mb-3 justify-content-center text-center">
                                        <h4 className="mb-3">You Purchased:</h4>
                                        <div className="col-lg-3">
                                            <Product product={product} />
                                            {/* Add button to remove purchased item */}
                                            <button
                                                className="btn btn-danger mt-2"
                                                onClick={() => removeFromPurchased(product.id)}
                                            >
                                                Remove from Purchased
                                            </button>
                                        </div>
                                    </div>

                                    <h5 className="mb-2">You may also like:</h5>
                                    <div className="row">
                                        {getRelatedProducts(product).length > 0 ? (
                                            getRelatedProducts(product).map((relatedProduct) => (
                                                <div className="col-lg-3" key={relatedProduct.id}>
                                                    <Product
                                                        product={relatedProduct}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center ms-3 text-danger">
                                                No related products found.
                                            </div>
                                        )}
                                    </div>
                                    <hr className="my-4" />
                                </div>
                            ))
                        ) : (
                            <div className="text-center">
                                <h5 className="text-danger">No purchased products yet.</h5>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default RecommendedProducts;
