import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
const Bookings = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!user) {
      setError('User is not logged in');
      setLoading(false);
      return;
    }
    console.log(user.email);

    // Fetch data from PHP backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/myweb/fetchData.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email }), // Pass the email in the body
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBookings(data); // Set the bookings data to state
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleViewBookings = () => {
    navigate('/viewbooking');
  };

  const handleMakeBooking = () => {
    navigate('/dashboard'); // Adjust this route as needed
  };
  const gotocontact=()=>{
    navigate('/contact-us');
  }
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Welcome to Your Bookings Dashboard
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Here, you can manage your current reservations, make new bookings, and track your upcoming appointments. Let's get you sorted!
        </p>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-600">Your Current Bookings</h2>
            <p className="text-gray-700">
              You have {bookings.length} upcoming bookings. Check the details below or modify your schedule.
            </p>
            <button
              className="mt-4 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
              onClick={handleViewBookings}
            >
              View Bookings
            </button>
          </div>

          

          <div className="bg-green-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-600">Make a New Booking</h2>
            <p className="text-gray-700">Need to schedule a new reservation? Use the button below to book your next service or event.</p>
            <button
              className="mt-4 px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
              onClick={handleMakeBooking}
            >
              Make a Booking
            </button>
          </div>

          
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Need help? <a href="#" className="text-blue-600 hover:underline" onClick={gotocontact}>Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
