import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import api from "../Utils/Axios";
import {toast} from "react-toastify";
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
                    <img src="img/product/alo7.png" alt="banner-shape"/>
                </div>
                <div className="bd-banner__discount-shape">
                    <img
                        src="assets/img/banner/discount-shape.png"
                        alt="discount-shape"
                    />
                    <div className="discount-text">
                        <span>50%</span>off
                    </div>
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="bd-singel__banner mt-70 d-flex align-items-center">
                            <div className="col-xl-7 col-lg-6 col-md-6 col-12">
                                <div className="bd-banner__content__wrapper p-relative">
                                    <div className="bd-banner__text-shape mb-10">
                                        <img
                                            src="assets/img/banner/banner-shape-2.png"
                                            alt="banner-shape"
                                        />
                                    </div>
                                    <div className="bd-banner__btn-shape">
                                        <img
                                            src="assets/img/banner/curved-arrow.png"
                                            alt="curved-arrow"
                                        />
                                    </div>
                                    <div className="bd-banner__content-2">
                                        <h2>
                                            Aloe Vera <br/> Honey
                                        </h2>
                                        <p>
                                            <b> Discover organic aloe vera and </b> <br/>{" "}
                                            <b>pure honey from our farm</b>{" "}
                                        </p>
                                        <div className="bd-banner__btn">
                                            <Link className="bd-bn__btn-1" to="/shop">
                                                Shop Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-6 col-md-6">
                                <div className="bd-banner__thumb">
                                    <img src="img/product/alo1.webp" alt="banner-3.png"/>
                                </div>
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
                                <div className="bd-section__img w-img">
                                    <img src="assets/img/step/title-img.png" alt="title-img"/>
                                </div>
                                <span className="bd-step__title">and pure products</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 d-flex align-items-center">
                            <div className="bd-step__item text-center p-relative mb-60">
                                <div className="bd-step__arrow mb-3">
                                    <img
                                        src="assets/img/step/step-arrow-1.png"
                                        alt="step-arrow"
                                    />
                                </div>
                                <div className="bd-step__icon mb-3">
                                    <img
                                        style={{width: "40%", height: "auto"}}
                                        src="img/product/alol1.avif"
                                        alt="step-icon"
                                    />
                                </div>
                                <div className="bd-step__content">
                                    <h3>
                                        <Link to="about">What is Aloe Vera? </Link>
                                    </h3>
                                    <p>
                                        Aloe vera is a succulent plant known for its soothing,
                                        healing gel, commonly used for skin care and medicinal
                                        purposes
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 d-flex align-items-center">
                            <div className="bd-step__item text-center p-relative mb-60">
                                <div className="bd-step__arrow mb-3">
                                    <img
                                        src="assets/img/step/step-arrow-2.png"
                                        alt="step-arrow"
                                    />
                                </div>
                                <div className="bd-step__icon mb-3">
                                    <img
                                        style={{width: "40%", height: "auto"}}
                                        src="img/product/alol2.avif"
                                        alt="step-icon"
                                    />
                                </div>
                                <div className="bd-step__content">
                                    <h3>
                                        <Link to="about">Skin Care Benefits </Link>
                                    </h3>
                                    <p>
                                        Aloe vera moisturizes, soothes, heals, and reduces acne and
                                        aging signs on the skin
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 d-flex align-items-center">
                            <div className="bd-step__item text-center p-relative mb-60">
                                <div className="bd-step__arrow mb-3">
                                    <img
                                        src="assets/img/step/step-arrow-1.png"
                                        alt="step-arrow"
                                    />
                                </div>
                                <div className="bd-step__icon mb-3">
                                    <img
                                        style={{width: "40%", height: "auto"}}
                                        src="img/product/alol4.jpg"
                                        alt="step-icon"
                                    />
                                </div>
                                <div className="bd-step__content">
                                    <h3>
                                        <Link to="about">Honey</Link>
                                    </h3>
                                    <p>
                                        Honey is a natural sweetener with antimicrobial properties
                                        that moisturizes, heals wounds, and soothes skin irritations
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 d-flex align-items-center">
                            <div className="bd-step__item text-center p-relative mb-60">
                                <div className="bd-step__icon mb-3">
                                    <img
                                        style={{width: "40%", height: "auto"}}
                                        src="img/product/alol3.jpg"
                                        alt="step-icon"
                                    />
                                </div>
                                <div className="bd-step__content">
                                    <h3>
                                        <Link to="about">Aloe Vera With Honey</Link>
                                    </h3>
                                    <p>
                                        Aloe vera with honey combines soothing, moisturizing, and
                                        healing properties, enhancing skin hydration and promoting
                                        faster wound recovery
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
                                <span className="bd-sub__title">Organic Products</span>
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
                                                        <Product product={object}/>
                                                    </div>
                                                )) : <div className="text-center">
                                                    <span style={{fontSize: "20px"}} className='badge text-danger'>No Products Found</span>
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
                                        We believe in pure and organic quality
                                    </h2>
                                    <p>
                                        We had reached a great height in skincare, for the aloe vera
                                        gel was a smooth, calming balm, and the honey had ceased to
                                        be just a sweetener. By the same soothing effect that
                                        combines aloe’s moisture with honey’s healing, our skin felt
                                        rejuvenated and refreshed.
                                    </p>
                                </div>
                                <div className="bd-about__content">
                                    <div className="bd-about__features">
                                        <div className="bd-adbout__icon">
                                            <img
                                                src="assets/img/about/about-icon.png"
                                                alt="about-icon"
                                            />
                                        </div>
                                        <div className="bd-about__text">
                                            <h4>100% Healthy Quality</h4>
                                            <p>
                                                The skin had ceased to feel irritated. By the same
                                                soothing effect that blends aloe vera's calm with
                                                honey's healing, our skincare routine reached a new
                                                level of comfort.
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
                                    <img src="assets/img/about/about-img-1.jpg" alt="about-img"/>
                                </div>
                                <div className="bd-about__thumb-2">
                                    <img src="assets/img/about/about-img-2.jpg" alt="about-img"/>
                                </div>
                                <div className="bd-about__quite-box">
                                    <div className="quite-content">
                                        <p>
                                            "Organic products are very helpful to our human skin care"
                                        </p>
                                    </div>
                                    <div className="quite-icon">
                                        <i className="flaticon-quote"/>
                                    </div>
                                    <div className="bd-about__quite-name">
                                        <span>Daniel Nirob</span>
                                    </div>
                                </div>
                                <div className="bd-about__shape-1">
                                    <img
                                        src="assets/img/about/about-shape-1.png"
                                        alt="about-shape"
                                    />
                                </div>
                                <div className="bd-about__shape-2"/>
                                <div className="bd-about__shape-3"/>
                                <div className="bd-about__shape-4"/>
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
                                <span className="bd-sub__title">Organic</span>
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
                                                    <Product product={object}/>
                                                </div>
                                            )) : <div className="text-center">
                                                <span style={{fontSize: "20px"}} className='badge text-danger'>No Featured Products Found</span>
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
                                <h2 className="bd-section__title mb-30">
                                    6 reasons to Choose us
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 align-items-center">
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="bd-choose__wrapper choose-wrapper__left mb-60">
                                <div className="bd-choose__item">
                                    <div className="bd-choose__content text-end">
                                        <h4>100% Organic</h4>
                                        <p>
                                            Aloe vera and honey are both organic treasures, offering
                                            natural, soothing benefits for skin care
                                        </p>
                                    </div>
                                    <div className="bd-choose__icon choose-icon__left">
                                        <img
                                            src="assets/img/why-choose/why-choose-01.png"
                                            alt="why-choose-img"
                                        />
                                    </div>
                                </div>
                                <div className="bd-choose__item">
                                    <div className="bd-choose__content text-end">
                                        <h4>Neat &amp; Clean</h4>
                                        <p>
                                            Aloe vera and honey are both naturally pure, providing
                                            clean and gentle care for your skin realization
                                        </p>
                                    </div>
                                    <div className="bd-choose__icon choose-icon__left">
                                        <img
                                            src="assets/img/why-choose/why-choose-02.png"
                                            alt="why-choose-img"
                                        />
                                    </div>
                                </div>
                                <div className="bd-choose__item">
                                    <div className="bd-choose__content text-end">
                                        <h4>No Preservation</h4>
                                        <p>
                                            Aloe vera and honey are naturally preserved, maintaining
                                            their purity and effectiveness without synthetic additives
                                        </p>
                                    </div>
                                    <div className="bd-choose__icon choose-icon__left">
                                        <img
                                            src="assets/img/why-choose/why-choose-03.png"
                                            alt="why-choose-img"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="bd-choose__thumb text-center w-img mb-30">
                                <img
                                    style={{height: "400px", width: "auto", maxWidth: "100%"}}
                                    src="img/product/alop5.jpeg"
                                    alt="choose-big"
                                />
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="bd-choose__wrapper choose-wrapper__right mb-60">
                                <div className="bd-choose__item">
                                    <div className="bd-choose__icon choose__icon-right">
                                        <img
                                            src="assets/img/why-choose/why-choose-04.png"
                                            alt="why-choose-img"
                                        />
                                    </div>
                                    <div className="bd-choose__content text-start">
                                        <h4>Quality</h4>
                                        <p>
                                            We offer you the finest quality of pure aloe vera and
                                            honey, ensuring exceptional and luxurious skin care
                                        </p>
                                    </div>
                                </div>
                                <div className="bd-choose__item">
                                    <div className="bd-choose__icon choose__icon-right">
                                        <img
                                            src="assets/img/why-choose/why-choose-05.png"
                                            alt="why-choose-img"
                                        />
                                    </div>
                                    <div className="bd-choose__content text-start">
                                        <h4>Trendy Design</h4>
                                        <p>
                                            We present you with premium aloe vera and honey in a chic,
                                            trendy design, ensuring luxurious and effective skin care
                                        </p>
                                    </div>
                                </div>
                                <div className="bd-choose__item">
                                    <div className="bd-choose__icon choose__icon-right">
                                        <img
                                            src="assets/img/why-choose/why-choose-06.png"
                                            alt="why-choose-img"
                                        />
                                    </div>
                                    <div className="bd-choose__content text-start">
                                        <h4>Fast Delivery</h4>
                                        <p>
                                            We ensure fast delivery of our premium aloe vera and
                                            honey, bringing you luxurious skin care quickly and
                                            efficiently
                                        </p>
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
                                <span className="bd-sub__title">Blogs Insight</span>
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
                                                  state={{blog: object}}>
                                                <img
                                                    src={object.image}
                                                    alt="news-image"
                                                />
                                            </Link>
                                        </div>
                                        <div className="bd-news__content">
                                            <div className="bd-news__meta-list">
                                                <div className="bd-news__meta-item">
                                                    <Link to="news.html">
                                                        <i className="fa-light fa-folder-open"/>
                                                        {object.category}
                                                    </Link>
                                                </div>
                                                <div className="bd-news__meta-item">
                                                    <span>
                                                        <i className="fa-regular fa-clock"/>
                                                        {object.created_at}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bd-news__title">
                                                <h3>
                                                    <Link to="/blogs-details">
                                                        {object.title}
                                                    </Link>
                                                </h3>
                                            </div>
                                            <Link className="bd-news__btn" to="/blogs-details">
                                                Read More
                                                <span>
                                                    <i className="fa-solid fa-arrow-left"/>
                                                    <i className="fa-solid fa-arrow-left"/>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">
                                <span style={{fontSize: "20px"}} className='badge text-danger'>No blogs Found</span>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </>
    );
}

export default Home;
