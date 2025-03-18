import React from "react";
import {Link} from "react-router-dom";

const Catagories = ({ title }) => {
  return (
    <div>
      <div className="breadcrumb-area pt-10 pb-10">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb__list">
                <span>
                  <Link href="/">Home</Link>
                </span>
                <span>
                  <i className="fa-regular fa-angle-right" />
                </span>
                <span>{title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catagories;
