import { useContext } from "react";
import { Store } from "../../Utils/Store";
import { Link } from "react-router-dom";

function Footer() {
    const { state } = useContext(Store)
    const { ContactInfo } = state
    return (
        <>
            <section className="bd-footer__area grey-bg pt-100 pb-35">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                            <div className="bd-footer__widget footer-col-1 mb-60">
                                <div className="bd-footer__info">
                                    <div className="bd-footer__logo">
                                        <Link to="/">
                                            <img width="120px"
                                                src="assets/img/logo/logo-new.png"
                                                alt="footer-logo"
                                            />
                                        </Link>
                                    </div>
                                    <p>
                                        Elevate your style with our premium clothing collection. Explore the latest trends,
                                        high-quality fabrics, and timeless fashion pieces that suit every occasion.
                                    </p>

                                    <div className="bd-footer__contact">
                                        <span>
                                            <i className="fa-regular fa-envelope" />
                                            <Link to={`mailto:${ContactInfo.contact_email}`}>{ContactInfo.contact_email}</Link>
                                        </span>
                                        <span>
                                            <i className="fa-regular fa-house-chimney" />
                                            {ContactInfo.address}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                            <div className="bd-footer__widget footer-col-2 mb-60">
                                <div className="bd-footer__widget-title">
                                    <h4>Quick Links</h4>
                                </div>
                                <div className="bd-footer__link">
                                    <ul>
                                        <li>
                                            <Link to="/shop">Shop</Link>
                                        </li>
                                        <li>
                                            <Link to="/blogs">Fashion Blog</Link>
                                        </li>
                                        <li>
                                            <Link to="/about">Our Story</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact">Contact Us</Link>
                                        </li>
                                        <li>
                                            <Link to="/gallery">Lookbook</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                            <div className="bd-footer__widget mb-60">
                                <div className="bd-footer__support-wrapper">
                                    <div className="bd-fotter__support-icon">
                                        <img src="assets/img/icon/support.png" alt="support-img" />
                                    </div>
                                    <div className="bd-footer__support-inner">
                                        <span>{ContactInfo.time}</span>
                                        <h4>
                                            <Link to={`tel:${ContactInfo.contact_phone}`}>{ContactInfo.contact_phone}</Link>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="bd-footer__link">
                                <ul>
                                    <li style={{ color: "#699c47" }}>
                                        <strong>
                                            <Link to="http://localhost:8000/admin/">ROOT ADMIN</Link>
                                        </strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Footer;
