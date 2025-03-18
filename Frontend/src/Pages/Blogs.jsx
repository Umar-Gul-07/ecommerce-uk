import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import api from "../Utils/Axios";
import {toast} from "react-toastify";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]); // Blogs fetched from API
    const [filteredBlogs, setFilteredBlogs] = useState([]); // Filtered blogs after search
    const [searchTerm, setSearchTerm] = useState(''); // Search by title or category
    const [currentPage, setCurrentPage] = useState(1); // Current page in pagination
    const [blogsPerPage] = useState(6); // Number of blogs per page

    // Fetch blogs from API
    const blogs_list = async () => {
        try {
            const result = await api.get('blogs-list/');
            setBlogs(result.data);
            setFilteredBlogs(result.data); // Set initial filtered blogs
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Filter blogs based on search term (title or category)
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = blogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(value) ||
                blog.category.toLowerCase().includes(value)
        );
        setFilteredBlogs(filtered);
        setCurrentPage(1); // Reset pagination when search is performed
    };

    useEffect(() => {
        blogs_list();
    }, []);

    // Pagination logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Helmet>
                <title>Blogs</title>
            </Helmet>

            {/* Search Input */}
            <div className="sidebar__search p-relative mb-30 w-50 mx-auto mt-5">
                <form>
                    <input
                        type="text"
                        placeholder="Search for blogs..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button type="submit" onClick={(e) => e.preventDefault()}>
                        <i className="flaticon-magnifiying-glass"/>
                    </button>
                </form>
            </div>

            {/* Blogs List */}
            <section className="bd-news__grid-area pt-110 pb-80">
                <div className="container small-container">
                    <div className="row">
                        {currentBlogs.length > 0 ? (
                            currentBlogs.map((object) => (
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

            {/* Pagination */}
            <div className="bd-basic__pagination d-flex justify-content-center mt-40 mb-30">
                <nav>
                    <ul>
                        {/* Generate page numbers dynamically */}
                        {[...Array(Math.ceil(filteredBlogs.length / blogsPerPage)).keys()].map(number => (
                            <li key={number + 1} className={currentPage === number + 1 ? 'active' : ''}>
                                <a onClick={() => paginate(number + 1)} href="#!">
                                    {number + 1}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                onClick={() => paginate(currentPage + 1)}
                                href="#!"
                                disabled={currentPage >= Math.ceil(filteredBlogs.length / blogsPerPage)}
                            >
                                <i className="fa-regular fa-angle-right"/>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Blogs;
