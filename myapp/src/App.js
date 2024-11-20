import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { FaUser, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ImageCarousel from './ImageCarousel';
import TravelCarousel from './card';
import TravelPackageCard from './subcard';
import NextPage from './nextpage';
import Anotherpage from './anotherpage';
import Login from './login';
import { UserProvider, useUser } from './UserContext';
import Bookings from './bookinghistory';
import ContactUsForm from './ContactUs';
import Blog from './blog';
import BlogDetails from './blogdetails';
import DisplayData from './viewbooking';
const Home = () => {
    const { user } = useUser(); 

    return (
        <>
            {/* Image Carousel Section */}
            <div className="relative w-full h-[74vh] bg-slate-200">
                <ImageCarousel />
            </div>

            {/* Hero Section with Overlay */}
            <div className="absolute top-0 left-0 w-full h-[74vh] bg-opacity-50 flex flex-col justify-center items-start p-10 z-10">
                <div className="text-center">
                    <h2 className="text-white text-5xl hero-text">Say yes</h2>
                    <h3 className="text-white text-4xl font-bold">TO YOUR VACATION</h3>
                    <p className="text-white mt-4 max-w-md mx-auto">
                        {/* {user ? user.email : ''} Display user email if logged in */}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy
                        nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    </p>
                    <button className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-full">FIND OUT MORE</button>
                </div>
            </div>

            {/* Travel Packages Section */}
            <div className="relative w-full py-10 bg-slate-200 z-0">
                <h2 className="text-center text-3xl font-bold mb-6">Explore Our Travel Packages</h2>
                <TravelCarousel />
            </div>
        </>
    );
};


const App = () => {

    return (
        <Router>
            <UserProvider>
                <div className="bg w-full h-screen flex flex-col relative ">
                    {/* Header Section */}
                    <header className="flex justify-between items-center p-6 bg-white shadow-md z-20">
                        <div className="flex items-center">
                            <img
                                src="https://img.freepik.com/free-vector/detailed-travel-logo_23-2148616611.jpg?semt=ais_hybrid"
                                alt="Logo"
                                className="mr-3"
                                height={50}
                                width={50}
                            />
                            <div>
                                <h1 className="text-xl font-bold">Touris</h1>
                                <p className="text-sm text-gray-500">We Make it Happen</p>
                            </div>
                        </div>
                        <nav className="flex space-x-6">
                            <Link to="/dashboard" className="text-gray-700 hover:text-teal-500">
                                Home
                            </Link>
                            <Link to="/contact-us" className="text-gray-700 hover:text-teal-500">
                                Contact Us
                            </Link>
                            <Link to="/blog" className="text-gray-700 hover:text-teal-500">
                                Blog
                            </Link>
                            <LoginButton />
                        </nav>
                        <BookingsButton />
                    </header>
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/dashboard" element={<Home />} />
                            <Route path="/" element={<Login />} />
                            <Route path="/TravelPackageCard/:mainPackageId" element={<TravelPackageCard />} />
                            <Route path="/nextpage" element={<NextPage />} />
                            <Route path="/anotherpage/" element={<Anotherpage />} />
                            <Route path="/mybookings" element={<Bookings />} />
                            <Route path="/contact-us" element={<ContactUsForm  />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blogdetails/:id" element={<BlogDetails />} />
                            <Route path="/viewbooking" element={<DisplayData />} />
                        </Routes>
                    </main>
                    <footer className="bg-gray-800 text-white p-4">
                        <div className="container mx-auto text-center ">
                            <p>&copy; 2024 Tourist Places in India. All rights reserved.</p>
                            <div className="mt-2 flex justify-center items-center">
                                <a href="#" className="text-white mx-2">
                                    <FaTwitter size={20} />
                                </a>
                                <a href="#" className="text-white mx-2">
                                    <FaFacebook size={20} />
                                </a>
                                <a href="#" className="text-white mx-2">
                                    <FaInstagram size={20} />
                                </a>
                                <a href="#" className="text-white mx-2">
                                    <FaLinkedin size={20} />
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </UserProvider>
        </Router>
    );
};
const BookingsButton = () => {
    const navigate = useNavigate();  
    const goToBookingsPage = () => {
        navigate('/mybookings');
    };

    return (
        <button onClick={goToBookingsPage} className="bg-teal-500 text-white px-4 py-2 rounded-full flex items-center">
            <FaUser className="mr-2" /> my Bookings
        </button>
    );
};

// Login button component
const LoginButton = () => {
    const { user, logout } = useUser();
    return user ? (
        <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center"
        >
            Logout
        </button>
    ) : (
        <Link to="/" className="bg-teal-500 text-white px-4 py-2 rounded-full flex items-center">
            Login
        </Link>
    );
};

export default App;
