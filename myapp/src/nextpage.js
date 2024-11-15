import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
const PackageDetails = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const subPackageId = params.get('subPackageId');
  const description = params.get('description');
  const price = params.get('price');
  const name = params.get('name');

  const [itineraries, setItineraries] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [placeDescription, setPlaceDescription] = useState([]); // Defaulting to an empty array

  // Package details for inclusions and exclusions
  const packageDetails = {
    inclusions: [
      'Accommodation on double sharing basis',
      'Breakfast at hotels',
      'All transfers and sightseeing as per itinerary',
      'Toll, parking, driver’s Bata, road tax & fuel charges',
      'All applicable taxes',
    ],
    exclusions: [
      'Airfare or Train Fare',
      'Meals not mentioned above',
      'Anything not mentioned in inclusions',
      'Tips, Insurance, Laundry, Liquors, Wine, etc.',
    ],
  };

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.post('http://localhost/myweb/fetchPackageDetails.php', {
          sub_package_id: subPackageId
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data.status === 'success') {
          setItineraries(response.data.itineraries);
          setErrorMessage('');
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        setErrorMessage('Error occurred while fetching itineraries.');
        console.log('Error:', error);
      }
    };

    const fetchImages = async () => {
      try {
        const response = await axios.post('http://localhost/myweb/imageurl.php', {
          sub_package_id: subPackageId
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data.image_url && response.data.stay_places) {
          setImageUrls(response.data.image_url);
          setPlaceDescription(response.data.stay_places || []); // Ensure it is an array
        } else {
          setErrorMessage(response.data.error || 'No data found');
        }
      } catch (error) {
        setErrorMessage('Error occurred while fetching images.');
        console.log('Error:', error);
      }
    };

    fetchItineraries(); 
    fetchImages(); 
  }, [subPackageId]);
  const navigate = useNavigate(); 
  const handleBookNowClick = () => {
    navigate(`/anotherpage?packageName=${name}&packagePrice=${price}`);  // Navigate to the booking page
  };

  return (
    <div className="max-w-10xl mx-auto px-6 py-10 bg-gray-50  rounded-lg shadow-xl animate__animated animate__fadeInUp">
      {errorMessage && <p className="text-red-500 text-lg font-semibold">{errorMessage}</p>}

      <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">{name}</h1>
      <p className="mt-2 text-xl text-gray-600 text-center">{description}</p>
      <p className="mt-2 text-lg font-semibold text-gray-800 text-center">Price:₹ {price}</p>
      <div className="mt-8 text-center">
        <button 
          onClick={handleBookNowClick} 
          className="px-6 py-3 bg-indigo-600 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
        >
          Book Now
        </button>
      </div>
      {/* Carousel for Images */}
      <div className="mt-8">
        {imageUrls.length > 0 && (
          <Carousel 
            className="rounded-xl shadow-lg border-4 border-indigo-600"
            showThumbs={false} 
            dynamicHeight={false} 
            infiniteLoop 
            autoPlay
            interval={3000}
          >
            {imageUrls.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md border-2 border-gray-300">
                <img src={image.image_url} alt={`package-image-${index}`} className="w-full h-96 object-cover transform transition-all duration-500 hover:scale-105" />
              </div>
            ))}
          </Carousel>
        )}
      </div>

      {/* Stay Places Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Stay Places</h2>
        <ul className="mt-4 space-y-6">
          {Array.isArray(placeDescription) && placeDescription.length > 0 ? (
            placeDescription.map((itinerary, index) => (
              <li key={index} className="p-5 bg-white border-b border-gray-200 rounded-lg shadow-lg hover:bg-indigo-50 transform transition-all duration-300 ease-in-out hover:scale-105">
                <h3 className="text-xl font-semibold text-gray-800">{index + 1}. {itinerary.place_name}</h3>
                <p className="mt-2 text-gray-600">{itinerary.description}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No stay places available.</p>
          )}
        </ul>
      </div>

      {/* Day Itinerary Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Day Itinerary</h2>
        <ul className="mt-4 space-y-6">
          {itineraries.map((itinerary, index) => (
            <li key={index} className="p-5 bg-white border-b border-gray-200 rounded-lg shadow-lg hover:bg-indigo-50 transform transition-all duration-300 ease-in-out hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800">Day {itinerary.day_number} - {itinerary.title}</h3>
              <p className="mt-2 text-gray-600">{itinerary.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Inclusions and Exclusions Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Inclusions</h2>
        <ul className="list-disc pl-5 text-lg text-gray-700 space-y-2">
          {packageDetails.inclusions.map((item, index) => (
            <li key={index} className="text-gray-700 hover:text-indigo-600">{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Exclusions</h2>
        <ul className="list-disc pl-5 text-lg text-gray-700 space-y-2">
          {packageDetails.exclusions.map((item, index) => (
            <li key={index} className="text-gray-700 hover:text-indigo-600">{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Information</h2>
        <p className="text-lg text-gray-700">
          Please note that flight tickets are not included in this package. The price mentioned above is for land-only services.
        </p>
      </section>
    </div>
  );
};

export default PackageDetails;
