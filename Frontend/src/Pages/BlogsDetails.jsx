import React, {useEffect, useState} from "react";
import Catagories from "./include/Catagories";
import {Helmet} from "react-helmet";
import {Link, useLocation} from "react-router-dom";
import api from "../Utils/Axios";
import {toast} from "react-toastify";

const BlogsDetails = ({title}) => {
    const location = useLocation();
    const {blog} = location.state || {};
    const [recentPosts, setRecentPosts] = useState([]);

    // Fetch recent posts
    const RecentPosts = async () => {
        try {
            const result = await api.get('/blogs/recent-posts/');  // Adjust the endpoint as needed
            setRecentPosts(result.data);
        } catch (error) {
            console.error("Error fetching recent posts", error);
            toast.error(error.message)
        }
    };

    useEffect(() => {
        RecentPosts();
    }, []);
    return (<div>
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
                                        <div className="blog-thumb ">
                                            <img src={blog.image} alt="blog-img"/>
                                        </div>
                                        <div className="blog-content-wrapper">
                                            <div className="blog-meta">
                                                <div className="blog-date">
                                                    <i className="fa-solid fa-calendar-days"/>
                                                    <span>{blog.created_at}</span>
                                                </div>
                                                <div className="blog-user">
                                                    <i className="fa-regular fa-user"/>
                                                    <span>{blog.author}</span>
                                                </div>
                                                <div className="blog-comrent">
                                                    <i className="fal fa-typo3"/>
                                                    <span>{blog.category}</span>
                                                </div>
                                            </div>
                                            <div className="blog-content">
                                                <h3>{blog.title}</h3>
                                                <p>
                                                    {blog.content}
                                                </p>
                                                <blockquote>
                                                    <p>
                                                        Tosser argy-bargy mush loo at public school
                                                        Elizabeth up the duff buggered chinwag on your bike
                                                        mate don’t get shirty with me super, Jeffrey bobby
                                                        Richard cheesed off spend a penny a load of old tosh
                                                        blag horse.
                                                    </p>
                                                    <p className="mb-0">
                                                        <cite>Banana</cite>
                                                    </p>
                                                </blockquote>

                                                <div className="blog__details__tag tagcloud">
                                                    <span>Post Tags : </span>
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
                        <div className="col-xl-4 col-lg-8 col-md-8">
                            <div className="sidebar-widget-wrapper mb-70">
                                <div className="sidebar__search p-relative mb-30">
                                    <form action="#">
                                        <input type="text" placeholder="Search for blogs..."/>
                                        <button type="submit">
                                            <i className="flaticon-magnifiying-glass"/>
                                        </button>
                                    </form>
                                </div>
                                <div className="sidebar__widget mb-30">
                                    <div className="sidebar__widget-head mb-35">
                                        <h4 className="sidebar__widget-title">About Author</h4>
                                    </div>
                                    <div className="bd-sidebar__author-box ">
                                        <div className="bd-sidebar__blog-text">
                                            <h4>{blog.author}</h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="sidebar__widget mb-30">
                                    <div className="sidebar__widget-head mb-35">
                                        <h4 className="sidebar__widget-title">Recent posts</h4>
                                    </div>
                                    <div className="sidebar__widget-content">
                                        <div className="rc__post-wrapper">
                                            {recentPosts.length > 0 ? recentPosts.map((object) => (
                                                <div className="rc__post d-flex align-items-center">
                                                    <div className="rc__thumb mr-20">
                                                        <img src={`http://localhost:8000/${object.image}`} alt="img"/>
                                                    </div>
                                                    <div className="rc__content">
                                                        <div className="rc__meta">
                                                            <span>{object.created_at}</span>
                                                        </div>
                                                        <h6 className="rc__title">
                                                            <Link
                                                                to={`/blogs-details /${object.slug}`}>{object.title}</Link>
                                                        </h6>
                                                    </div>
                                                </div>
                                            )) : <div className="text-center">
                                                <span style={{fontSize: "20px"}} className='badge text-danger'>No recent blogs Found</span>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>


                                <div className="sidebar__widget mb-30">
                                    <div className="sidebar__widget-head mb-35">
                                        <h4 className="sidebar__widget-title">Category</h4>
                                    </div>
                                    <div className="sidebar__widget-content">
                                        <div className="sidebar__category">
                                            <ul>
                                                <li>
                                                    <a href="news.html">Fruit and vegetables.</a>
                                                </li>
                                                <li>
                                                    <a href="news.html">Starchy food</a>
                                                </li>
                                                <li>
                                                    <a href="news.html">Starchy food</a>
                                                </li>
                                                <li>
                                                    <a href="news.html">Protein</a>
                                                </li>
                                                <li>
                                                    <a href="news.html">Health &amp; wellbeing</a>
                                                </li>
                                                <li>
                                                    <a href="news.html">Eat Well, Your Way</a>
                                                </li>
                                                <li>
                                                    <a href="news.html">Fat</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidebar__widget mb-30">
                                    <div className="sidebar__widget-head mb-35">
                                        <h4 className="sidebar__widget-title">Tags</h4>
                                    </div>
                                    <div className="sidebar__widget-content">
                                        <div className="sidebar__tag">
                                            <a href="#">Garden</a>
                                            <a href="#">Gardening</a>
                                            <a href="#">Planting</a>
                                            <a href="#">Grass trimming</a>
                                            <a href="#">Garden</a>
                                            <a href="#">Garden care</a>
                                            <a href="#">Vagitable</a>
                                            <a href="#">Garden</a>
                                            <a href="#">Tree plantation </a>
                                            <a href="#">Tips</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogsDetails;
