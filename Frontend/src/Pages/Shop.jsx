import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import api from "../Utils/Axios";
import Product from "./include/Product";
import ProductGrid from "./include/ProductGrid";

const Shop = ({title}) => {
    const [allProducts, setAllProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOption, setSortOption] = useState("default");
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const productsPerPage = 8;

    const get_products = async () => {
        try {
            const result = await api.get(`products-list/`);
            setAllProducts(result.data);
            filterAndSortProducts(result.data);
        } catch (e) {
            console.log("Products Not Found");
        }
    };

    const get_categories = async () => {
        try {
            const result = await api.get(`categories-list/`);
            setCategories(result.data);
        } catch (e) {
            console.log("Categories Not Found");
        }
    };

    useEffect(() => {
        get_products();
        get_categories();
    }, []);

    // Function to filter products based on search term and selected categories
    const filterAndSortProducts = (products) => {
        let filteredProducts = products;

        // Apply category filtering
        if (selectedCategories.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedCategories.includes(product.category) // Adjust based on your product category structure
            );
        }

        // Apply search filtering
        if (searchTerm) {
            filteredProducts = filteredProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply sorting
        sortProducts(sortOption, filteredProducts);
    };

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
        filterAndSortProducts(allProducts);
        setCurrentPage(1); // Reset to the first page after searching
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1); // Reset to first page when sorting
        filterAndSortProducts(displayedProducts);
    };

    const sortProducts = (sortOption, productsToSort) => {
        let sortedProducts = [...productsToSort];
        if (sortOption === "newly-published") {
            sortedProducts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
        } else if (sortOption === "most-popular") {
            sortedProducts.sort((a, b) => b.popularity - a.popularity);
        } else if (sortOption === "discounted") {
            sortedProducts.sort((a, b) => b.discount - a.discount);
        }
        setDisplayedProducts(sortedProducts);
        setTotalPages(Math.ceil(sortedProducts.length / productsPerPage));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(cat => cat !== category)
                : [...prev, category]
        );
        filterAndSortProducts(allProducts);
        setCurrentPage(1); // Reset to the first page after filtering by category
    };

    const paginatedProducts = displayedProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <main>
                <section className="bd-shop__area pt-110 pb-85">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-8">
                                <div className="bd-sidebar__widget-warpper mb-60">
                                    <div className="bd-product__filters">
                                        <div className="bd-filter__widget child-content-hidden">
                                            <h4 className="bd-filter__widget-title drop-btn">
                                                Categories
                                            </h4>
                                            <div className="bd-filter__content">
                                                <div className="bd-product__check">
                                                    <ul>
                                                        {categories.length > 0 ?
                                                            categories.map((object) => (
                                                                <li key={object.id}>
                                                                    <input
                                                                        className="check-input"
                                                                        type="checkbox"
                                                                        id={`category-${object.id}`}
                                                                        checked={selectedCategories.includes(object.name)}
                                                                        onChange={() => handleCategoryChange(object.name)}
                                                                    />
                                                                    <label className="check-label"
                                                                           htmlFor={`category-${object.id}`}>
                                                                        {object.name}
                                                                    </label>
                                                                </li>
                                                            )) : <h1>No categories Found</h1>
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bd-filter__content">
                                            <a href="product-details.html">
                                                <div className="bd-flash___banner-item p-relative">
                                                    <div className="bd-flash__banner-thumb w-img">
                                                        <img
                                                            src="assets/img/trending/flash/flash-banner-03.jpg"
                                                            alt="flash-banner"
                                                        />
                                                    </div>
                                                    <div className="bd-flash__banner-content">
                                                        <h4>Freshly</h4>
                                                        <h3>Maitta Potato</h3>
                                                        <h6>
                                                            From<span className="price">$9.00</span>
                                                        </h6>
                                                    </div>
                                                    <div className="bd-flash__banner-shape">
                                                        <div className="text">
                                                            <span>Hot</span>Item
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-9 col-xl-8 col-lg-8">
                                <div className="row">
                                    <div className="col-xl-4">
                                        <div className="bd-top__filter-search p-relative mb-30">
                                            <form className="bd-top__filter-input">
                                                <input
                                                    type="text"
                                                    placeholder="Search keyword..."
                                                    value={searchTerm}
                                                    onChange={(e) => handleSearch(e.target.value)}
                                                />
                                                <button type="button">
                                                    <i className="fa-regular fa-magnifying-glass"/>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-xl-8">
                                        <div className="bd-filter__tab-inner mb-30">
                                            <div className="bd-top__filter">
                                                <div className="bd-Product__tab pl-5">
                                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <button
                                                                className="nav-link active"
                                                                id="home-tab"
                                                                data-bs-toggle="tab"
                                                                data-bs-target="#home"
                                                                type="button"
                                                                role="tab"
                                                                aria-controls="home"
                                                                aria-selected="true"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="15"
                                                                     height="15.001" viewBox="0 0 15 15.001">
                                                                    <path id="Path_12058" data-name="Path 12058"
                                                                          d="M-1362.125-3804a.626.626,0,0,1-.625-.625v-2.5a.626.626,0,0,1,.625-.625h2.5a.625.625,0,0,1,.625.625v2.5a.625.625,0,0,1-.625.625Zm-5.624,0a.626.626,0,0,1-.626-.625v-2.5a.626.626,0,0,1,.626-.625h2.5a.625.625,0,0,1,.625.625v2.5a.625.625,0,0,1-.625.625Zm-5.625,0a.625.625,0,0,1-.625-.625v-2.5a.625.625,0,0,1,.625-.625h2.5a.625.625,0,0,1,.625.625v2.5a.625.625,0,0,1-.625.625Zm11.249-5.625a.626.626,0,0,1-.625-.625v-2.5a.626.626,0,0,1,.625-.625h2.5a.626.626,0,0,1,.625.625v2.5a.625.625,0,0,1-.625.625Zm-5.624,0a.626.626,0,0,1-.626-.625v-2.5a.626.626,0,0,1,.626-.625h2.5a.626.626,0,0,1,.625.625v2.5a.625.625,0,0,1-.625.625Zm-5.625,0a.625.625,0,0,1-.625-.625v-2.5a.626.626,0,0,1,.625-.625h2.5a.626.626,0,0,1,.625.625v2.5a.625.625,0,0,1-.625.625Zm11.249-5.625a.626.626,0,0,1-.625-.625v-2.5a.626.626,0,0,1,.625-.626h2.5a.626.626,0,0,1,.625.626v2.5a.625.625,0,0,1-.625.625Zm-5.624,0a.626.626,0,0,1-.626-.625v-2.5a.627.627,0,0,1,.626-.626h2.5a.626.626,0,0,1,.625.626v2.5a.625.625,0,0,1-.625.625Zm-5.625,0a.625.625,0,0,1-.625-.625v-2.5a.626.626,0,0,1,.625-.626h2.5a.626.626,0,0,1,.625.626v2.5a.625.625,0,0,1-.625.625Z"
                                                                          transform="translate(1374 3819)"
                                                                          fill="#777"></path>
                                                                </svg>
                                                            </button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button
                                                                className="nav-link"
                                                                id="shop-filter-bar"
                                                                data-bs-toggle="tab"
                                                                data-bs-target="#profile"
                                                                type="button"
                                                                role="tab"
                                                                aria-controls="profile"
                                                                aria-selected="false"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="17.3"
                                                                     height="15" viewBox="0 0 17.3 15">
                                                                    <path id="Path_12057" data-name="Path 12057"
                                                                          d="M-2514-4232a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-2514-4232Zm6.179,1.328a1.236,1.236,0,0,1-1.236-1.235,1.236,1.236,0,0,1,1.236-1.236h9.885a1.235,1.235,0,0,1,1.236,1.236,1.235,1.235,0,0,1-1.236,1.235ZM-2514-4238a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-2514-4238Zm6.179,1.15a1.236,1.236,0,0,1-1.236-1.235,1.236,1.236,0,0,1,1.236-1.236h9.885a1.235,1.235,0,0,1,1.236,1.236,1.235,1.235,0,0,1-1.236,1.235ZM-2514-4244a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-2514-4244Zm6.179.971a1.236,1.236,0,0,1-1.236-1.235,1.236,1.236,0,0,1,1.236-1.236h9.885a1.235,1.235,0,0,1,1.236,1.236,1.235,1.235,0,0,1-1.236,1.235Z"
                                                                          transform="translate(2514 4245.5)"
                                                                          fill="#777"></path>
                                                                </svg>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bd-sort__type-filter">
                                                <select
                                                    className="sorting-list"
                                                    value={sortOption}
                                                    onChange={handleSortChange}
                                                >
                                                    <option value="default">Default</option>
                                                    <option value="newly-published">Newly published</option>
                                                    <option value="most-popular">Most popular</option>
                                                    <option value="discounted">Discounted</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="bd-shop__wrapper">
                                            <div className="tab-content" id="myTabContent">
                                                <div
                                                    className="tab-pane fade show active"
                                                    id="home"
                                                    role="tabpanel"
                                                    aria-labelledby="home-tab"
                                                >
                                                    <div className="bd-trending__item-wrapper">
                                                        <div className="row">
                                                            {paginatedProducts.length > 0 ? (
                                                                paginatedProducts.map((object) => (
                                                                    <div
                                                                        key={object.id}
                                                                        className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6"
                                                                    >
                                                                        <Product product={object}/>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="text-center">
                                                                    <span style={{fontSize: "20px"}}
                                                                          className='badge text-danger'>No Products Found</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="tab-pane fade"
                                                    id="profile"
                                                    role="tabpanel"
                                                    aria-labelledby="shop-filter-bar"
                                                >
                                                    <div className="row">
                                                        {paginatedProducts.length > 0 ? (
                                                            paginatedProducts.map((object) => (
                                                                <div key={object.id} className="col-xxl-12 mb-20">
                                                                    <ProductGrid product={object}/>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <h1>Products not Found</h1>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bd-pagination mt-30">
                                    {/* Bootstrap pagination styling */}
                                    {/* Bootstrap pagination styling */}
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination justify-content-center">
                                            {/* Previous button (disabled if on the first page) */}
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <a
                                                    className="page-link"
                                                    href="#!"
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    aria-label="Previous"
                                                >
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>

                                            {/* Generate page numbers dynamically */}
                                            {[...Array(totalPages)].map((_, index) => (
                                                <li key={index + 1}
                                                    style={{backgroundColor: "#699c47"}}
                                                    className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                                                    <a style={{backgroundColor:"#699c47"}}
                                                       className="page-link"
                                                       onClick={() => handlePageChange(index + 1)}
                                                       href="#!"
                                                    >
                                                        {index + 1}
                                                    </a>
                                                </li>
                                            ))}

                                            {/* Next button (disabled if on the last page) */}
                                            <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                                                <a
                                                    className="page-link"
                                                    href="#!"
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    aria-label="Next"
                                                >
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Shop;
