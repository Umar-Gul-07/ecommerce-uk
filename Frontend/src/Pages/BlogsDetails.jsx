import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import api from "../Utils/Axios";
import { toast } from "react-toastify";

const BlogsDetails = ({ title }) => {
    const location = useLocation();
    const { blog } = location.state || {};
    const [recentPosts, setRecentPosts] = useState([]);

    // Fetch recent posts
    const RecentPosts = async () => {
        try {
            const result = await api.get('/blogs/recent-posts/'); // Adjust the endpoint as needed
            setRecentPosts(result.data);
        } catch (error) {
            console.error("Error fetching recent posts", error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        RecentPosts();
    }, []);

    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="blog-area pt-110 pb-60">
                <div className="container small-container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-12">
                            <div className="blog-main-wrapper mb-70">
                                <div className="row">
                                    <div className="blog-wrapper position-relative blog-details-wrapper mb-30">
                                        <div className="blog-thumb">
                                            <img src={blog.image} alt="blog-img" />
                                        </div>
                                        <div className="blog-content-wrapper">
                                            <div className="blog-meta">
                                                <div className="blog-date">
                                                    <i className="fa-solid fa-calendar-days" />
                                                    <span>{blog.created_at}</span>
                                                </div>
                                                <div className="blog-user">
                                                    <i className="fa-regular fa-user" />
                                                    <span>{blog.author}</span>
                                                </div>
                                                <div className="blog-category">
                                                    <i className="fal fa-tag" />
                                                    <span>{blog.category}</span>
                                                </div>
                                            </div>
                                            <div className="blog-content">
                                                <h3>{blog.title}</h3>
                                                <p>{blog.content}</p>
                                                <blockquote>
                                                    <p>
                                                        Fashion is more than just clothing; it's an expression of
                                                        personality, creativity, and confidence. Stay stylish and
                                                        embrace trends that define you.
                                                    </p>
                                                    <p className="mb-0">
                                                        <cite>Fashion Forward</cite>
                                                    </p>
                                                </blockquote>

                                                <div className="blog__details__tag tagcloud">
                                                    <span>Post Tags: </span>
                                                    <Link to="#" rel="tag">
                                                        {blog.tags}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-xl-4 col-lg-8 col-md-8">
                            <div className="sidebar-widget-wrapper mb-70">
                                {/* Search Box */}
                                <div className="sidebar__search p-relative mb-30">
                                    <form action="#">
                                        <input type="text" placeholder="Search for blogs..." />
                                        <button type="submit">
                                            <i className="flaticon-magnifiying-glass" />
                                        </button>
                                    </form>
                                </div>

                                {/* About Author */}
                                <div className="sidebar__widget mb-30">
                                    <div className="sidebar__widget-head mb-35">
                                        <h4 className="sidebar__widget-title">About Author</h4>
                                    </div>
                                    <div className="bd-sidebar__author-box">
                                        <div className="bd-sidebar__blog-text">
                                            <h4>{blog.author}</h4>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Posts */}
                                <div className="sidebar__widget mb-30">
                                    <div className="sidebar__widget-head mb-35">
                                        <h4 className="sidebar__widget-title">Recent Posts</h4>
                                    </div>
                                    <div className="sidebar__widget-content">
                                        <div className="rc__post-wrapper">
                                            {recentPosts.length > 0 ? recentPosts.map((object) => (
                                                <div className="rc__post d-flex align-items-center">
                                                    <div className="rc__thumb mr-20">
                                                        <img src={`http://localhost:8000/${object.image}`} alt="img" />
                                                    </div>
                                                    <div className="rc__content">
                                                        <div className="rc__meta">
                                                            <span>{object.created_at}</span>
                                                        </div>
                                                        <h6 className="rc__title">
                                                            <Link to={`/blogs-details/${object.slug}`}>
                                                                {object.title}
                                                            </Link>
                                                        </h6>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="text-center">
                                                    <span style={{ fontSize: "20px" }} className="badge text-danger">
                                                        No recent blogs found
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="sidebar__widget mb-30">
                                    <div className="sidebar__widget-head mb-35">
                                        <h4 className="sidebar__widget-title">Categories</h4>
                                    </div>
                                    <div className="sidebar__widget-content">
                                        <div className="sidebar__category">
                                            <ul>
                                                <li>
                                                    <a href="news.html">Trendy Outfits</a>
                                                </li>
                                                <li>
                                                    <a href="news.html">Casual Wear</a>
                                                </li>
                                                <li>
                                                    <a href="news.html">Formal Attire</a>
                                                </li>
                                                <li>
                                                    <a href="news.html">Fashion Tips</a>
                                                </li>
                                                <li>
                                                    <a href="news.html">Sustainable Clothing</a>
                                                </li>
                                                <li>
                                                    <a href="news.html">Seasonal Collections</a>
                                                </li>
                                                <li>
                                                    <a href="news.html">Accessories & Styling</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="sidebar__widget mb-30">
                                    <div className="sidebar__widget-head mb-35">
                                        <h4 className="sidebar__widget-title">Tags</h4>
                                    </div>
                                    <div className="sidebar__widget-content">
                                        <div className="sidebar__tag">
                                            <a href="#">Fashion</a>
                                            <a href="#">Trendy</a>
                                            <a href="#">Casual</a>
                                            <a href="#">Accessories</a>
                                            <a href="#">Style</a>
                                            <a href="#">Seasonal</a>
                                            <a href="#">Elegant</a>
                                            <a href="#">Streetwear</a>
                                            <a href="#">Formal</a>
                                            <a href="#">Inspiration</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Sidebar */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogsDetails;
