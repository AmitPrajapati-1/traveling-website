import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost/myweb/getPackages.php';

const TravelCarousel = () => {
    const [packages, setPackages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setPackages(data);
                setIsLoading(false);
            } catch (err) {
                setError('Error fetching packages');
                setIsLoading(false);
            }
        };

        fetchPackages();
    }, []);

    // Automatically change the current index every 3 seconds to show 4 packages
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % packages.length);
        }, 3000); // 3000ms = 3 seconds

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [packages.length]); // Depend on packages.length to ensure the interval is set correctly after data is fetched

    // Handle Previous Button Click
    const handlePrevClick = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? packages.length - 4 : prevIndex - 4));
    }, [packages.length]);

    // Handle Next Button Click
    const handleNextClick = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 4) % packages.length);
    }, [packages.length]);

    // Get 4 visible packages at a time
    const getVisiblePackages = () => {
        const visiblePackages = [];
        for (let i = 0; i < 4; i++) {
            visiblePackages.push(packages[(currentIndex + i) % packages.length]);
        }
        return visiblePackages;
    };

    // Handle Image Error
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/150';
    };

    // Format Price
    const formatPrice = (price) => {
        return price ? `₹ ${price}` : 'Price not available';
    };

    if (isLoading) {
        return <div className="text-center py-6">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-6">{error}</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-[300px] bg-100 px-4 py-6">
            <div className="relative flex items-center space-x-4">
                {/* Prev Button */}
                <button
                    onClick={handlePrevClick}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
                >
                    &#8592;
                </button>

                {/* Carousel Cards */}
                <div className="flex space-x-4 transition-transform duration-500">
                    {getVisiblePackages().map((pkg, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden w-64 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                src={pkg.image}
                                alt={pkg.title}
                                className="w-full h-40 object-cover"
                                onError={handleImageError}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{pkg.title}</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-gray-500">
                                        From <span className="font-bold">{formatPrice(pkg.price)}</span>
                                    </span>

                                    {/* Link to navigate to TravelPackageCard page */}
                                    <Link to={`/TravelPackageCard/${pkg.id}`} className="text-blue-500 mt-4 block">
                                        Explore <i className="fas fa-arrow-right ml-1"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNextClick}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
};

export default TravelCarousel;
