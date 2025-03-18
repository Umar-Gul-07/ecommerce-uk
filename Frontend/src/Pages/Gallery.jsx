import api from "../Utils/Axios";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

const Gallery = () => {
    const [gallery, setGallery] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Set how many items to display per page

    const gallery_list = async () => {
        try {
            const result = await api.get("gallery-list/"); // Fetch all gallery data at once
            setGallery(result.data);
        } catch (e) {
            toast.error(e.message);
        }
    };

    useEffect(() => {
        gallery_list(); // Fetch data once on component load
    }, []);

    // Logic for displaying current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = gallery.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for handling page change
    const totalPages = Math.ceil(gallery.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="bd-gallery__area pt-110 pb-100">
                <div className="container small-container">
                    <div className="row">
                        {currentItems.length > 0 ? (
                            currentItems.map((object) => (
                                <div className="col-xl-4 col-lg-4 col-md-6" key={object.id}>
                                    <div className="bd-singel__gallery-item mb-30">
                                        <div className="bd-gallery-thumb w-img">
                                            <Link to="#">
                                                <img width="80%" height="280px" src={object.image} alt="gallery-thumb"/>
                                            </Link>
                                        </div>
                                        <span className="bd-gallery__action">
                                             <Link className="popup-image" to={object.image}>
                                                <i className="fa-brands fa-envira"/>
                                             </Link>
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">
                                <span style={{fontSize: "20px"}}
                                      className="badge text-danger">No Gallery Data Found</span>
                            </div>
                        )}
                    </div>
                    <div className="bd-basic__pagination d-flex justify-content-center mt-40 mb-30">
                        <nav>
                            <ul className="pagination">
                                {/* Previous button */}
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                        Previous
                                    </button>
                                </li>

                                {/* Page numbers */}
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index}
                                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}

                                {/* Next button */}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Gallery;
