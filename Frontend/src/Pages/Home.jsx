import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../Utils/Axios";
import { toast } from "react-toastify";
import Product from "./include/Product";

function Home() {
    const [blogs, setBlogs] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [topProducts, setTopProducts] = useState([])

    const products_list = async () => {
        try {
            const result = await api.get('products-list/');
            const allProducts = result.data;

            const featuredProducts = allProducts.filter(product => product.featured_product === true);
            setFeaturedProducts(featuredProducts.slice(0, 4));

            const topProducts = allProducts
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setTopProducts(topProducts.slice(0, 4));
        } catch (error) {
        }
    };

    const blogs_list = async () => {
        try {
            const result = await api.get('blogs-list/');
            setBlogs(result.data.slice(0, 3));
        } catch (error) {

        }
    };

    useEffect(() => {
        blogs_list();
        products_list()
    }, []);

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>

            <section className="bd-banner__area dark-bg banner-height-2 d-flex align-items-center p-relative fix">
                <div className="bd-banner__shape-1">
                    <img src="assets/img/banner/d4.jpeg" alt="banner-shape" className="img-fluid" />
                </div>
                <div className="bd-banner__discount-shape">
                    <img src="assets/img/banner/discount-shape.png" alt="discount-shape" className="img-fluid" />
                    <div className="discount-text">
                        <span>50%</span>off
                    </div>
                </div>
                <div className="container">
                    <div className="row align-items-center mt-5">
                        <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12 mb-4">
                            <div className="bd-banner__content__wrapper p-relative">
                                <div className="bd-banner__text-shape mb-10">
                                    {/* Optional shape */}
                                </div>
                                <div className="bd-banner__btn-shape mb-3">
                                    <img src="assets/img/banner/curved-arrow.png" alt="curved-arrow" className="img-fluid" />
                                </div>
                                <div className="bd-banner__content-2">
                                    <h2>
                                        Trendy & Stylish <br /> Apparel
                                    </h2>
                                    <p>
                                        <b> Explore our latest fashion collection </b> <br />
                                        <b>with premium quality and comfort</b>
                                    </p>
                                    <div className="bd-banner__btn mt-3">
                                        <Link className="bd-bn__btn-1" to="/shop">
                                            Shop Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 text-center">
                            <div className="bd-banner__thumb">
                                <img src="assets/img/banner/d3.png" alt="banner-3.png" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bd-step__area pt-130 pb-65">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-8">
                            <div className="bd-section__title-wrapper p-relative mb-85">

                                {/* <span className="bd-step__title">Trendy & Premium Quality</span> */}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 d-flex align-items-center">
                            <div className="bd-step__item text-center p-relative mb-60">
                                <div className="bd-step__arrow mb-3">
                                    <img src="assets/img/step/step-arrow-1.png" alt="step-arrow" />
                                </div>
                                <div className="bd-step__icon mb-3">
                                    <img style={{ width: "40%", height: "auto" }} src="assets/img/shop2/15.png" alt="step-icon" />
                                </div>
                                <div className="bd-step__content">
                                    <h3>
                                        <Link to="about">Latest Fashion Trends</Link>
                                    </h3>
                                    <p>
                                        Stay ahead with our handpicked fashion essentials for every occasion.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 d-flex align-items-center">
                            <div className="bd-step__item text-center p-relative mb-60">
                                <div className="bd-step__arrow mb-3">
                                    <img src="assets/img/step/step-arrow-2.png" alt="step-arrow" />
                                </div>
                                <div className="bd-step__icon mb-3">
                                    <img style={{ width: "40%", height: "auto" }} src="assets/img/arrival/2.png" alt="step-icon" />
                                </div>
                                <div className="bd-step__content">
                                    <h3>
                                        <Link to="about">High-Quality Materials</Link>
                                    </h3>
                                    <p>
                                        Experience comfort and durability with our premium fabric selections.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 d-flex align-items-center">
                            <div className="bd-step__item text-center p-relative mb-60">
                                <div className="bd-step__arrow mb-3">
                                    <img src="assets/img/step/step-arrow-1.png" alt="step-arrow" />
                                </div>
                                <div className="bd-step__icon mb-3">
                                    <img style={{ width: "40%", height: "auto" }} src="assets/img/arrival/5.png" alt="step-icon" />
                                </div>
                                <div className="bd-step__content">
                                    <h3>
                                        <Link to="about">Accessories & Footwear</Link>
                                    </h3>
                                    <p>
                                        Complete your outfit with our stylish accessories and comfortable footwear.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 d-flex align-items-center">
                            <div className="bd-step__item text-center p-relative mb-60">
                                <div className="bd-step__icon mb-3">
                                    <img style={{ width: "40%", height: "auto" }} src="assets/img/arrival/11.png" alt="step-icon" />
                                </div>
                                <div className="bd-step__content">
                                    <h3>
                                        <Link to="about">Personalized Recommendations</Link>
                                    </h3>
                                    <p>
                                        Get tailored fashion suggestions based on your style and preferences.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bd-product__area pt-125 pb-95">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-5 col-lg-5">
                            <div className="bd-section__title-wrapper mb-60">
                                <span className="bd-sub__title">Latest Fashion Products</span>
                                <h2 className="bd-section__title mb-30">Top Products</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="tab-content" id="nav-tabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="nav-product-1"
                                    role="tabpanel"
                                    aria-labelledby="nav-product-1-tab"
                                >
                                    <div className="row">
                                        <div className="col-12">
                                            {topProducts.length > 0 ?
                                                topProducts.map((object) => (
                                                    <div className="col-4">
                                                        <Product product={object} />
                                                    </div>
                                                )) : <div className="text-center">
                                                    <span style={{ fontSize: "20px" }} className='badge text-danger'>No Products Found</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bd-about__area grey-bg p-relative z-index-1 pt-130 pb-70">
                <div className="container">
                    <div className="bd-about__bg-wrapper p-relative">
                        <img
                            className="bd-about__bg-shape "
                            src="assets/img/about/about-big-shape.png"
                            alt="about-big-shape"
                        />
                    </div>
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-6">
                            <div className="bd-about__content-wrapper mb-60">
                                <div className="bd-section__title-wrapper mb-35">
                                    <span className="bd-sub__title">About Us</span>
                                    <h2 className="bd-section__title mb-35">
                                        Elevating Your Fashion Experience
                                    </h2>
                                    <p>
                                        At A.I.R. Shops, we are dedicated to providing a seamless online shopping experience for clothing, shoes, and accessories. Our innovative platform integrates a Personalized Recommendation System to help you find styles that suit your taste.
                                    </p>
                                </div>
                                <div className="bd-about__content">
                                    <div className="bd-about__features">
                                        <div className="bd-adbout__icon">
                                            <img src="assets/img/blog2/1.png" alt="icon" width="140" height="160" />

                                        </div>
                                        <div className="bd-about__text">
                                            <h4>Quality and Style Guaranteed</h4>
                                            <p>
                                                Our collection is curated to offer premium fashion choices that combine comfort, quality, and the latest trends.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bd-about__action">
                                        <Link className="bd-bn__btn-1" to="about">
                                            About Us
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="bd-about__thumb-wrapper p-relative mb-60 ">
                                <div className="bd-about__thumb-1 w-img">
                                    <img src="assets/img/about/about-img-1.jpg" alt="about-img" />
                                </div>
                                <div className="bd-about__thumb-2">
                                    <img src="assets/img/about/about-img-2.jpg" alt="about-img" />
                                </div>
                                <div className="bd-about__quite-box">
                                    <div className="quite-content">
                                        <p>
                                            "Fashion is the armor to survive the reality of everyday life."
                                        </p>
                                    </div>
                                    <div className="quite-icon">
                                        <i className="flaticon-quote" />
                                    </div>
                                    <div className="bd-about__quite-name">
                                        <span>Daniel Nirob</span>
                                    </div>
                                </div>
                                <div className="bd-about__shape-1">
                                    {/* <img
                                        src="assets/img/about/about-shape-1.png"
                                        alt="about-shape"
                                    /> */}
                                </div>
                                <div className="bd-about__shape-2" />
                                <div className="bd-about__shape-3" />
                                <div className="bd-about__shape-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bd-product__area pt-125 pb-95">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-5 col-lg-5">
                            <div className="bd-section__title-wrapper mb-60">
                                <span className="bd-sub__title">Trending Now</span>
                                <h2 className="bd-section__title mb-30">Featured Products</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="tab-content" id="nav-tabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="nav-product-1"
                                    role="tabpanel"
                                    aria-labelledby="nav-product-1-tab"
                                >
                                    <div className="row">
                                        {featuredProducts.length > 0 ?
                                            featuredProducts.map((object) => (
                                                <div className="col-4">
                                                    <Product product={object} />
                                                </div>
                                            )) : <div className="text-center">
                                                <span style={{ fontSize: "20px" }} className='badge text-danger'>No Featured Products Found</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bd-why-choose__area WHITE-bg-2 pt-125 pb-195">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bd-section__title-wrapper text-center mb-60">
                                <span className="bd-sub__title">Why Choose Us</span>
                                <h2 className="bd-section__title mb-30">6 Reasons to Choose Us</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 align-items-center">
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="bd-choose__wrapper choose-wrapper__left mb-60">
                                <div className="bd-choose__item">
                                    <div className="bd-choose__content text-end">
                                        <h4>Premium Quality</h4>
                                        <p>Our clothing is made with high-quality fabrics for ultimate comfort and durability.</p>
                                    </div>
                                    <div className="bd-choose__icon choose-icon__left">
                                        {/* <img src="assets/img/why-choose/quality.png" alt="Premium Quality" /> */}
                                    </div>
                                </div>
                                <div className="bd-choose__item">
                                    <div className="bd-choose__content text-end">
                                        <h4>Trendy Designs</h4>
                                        <p>We bring you the latest fashion trends with stylish, modern, and timeless designs.</p>
                                    </div>
                                    <div className="bd-choose__icon choose-icon__left">
                                        {/* <img src="assets/img/why-choose/trendy.png" alt="Trendy Designs" /> */}
                                    </div>
                                </div>
                                <div className="bd-choose__item">
                                    <div className="bd-choose__content text-end">
                                        <h4>Inclusive Sizing</h4>
                                        <p>We offer a wide range of sizes, ensuring a perfect fit for everyone.</p>
                                    </div>
                                    <div className="bd-choose__icon choose-icon__left">
                                        {/* <img src="assets/img/why-choose/sizing.png" alt="Inclusive Sizing" /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="bd-choose__thumb text-center w-img mb-30">
                                <img style={{ height: "450px", width: "auto", maxWidth: "100%" }} src="assets/img/banner/b2.png" alt="Choose Big" />
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="bd-choose__wrapper choose-wrapper__right mb-60">
                                <div className="bd-choose__item">
                                    <div className="bd-choose__icon choose__icon-right">
                                        {/* <img src="assets/img/why-choose/eco.png" alt="Eco-Friendly" /> */}
                                    </div>
                                    <div className="bd-choose__content text-start">
                                        <h4>Sustainable Fashion</h4>
                                        <p>Our clothes are ethically made using eco-friendly and sustainable materials.</p>
                                    </div>
                                </div>
                                <div className="bd-choose__item">
                                    <div className="bd-choose__icon choose__icon-right">
                                        {/* <img src="assets/img/why-choose/fast-shipping.png" alt="Fast Shipping" /> */}
                                    </div>
                                    <div className="bd-choose__content text-start">
                                        <h4>Fast & Free Shipping</h4>
                                        <p>Enjoy fast and free delivery on select orders for a seamless shopping experience.</p>
                                    </div>
                                </div>
                                <div className="bd-choose__item">
                                    <div className="bd-choose__icon choose__icon-right">
                                        {/* <img src="assets/img/why-choose/returns.png" alt="Easy Returns" /> */}
                                    </div>
                                    <div className="bd-choose__content text-start">
                                        <h4>Hassle-Free Returns</h4>
                                        <p>We offer easy returns and exchanges to ensure your satisfaction.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bd-news__area pt-125 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bd-section__title-wrapper text-center mb-60">
                                <span className="bd-sub__title">Fashion Blogs</span>
                                <h2 className="bd-section__title mb-30">Recent Blogs</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {blogs.length > 0 ? (
                            blogs.map((object) => (
                                <div className="col-xl-4 col-lg-4 col-md-6" key={object.id}>
                                    <div className="bd-news__item mb-40">
                                        <div className="bd-news__thumb w-img">
                                            <Link to={{
                                                pathname: `/blogs-details/${object.slug}`,
                                            }}
                                                state={{ blog: object }}>
                                                <img src={object.image} alt="news-image" />
                                            </Link>
                                        </div>
                                        <div className="bd-news__content">
                                            <div className="bd-news__meta-list">
                                                <div className="bd-news__meta-item">
                                                    <Link to="news.html">
                                                        <i className="fa-light fa-folder-open" />
                                                        {object.category}
                                                    </Link>
                                                </div>
                                                <div className="bd-news__meta-item">
                                                    <span>
                                                        <i className="fa-regular fa-clock" />
                                                        {object.created_at}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bd-news__title">
                                                <h3>
                                                    <Link to="/blogs-details">{object.title}</Link>
                                                </h3>
                                            </div>
                                            <Link className="bd-news__btn" to="/blogs-details">
                                                Read More
                                                <span>
                                                    <i className="fa-solid fa-arrow-left" />
                                                    <i className="fa-solid fa-arrow-left" />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">
                                <span style={{ fontSize: "20px" }} className='badge text-danger'>No blogs Found</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

        </>
    );
}

export default Home;
