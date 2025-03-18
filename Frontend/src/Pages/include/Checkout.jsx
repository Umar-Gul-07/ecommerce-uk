import React, {useContext, useEffect, useState} from "react";
import Catagories from "./Catagories";
import {Helmet} from "react-helmet";
import {Store} from "../../Utils/Store";
import api from "../../Utils/Axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Checkout = ({title}) => {
    const {state,dispatch} = useContext(Store);
    const {Cart,ContactInfo} = state;

    const navigate = useNavigate();

    // State to hold form data
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        address: "",
        town_or_city: "",
        state: "",
        postcode: "",
        email: "",
        phone_number: "",
        transaction_choice: "bank",
        status: "PENDING"
    });

    // State to hold errors
    const [errors, setErrors] = useState([]);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");

    const handlePaymentChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
        setFormData({
            ...formData,
            transaction_choice: event.target.value,
        });
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const cartSubtotal = Cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingCost = cartSubtotal >= 100 ? 0 : 7;
    const orderTotal = cartSubtotal + shippingCost;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trackingNumber = Math.random().toString(36).substring(2, 10); // Generate new tracking number here

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        formDataToSend.append('tracking_number', trackingNumber.toString()); // Ensure tracking_number is appended as a string
        // Append product list (as a list, not a string)
        const productIds = Cart.map(item => item.id);  // Prepare the product IDs as a list
        productIds.forEach((id) => formDataToSend.append('product[]', id));  // Append each product ID

        // No screenshot is added since you don't want it

        try {
            const response = await api.post("shipping-create/", formDataToSend);
            if (response.status === 201) {
                toast.success("Shipping Details Submitted Successfully");
                navigate('/shop');
                dispatch({type: "clear-cart"});
            } else {
                throw new Error("Unexpected response from server");
            }
        } catch (error) {
            // Clear previous errors
            setErrors([]);
            if (error.response) {
                // Handle server errors
                const statusCode = error.response.status;
                if (statusCode === 400) {
                    const errorMessages = error.response.data;
                    const formattedErrors = Object.keys(errorMessages).map(key => `${key}: ${errorMessages[key]}`);
                    setErrors(formattedErrors);
                } else if (statusCode === 404) {
                    setErrors(["Resource not found. Please try again."]);
                } else if (statusCode === 500) {
                    setErrors(["Internal server error. Please try again later."]);
                } else {
                    setErrors(["An unexpected error occurred. Please try again."]);
                }
            } else if (error.request) {
                setErrors(["No response from the server. Please check your network connection."]);
            } else {
                setErrors([`Error: ${error.message}`]);
            }
        }
    };

    useEffect(() => {
        if (Cart.length === 0) {
            toast.warning("Your cart is empty! Redirecting to the shop...");
            navigate("/shop");
        }
    }, [Cart, navigate]);

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Catagories title={title}/>

            <section className="checkout-area pb-100">
                <div className="container small-container">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="checkbox-form">
                                    <h3>Billing Details</h3>
                                    {errors.length > 0 && (
                                        <div className="alert alert-danger" role="alert">
                                            <ul>
                                                {errors.map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>First Name <span className="required">*</span></label>
                                                <input type="text" name="firstname" value={formData.firstname}
                                                       onChange={handleInputChange} required/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>Last Name <span className="required">*</span></label>
                                                <input type="text" name="lastname" value={formData.lastname}
                                                       onChange={handleInputChange} required/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="checkout-form-list">
                                                <label>Address <span className="required">*</span></label>
                                                <input type="text" name="address" value={formData.address}
                                                       onChange={handleInputChange} required/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>Town / City <span className="required">*</span></label>
                                                <input type="text" name="town_or_city" value={formData.town_or_city}
                                                       onChange={handleInputChange} required/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>State / County <span className="required">*</span></label>
                                                <input type="text" name="state" value={formData.state}
                                                       onChange={handleInputChange}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>Postcode / Zip <span className="required">*</span></label>
                                                <input type="text" name="postcode" value={formData.postcode}
                                                       onChange={handleInputChange} required/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>Email Address <span className="required">*</span></label>
                                                <input type="email" name="email" value={formData.email}
                                                       onChange={handleInputChange} required/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>Phone <span className="required">*</span></label>
                                                <input type="text" name="phone_number" value={formData.phone_number}
                                                       onChange={handleInputChange} required/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="your-order mb-30">
                                    <h3>Your order</h3>
                                    <table className="table table-bordered table-hover table-striped">
                                        <thead className="thead-dark">
                                        <tr>
                                            <th>Product</th>
                                            <th>Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {Cart.map((item) => (
                                            <tr key={item.name}>
                                                <td>{item.name} × {item.quantity}</td>
                                                <td>RS {item.price * item.quantity}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <th>Cart Subtotal</th>
                                            <td>RS {cartSubtotal}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping</th>
                                            <td>RS {shippingCost}</td>
                                        </tr>
                                        <tr className="font-weight-bold">
                                            <th>Order Total</th>
                                            <td>RS {orderTotal}</td>
                                        </tr>
                                        </tfoot>
                                    </table>

                                    <div className="payment-method">
                                        <div className="my-2">
                                            <label>
                                                <input className="mx-2" type="radio" name="paymentMethod" value="bank"
                                                       checked={selectedPaymentMethod === 'bank'}
                                                       onChange={handlePaymentChange}/>
                                                Direct Bank Transfer
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input className="mx-2" type="radio" name="paymentMethod" value="cod"
                                                       checked={selectedPaymentMethod === 'cod'}
                                                       onChange={handlePaymentChange}/>
                                                Cash on Delivery
                                            </label>
                                        </div>

                                        {selectedPaymentMethod === "bank" && (
                                            <div className="bank-details mt-20">
                                                <h5>Direct Bank Transfer Details</h5>
                                                <p>
                                                    <strong>Bank Number:</strong> 1234567890987654321<br/>
                                                    <strong>Account Title:</strong> ABCD<br/><br/>
                                                    <strong className="text-danger">NOTE:- Please SEND screenshot of
                                                        Payment on below whatsapp number after payment than order will
                                                        be proceed</strong><br/>
                                                    <strong className="text-success">WhatsApp
                                                        Number:</strong> {ContactInfo.contact_phone}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="order-button-payment mt-20">
                                        <button type="submit" className="bd-fill__btn">Place order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Checkout;
