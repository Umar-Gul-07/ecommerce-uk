import { useContext, useEffect, useState } from "react";
import { Store } from "../Utils/Store";
import { useNavigate } from "react-router-dom";
import api from "../Utils/Axios";

const RecommendedProductsModal = ({ handleModalClose }) => {
    const { state, dispatch } = useContext(Store);
    const navigate = useNavigate();
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // State to store products

    // Function to fetch products
    const get_products = async () => {
        try {
            const result = await api.get('products-list/');
            setAllProducts(result.data); // Update state with the fetched products
        } catch (e) {
            console.log("Products Not Found", e);
        }
    };

    useEffect(() => {
        // Fetch products initially
        get_products();
    }, []); // Only run on component mount

    useEffect(() => {
        if (allProducts.length === 0 || state.PurchasedProducts.length === 0) return; // Ensure both data are available before filtering

        // Filter products based on the category of purchased products
        const purchasedCategories = state.PurchasedProducts.map((productId) => {
            const product = allProducts.find((item) => item.id === productId);
            return product?.category; // Assuming each product has a 'category' field
        });

        console.log("here")
        console.log(purchasedCategories)

        const recommended = allProducts.filter((product) =>
            purchasedCategories.includes(product.category) && !state.PurchasedProducts.some(p => p.id === product.id)
        );

        setRecommendedProducts(recommended); // Update recommended products
    }, [state.PurchasedProducts, allProducts]); // Trigger when PurchasedProducts or allProducts change

    return (
        <div
            className="product__modal-sm modal fade show"
            id="productmodal"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
            style={{ display: state.showRecommendationModal ? "block" : "none" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="product__modal">
                        <div className="product__modal-wrapper p-relative">
                            <button
                                type="button"
                                onClick={() => {
                                    dispatch({ type: "hide-recommendation-modal" });
                                    handleModalClose();
                                }}
                                className="close product__modal-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="fal fa-times" />
                            </button>
                            <div className="modal__inner text-center justify-content-center">
                                <div className="recommended-products">
                                    <h3>Recommended Products</h3>
                                    <div className="row justify-content-center">
                                        {recommendedProducts.map((product) => (
                                            <div className="col-md-4" key={product.id}>
                                                <div className="product-item text-center">
                                                    <img width="200px" src={product.image} alt={product.name} />
                                                    <h4>{product.name}</h4>

                                                    {product.discount_active ? (
                                                        <div className="bd-product__price">
                                                            <span className="bd-product__old-price">
                                                                <del className="text-danger">£ {product.price}</del>
                                                            </span>
                                                            <span className="bd-product__new-price">
                                                                £ {product.discounted_price}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="bd-product__price">
                                                            <span className="bd-product__new-price">
                                                                £ {product.price}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        className="view-more-btn"
                                        onClick={() => navigate("/shop")}
                                    >
                                        View More Products
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendedProductsModal;
