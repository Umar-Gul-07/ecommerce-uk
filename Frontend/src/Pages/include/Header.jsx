import React, {useContext, useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Store} from "../../Utils/Store";

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null); // Updated to use useRef instead of createRef

    const location = useLocation(); // React Router hook to get the current URL

    // Handle opening and closing the modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Use useEffect to automatically handle modal state based on the URL change
    useEffect(() => {
        // Open modal automatically when the URL changes
        setIsModalOpen(false);
    }, [location]); // This will trigger when the location (URL) changes

    // Use useEffect to apply and remove the body classes when the modal is opened/closed
    useEffect(() => {
        const bodyElement = document.body;

        if (isModalOpen) {
            // Ensure the modal element exists before trying to manipulate it
            const modalElement = modalRef.current;
            if (modalElement) {
                const modal = new window.bootstrap.Modal(modalElement);
                modal.show();
            }

            // Add modal-open class and inline styles to the body
            bodyElement.classList.add('modal-open');
            bodyElement.style.overflow = 'hidden';
            bodyElement.style.paddingRight = '0px';
            bodyElement.setAttribute('data-bs-overflow', 'visible');
        } else {
            // Remove the modal-open class and inline styles when the modal is closed
            const modalElement = modalRef.current;
            if (modalElement) {
                const modal = window.bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            }

            bodyElement.classList.remove('modal-open');
            bodyElement.style.overflow = '';
            bodyElement.style.paddingRight = '';
            bodyElement.removeAttribute('data-bs-overflow');
        }

        // Clean up when the component unmounts or state changes
        return () => {
            bodyElement.classList.remove('modal-open');
            bodyElement.style.overflow = '';
            bodyElement.style.paddingRight = '';
            bodyElement.removeAttribute('data-bs-overflow');
        };
    }, [isModalOpen]);
    const {state} = useContext(Store)
    const {ContactInfo, Cart} = state
    return (
        <>
            {isModalOpen ?
                <div className="offcanvas__area">
                    <div
                        className="modal fade show"
                        id="offcanvasmodal"
                        style={{display: "block"}}
                        aria-modal="true"
                        role="dialog"
                    >

                    </div>
                </div>
                : null}

            <div className="modal fade" ref={modalRef} tabIndex="-1" id="offcanvasmodal"
                 aria-labelledby="offcanvasLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">

                        </div>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="offcanvas__wrapper">
                                    <div className="offcanvas__content">
                                        <div
                                            className="offcanvas__top mb-40 d-flex justify-content-between align-items-center">
                                            <div className="offcanvas__logo logo">
                                                <Link to="/">
                                                    <img width="100px" src="assets/img/logo-5.png" alt="logo"/>
                                                </Link>
                                            </div>
                                            <div className="offcanvas__close">
                                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"
                                                        onClick={toggleModal}></button>
                                            </div>
                                        </div>
                                        <div className="bd-utilize__buttons mb-25 d-xl-none">
                                            <div className="bd-action__item">
                                                <div className="bd-action__cart">
                                                    <div className="bd-action__cart-icon">
                                                        <Link
                                                            to="/add-to-cart"
                                                        >
                                                            <svg
                                                                id="shopping-bag-52145456"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16.508"
                                                                height="18.5"
                                                                viewBox="0 0 16.508 18.5"
                                                            >
                                                                <path
                                                                    id="Path_7655"
                                                                    data-name="Path 76"
                                                                    d="M24.21,35.5H34.3a3.214,3.214,0,0,0,3.21-3.21v-9.6a.571.571,0,0,0-.569-.569H33.523v-.854a4.269,4.269,0,0,0-8.538,0v.854H21.569a.571.571,0,0,0-.569.569v9.6A3.214,3.214,0,0,0,24.21,35.5Zm1.913-14.231a3.131,3.131,0,0,1,6.262,0v.854H26.123Zm-3.985,1.992h2.846v1.423a.569.569,0,0,0,1.138,0V23.262h6.262v1.423a.569.569,0,0,0,1.138,0V23.262h2.846V32.29A2.076,2.076,0,0,1,34.3,34.362H24.21a2.076,2.076,0,0,1-2.072-2.072Z"
                                                                    transform="translate(-21 -17)"
                                                                    fill="#1c1d1b"
                                                                />
                                                            </svg>
                                                        </Link>
                                                        <span className="bd-action__item-number cart-count">0</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="mobile-menu fix mb-40 mean-container">
                                            <div className="mean-bar">
                                                <a
                                                    href="#nav"
                                                    className="meanmenu-reveal"
                                                    style={{right: 0, left: "auto", display: "inline"}}
                                                >
                  <span>
                    <span>
                      <span/>
                    </span>
                  </span>
                                                </a>
                                                <nav className="mean-nav">
                                                    <ul>
                                                        <li>
                                                            <Link to="/">Home</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/shop">Shop</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/blogs">Blogs</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/about">About</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/contact">Contact</Link>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>

                                        <div className="offcanvas__contact mt-30 mb-20">
                                            <h4>Contact Info</h4>
                                            <ul>
                                                <li className="d-flex align-items-center">
                                                    <div className="offcanvas__contact-icon mr-15">
                                                        <i className="fal fa-map-marker-alt"/>
                                                    </div>
                                                    <div className="offcanvas__contact-text">
                                                        <a
                                                            target="_blank"
                                                            href="https://www.google.com/maps/place/Dhaka/@23.7806207,90.3492859,12z/data=!3m1!4b1!4m5!3m4!1s0x3755b8b087026b81:0x8fa563bbdd5904c2!8m2!3d23.8104753!4d90.4119873"
                                                        >
                                                            {ContactInfo.address}
                                                        </a>
                                                    </div>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <div className="offcanvas__contact-icon mr-15">
                                                        <i className="far fa-phone"/>
                                                    </div>
                                                    <div className="offcanvas__contact-text">
                                                        <a href={`tel:${ContactInfo.contact_phone}`}>{ContactInfo.contact_phone}</a>
                                                    </div>
                                                </li>
                                                <li className=" d-flex align-items-center">
                                                    <div className=" offcanvas__contact-icon mr-15">
                                                        <i className=" fal fa-envelope"/>
                                                    </div>
                                                    <div className=" offcanvas__contact-text">
                                                        <a href=" tel:+012-345-6789">
                                                    <span className={`mailto:{ContactInfo.contact_email}`}>
                        {ContactInfo.contact_email}
                      </span>
                                                        </a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <header>
                <div className="bd-topbar-area__middle d-none d-lg-block mt-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xxl-6 col-xl-6 col-md-8">
                                <div className="bd-topbar__contact">
                                    <ul>
                                        <li>
                                            <Link to={`tel:${ContactInfo.contact_phone}`}>
                                                <i className="fa-regular fa-phone-flip"/>
                                                {ContactInfo.contact_phone}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link>
                                                <i className="fa-regular fa-house-window"/>
                                                {ContactInfo.address}
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="header-sticky" className="">
                    <div className="bd-header__area-2 position-relative">
                        <div className="container">
                            <div className="bd-header__main-wrapper-2">
                                <div className="row align-items-center">
                                    <div className="col-12">
                                        <div className="bd-header__main-content">
                                            <div className="bd-header__left-2">
                                                <div className="bd-header__logo-2 p-relative">
                                                    <Link to="/">
                                                        <img width="100px" src="assets/img/logo-5.png" alt="logo"/>
                                                    </Link>
                                                </div>
                                                <div className="main-menu d-none d-none d-lg-block">
                                                    <nav id="mobile-menu" style={{display: "block"}}>
                                                        <ul>
                                                            <li>
                                                                <Link to="/">Home</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/shop">Shop</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/blogs">Blogs</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/about">About</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/contact">Contact</Link>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                            <div className="bd-header__right header__right-2">
                                                <div className="bd-action__cart-list justify-content-end">
                                                    <div className="bd-action__item">
                                                        <div className="bd-action__cart">
                                                            <div className="bd-action__cart-icon">
                                                                <Link
                                                                    to="/add-to-cart"
                                                                >
                                                                    <svg
                                                                        id="shopping-bag-52145456"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16.508"
                                                                        height="18.5"
                                                                        viewBox="0 0 16.508 18.5"
                                                                    >
                                                                        <path
                                                                            id="Path_7655"
                                                                            data-name="Path 76"
                                                                            d="M24.21,35.5H34.3a3.214,3.214,0,0,0,3.21-3.21v-9.6a.571.571,0,0,0-.569-.569H33.523v-.854a4.269,4.269,0,0,0-8.538,0v.854H21.569a.571.571,0,0,0-.569.569v9.6A3.214,3.214,0,0,0,24.21,35.5Zm1.913-14.231a3.131,3.131,0,0,1,6.262,0v.854H26.123Zm-3.985,1.992h2.846v1.423a.569.569,0,0,0,1.138,0V23.262h6.262v1.423a.569.569,0,0,0,1.138,0V23.262h2.846V32.29A2.076,2.076,0,0,1,34.3,34.362H24.21a2.076,2.076,0,0,1-2.072-2.072Z"
                                                                            transform="translate(-21 -17)"
                                                                            fill="#1c1d1b"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                                <span
                                                                    className="bd-action__item-number cart-count">{Cart.length}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bd-action__hotline d-none d-xl-block">
                                                    <div className="bd-hotline__inner">
                                                        <div className="bd-hotline__icon">
                                                            <img
                                                                src="assets/img/icon/action-hotline.png"
                                                                alt="hotline-icon"
                                                            />
                                                        </div>
                                                        <div className="bd-hotline__text">
                                                            <span>Contact hotline</span>
                                                            <Link
                                                                to={`tel:${ContactInfo.contact_phone}`}>{ContactInfo.contact_phone}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="header__hamburger d-flex d-xl-none">
                                                    <button
                                                        type="button"
                                                        className="hamburger-btn"
                                                        onClick={toggleModal} // Toggle modal state on click
                                                    >
        <span className="hamburger-icon">
          <span/>
          <span/>
          <span/>
        </span>
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
        ;
}

export default Header;
