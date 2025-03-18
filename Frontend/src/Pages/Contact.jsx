import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Store } from "../Utils/Store";
import { Link } from "react-router-dom";
import api from "../Utils/Axios";
import { toast } from "react-toastify";
import Catagories from "./include/Catagories";

const Contact = ({ title }) => {
  const { state } = useContext(Store);
  const { ContactInfo } = state;

  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const submitHandling = async (e) => {
    e.preventDefault();

    const data = {
      fullname: fullname,
      subject: subject,
      message: message,
      email: email,
      phone: phone,
    };

    try {
      const result = await api.post("/contact-us/", data);
      console.log(result);
      toast.success("Form Submitted Successfully!");
      setErrors([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      let errorMessages = [];
      if (error.response && error.response.data) {
        if (typeof error.response.data === "object") {
          errorMessages = Object.values(error.response.data).flat();
        } else {
          errorMessages = [error.response.data];
        }
      } else if (error.message) {
        errorMessages = [error.message];
      } else {
        errorMessages = [
          "An unexpected error occurred. Please try again later.",
        ];
      }
      setErrors(Array.isArray(errorMessages) ? errorMessages : [errorMessages]);
    }
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Catagories title={title} />

      <section className="bd-Contact__area pt-105">
        <div className="container">
          <div className="row g-0 justify-content-center">
            <div className="col-xxl-7 col-xl-7 col-lg-8 col-md-12">
              <div className="bd-contact__main-wrapper mb-70">
                <div className="bd-section__title-wrapper">
                  <h2 className="bd-section__title mb-50">Get in Touch</h2>
                </div>

                {/* Display errors as a list above the form */}
                {errors.length > 0 && (
                  <div className="alert alert-danger">
                    <ul>
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bd-contact__form">
                  <form onSubmit={submitHandling}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="bd-single__form-input mb-20">
                          <input
                            required
                            onChange={(e) => setFullname(e.target.value)}
                            type="text"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="bd-single__form-input mb-20">
                          <input
                            required
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            placeholder="Phone e.g +923029677678"
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="bd-single__form-input mb-20">
                          <input
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="bd-single__form-input mb-20">
                          <input
                            required
                            onChange={(e) => setSubject(e.target.value)}
                            type="text"
                            placeholder="Subject"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="bd-single__form-input mb-20">
                          <textarea
                            onChange={(e) => setMessage(e.target.value)}
                            name="message"
                            id="message"
                            placeholder="Messages"
                            defaultValue={""}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="contact-btn">
                      <button type="submit" className="bd-fill__btn">
                        Submit Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-4">
              <div className="bd__sidebar-wrapper mb-70">
                <div className="bd-sidebar__support">
                  <div className="bd-sidebar__title">
                    <h4>Support Contact</h4>
                  </div>
                  <div className="bd-sidebar__content">
                    <div className="bd-contact__list">
                      <div className="bd-contact__item">
                        <div className="bd-contact__item-list">
                          <div className="bd-contact__icon">
                            {/* SVG code */}
                          </div>
                          <div className="bd-contact__content">
                            <div className="bd-contact__title">
                              <h4>Phone</h4>
                            </div>
                            <span>
                              Mobile :{" "}
                              <Link to={`tel:${ContactInfo.contact_phone}`}>
                                <span>{ContactInfo.contact_phone}</span>
                              </Link>
                            </span>
                            <span>
                              Mobile :{" "}
                              <Link to={`tel:${ContactInfo.contact_phone}`}>
                                <span>{ContactInfo.contact_phone}</span>
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bd-contact__item">
                        <div className="bd-contact__item-list">
                          <div className="bd-contact__icon">
                            {/* SVG code */}
                          </div>
                          <div className="bd-contact__content">
                            <div className="bd-contact__title">
                              <h4>Email</h4>
                            </div>
                            <span>
                              <Link to={`mailto:${ContactInfo.contact_email}`}>
                                {ContactInfo.contact_email}
                              </Link>
                            </span>
                            <span>
                              <Link to={`tel:${ContactInfo.contact_phone}`}>
                                {ContactInfo.contact_email}
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bd-contact__item">
                        <div className="bd-contact__item-list">
                          <div className="bd-contact__icon">
                            {/* SVG code */}
                          </div>
                          <div className="bd-contact__content">
                            <div className="bd-contact__title">
                              <h4>Location</h4>
                            </div>
                            <p>{ContactInfo.address}</p>
                          </div>
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

      <div className="bd-google__map-area pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-10 col-xl-11">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24187.924717451475!2d-74.17913762136895!3d40.72922934784896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1655544592973!5m2!1sen!2sbd" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
