import React from "react";
import Catagories from "./include/Catagories";
import {Helmet} from "react-helmet";

const About = ({title}) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Catagories title={title}/>
            <section
                className="bd-page__banner-area include-bg page-overlay"
                data-background="assets/img/banner/page-banner-1.jpg"
                style={{
                    backgroundImage: 'url("assets/img/banner/page-banner-1.jpg")',
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bd-page__banner-content text-center">
                                <h2>About Business E-commerce</h2>
                                <span>An organic and ideal skin care shop</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bd-about__area pt-130 pb-65">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-xxl-5 col-xl-5 col-lg-6">
                            <div className="bd-about__wrapper mb-60">
                                <div className="bd-about__image-1 m-img mb-60">
                                    <img
                                        src="assets/img/about/about-img-3.jpg"
                                        alt="about-image"
                                    />
                                </div>
                                <div className="bd-about__image-2 m-img">
                                    <img
                                        src="assets/img/about/alo2.webp"
                                        alt="about-image"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-7 col-xl-7 col-lg-6">
                            <div className="bd-about__content-box mb-60">
                                <div className="bd-section__title-wrapper mb-50">
                                    <span className="bd-sub__title">About Us</span>
                                    <h2 className="bd-section__title mb-30">
                                        We believe in pure and <br/> organic quality
                                    </h2>
                                </div>
                                <div className="bd-about__inner">
                                    <div className="bd-about__image-3">
                                        <img
                                            src="assets/img/about/alo1.jpg"
                                            alt="about-imgage"
                                        />
                                    </div>
                                    <div className="bd-about__info">
                                        <p>
                                            We have reached new heights in skin care with our aloe vera and honey
                                            products, offering a soothing, effective solution that stands out in the
                                            market. This commitment to excellence reflects our dedication to delivering
                                            the best in natural beauty care.

                                        </p>
                                        <div className="bd-about__author">
                                            <div className="bd-about__author-thumb">
                                                <img
                                                    src="assets/img/about/about-author.png"
                                                    alt="about-author"
                                                />
                                            </div>
                                            <div className="bd-about__author-info">
                                                <h4>Noyaviram</h4>
                                                <span>Founder &amp; CEO, Business E-commerce</span>
                                                <div className="ba-author__signature">
                                                    <img
                                                        src="assets/img/about/author-signature.png"
                                                        alt="author-signature"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
