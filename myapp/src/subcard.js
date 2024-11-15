import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TravelPackageCard = () => {
  const { mainPackageId } = useParams(); // Get the package ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // States to hold the package details and loading/error states
  const [packageDetails, setPackageDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch package details based on the mainPackageId from the URL
  useEffect(() => {
    const fetchPackageDetails = async () => {
      setIsLoading(true);
      setError(null); // Clear any previous errors

      try {
        const response = await fetch(`http://localhost/myweb/getSubPackages.php?main_package_id=${mainPackageId}`);
        const data = await response.json();
        console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setPackageDetails(data);
        }
      } catch (err) {
        console.error('Error fetching package details:', err);
        setError('Error fetching package details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackageDetails();
  }, [mainPackageId]);

  // Show loading spinner or message while the data is being fetched
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;
  }

  // Show error message if an error occurred during data fetching
  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  // Render the package details when data is available
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
        Details for Package {mainPackageId}
      </h2>

      {/* Loop through the package details and display each one */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {packageDetails.map((pkg, index) => (
          <div key={index} className="package-card bg-white border-2 border-gray-300 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:border-blue-500 hover:bg-gradient-to-r hover:from-sky-100 hover:to-sky-50 hover:text-white flex flex-col h-full justify-between">
            {/* Top content */}
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 hover:text-teal-600 transition duration-300">{pkg.sub_package_name}</h3>

              {/* Display images in a flex container */}
              <div className="flex gap-4 mt-4 overflow-x-auto">
                {pkg.images && pkg.images.map((image, idx) => (
                  <div key={idx} className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={image || 'https://via.placeholder.com/150'}
                      alt={pkg.sub_package_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <p className="text-gray-700 text-sm"><strong>Description:</strong> {pkg.description}</p>
              <p className="text-gray-700 text-sm"><strong>Sightseeing:</strong> {pkg.sightseeing}</p>
              <p className="text-gray-700 text-sm"><strong>Transfer:</strong> {pkg.transfer}</p>
              <p className="text-gray-700 text-sm"><strong>Meal Service:</strong> {pkg.meal_service}</p>
              <p className="text-gray-700 text-sm"><strong>Flight Included:</strong> {pkg.flight_included}</p>
              <p className="text-gray-700 text-sm"><strong>Total Nights:</strong> {pkg.total_nights}</p>
              <p className="text-lg font-semibold text-gray-900 mb-4"><strong>Price:</strong> ₹ {pkg.price}</p>

              {/* Display stay details */}
              <div className="mt-4 mb-8"> {/* Added margin bottom to create space */}
                <h4 className="text-lg font-semibold text-gray-800">Stay Details</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {pkg.stay_details && pkg.stay_details.map((stay, idx) => (
                    <li key={idx}>
                      {stay.stay_nights} nights at {stay.place_name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom content - Buttons aligned to the bottom */}
            <div className="flex justify-between mt-6 space-x-4">
  <button
    onClick={() => navigate(`/nextpage?subPackageId=${pkg.sub_package_id}&description=${pkg.description}&price=${pkg.price}&name=${pkg.sub_package_name}`)}
    className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
  >
    Explore More
  </button>
  <button
    onClick={() => navigate(`/anotherpage?packageName=${pkg.sub_package_name}&packagePrice=${pkg.price}`)}
    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
  >
    Book Now
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelPackageCard;
