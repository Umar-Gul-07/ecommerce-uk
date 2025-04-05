import React, { useContext, useEffect, useState } from "react";
import Catagories from "./Catagories";
import { Helmet } from "react-helmet";
import { Store } from "../../Utils/Store";
import api from "../../Utils/Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51OGbliKue2i3LW4Npe6oAwbcfHyFSSUdcRPKRejkqG5z1WggCgT2MnaW3ayQaPV6gnVugP7w3C5crbJyug9weV1e00CESUwd87"); // Replace with your actual Stripe public key

const CheckoutForm = ({ formData, Cart, orderTotal, dispatch, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errors, setErrors] = useState([]);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    setProcessing(true);

    const trackingNumber = Math.random().toString(36).substring(2, 10);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append("tracking_number", trackingNumber);
    Cart.forEach((item) => formDataToSend.append("product[]", item.id));

    try {
      const response = await api.post("/create-payment/", {
        amount: orderTotal,
      });
      const { clientSecret } = response.data;

      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        setProcessing(false);
        toast.error(error.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const transactionResponse = await api.post("/save-transaction/", {
            user: formData.email || 'guest',  // Save user email
            payment_amount: orderTotal,
            transaction_id: paymentIntent.id,
            status: "COMPLETED",
            stripe_payment_intent: paymentIntent.id,
            email: formData.email,  // Send email explicitly
          });
          

        if (transactionResponse.status === 200) {
          toast.success("Payment Successful! Check Email");
          dispatch({ type: "clear-cart" });
          navigate("/");
        }
      }
    } catch (error) {
      setProcessing(false);
      if (error.response?.status === 400) {
        const errorMessages = error.response.data;
        const formattedErrors = Object.keys(errorMessages).map(
          (key) => `${key}: ${errorMessages[key]}`
        );
        setErrors(formattedErrors);
      } else {
        setErrors(["Something went wrong. Try again later."]);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6">
          <div className="checkbox-form">
            <h3>Billing Details</h3>
            {errors.length > 0 && (
              <div className="alert alert-danger">
                <ul>{errors.map((err, i) => <li key={i}>{err}</li>)}</ul>
              </div>
            )}
            <div className="row">
              {[
                { label: "First Name", name: "firstname" },
                { label: "Last Name", name: "lastname" },
                { label: "Address", name: "address" },
                { label: "Town / City", name: "town_or_city" },
                { label: "State", name: "state" },
                { label: "Postcode", name: "postcode" },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone", name: "phone_number" },
              ].map((field, i) => (
                <div className="col-md-6" key={i}>
                  <div className="checkout-form-list">
                    <label>
                      {field.label} <span className="required">*</span>
                    </label>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={(e) =>
                        formData.setFormData({
                          ...formData,
                          [field.name]: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="your-order mb-30">
            <h3>Your Order</h3>
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
                <tr className="font-weight-bold">
                  <th>Order Total</th>
                  <td>RS {orderTotal}</td>
                </tr>
              </tfoot>
            </table>

            <div className="payment-method">
              <label>Pay with Card (Stripe)</label>
              <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
                <CardElement />
              </div>
            </div>

            <div className="order-button-payment mt-20">
              <button type="submit" className="bd-fill__btn" disabled={processing}>
                {processing ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const Checkout = ({ title }) => {
  const { state, dispatch } = useContext(Store);
  const { Cart } = state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    town_or_city: "",
    state: "",
    postcode: "",
    email: "",
    phone_number: "",
    status: "PENDING",
  });

  const orderTotal = Cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    if (Cart.length === 0) {
      toast.warning("Your cart is empty! Redirecting...");
      navigate("/shop");
    }
  }, [Cart, navigate]);

  return (
    <>
      <Helmet><title>{title}</title></Helmet>
      <Catagories title={title} />
      <section className="checkout-area pb-100">
        <div className="container small-container">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              formData={{ ...formData, setFormData }}
              Cart={Cart}
              orderTotal={orderTotal}
              dispatch={dispatch}
              navigate={navigate}
            />
          </Elements>
        </div>
      </section>
    </>
  );
};

export default Checkout;
