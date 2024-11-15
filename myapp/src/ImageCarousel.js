import React, { useState, useEffect } from 'react';

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1192671/pexels-photo-1192671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ];

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(goToNext, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval); // Clear interval on component unmount
    }, [currentIndex]);

    return (
        <div className="relative w-full h-full">
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-transform ease-in-out duration-500"
            />
            <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full opacity-70 hover:opacity-100 focus:outline-none"
                aria-label="Previous"
            >
                &#10094;
            </button>
            <button
                onClick={goToNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full opacity-70 hover:opacity-100 focus:outline-none"
                aria-label="Next"
            >
                &#10095;
            </button>
        </div>
    );
};

export default ImageCarousel;
