import ToastContainers from "./Utils/ToastContainer";
import PageNotFound404 from "./Errors/PageNotFound404";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Base from "./Pages/Base";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Blogs from "./Pages/Blogs";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Catagories from "./Pages/include/Catagories";
import BlogsDetails from "./Pages/BlogsDetails";
import Checkout from "./Pages/include/Checkout";
import ProductDetails from "./Pages/include/ProductDetails";
import AddToCart from "./Pages/include/AddToCart";
import Gallery from "./Pages/Gallery";
import Login from "./Pages/Login";


function App() {
    return (
        <>
            <BrowserRouter>

                {/* ToastContainer */}
                <ToastContainers/>

                {/* Routes */}
                <Routes>

                    {/* Web Routes */}
                    <Route path='/' element={<Base><Home/></Base>}/>
                    <Route path='*' element={<PageNotFound404/>}/>

                    <Route path="/shop" element={<Base> <Shop title={"Shop"}/> </Base>}/>
                    <Route path="/blogs" element={<Base> <Blogs title={"Blogs"}/> </Base>}/>
                    <Route path="/blogs-details/:slug"
                           element={<Base> <BlogsDetails title={"Blogs Details"}/> </Base>}/>

                    <Route path="/about" element={<Base> <About title={"About Us"}/> </Base>}/>
                    <Route path="/contact" element={<Base> <Contact title={"Contact Us"}/> </Base>}/>
                    <Route path="/gallery" element={<Base> <Gallery title={"Gallery"}/> </Base>}/>
                    <Route path="/catagories" element={<Base> <Catagories/> </Base>}/>

                    <Route path="/product-details/:slug"
                           element={<Base> <ProductDetails title={"Product Details"}/> </Base>}/>
                    <Route path="/add-to-cart" element={<Base> <AddToCart title={"Cart"}/> </Base>}/>
                    <Route path="/checkout" element={<Base> <Checkout title={"Checkout"}/> </Base>}/>

                    <Route path="/login" element={<Base> <Login /> </Base>}/>

                </Routes>

            </BrowserRouter>
        </>
    );
}

export default App;
