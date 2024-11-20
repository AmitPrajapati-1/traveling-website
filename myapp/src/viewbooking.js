import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext'; // Adjust the import based on your project structure

const ViewBooking = () => {
  const { user } = useUser(); // Access the user context
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Your Booking Details
        </h1>

        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h2 className="text-xl font-semibold text-blue-600">Booking ID: {booking.id}</h2>
              <p><strong>User:</strong> {booking.user_name}</p>
              <p><strong>Email:</strong> {booking.to_email}</p>
              <p><strong>Package:</strong> {booking.package_name}</p>
              <p><strong>Price:</strong> ₹{booking.total_price}</p>
              <p><strong>Travel Date:</strong> {booking.travel_date}</p>
              <h3 className="text-lg font-semibold text-green-600">Individual Details:</h3>
              {booking.individual_details.map((individual, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded-md mb-2">
                  <p><strong>Name:</strong> {individual.name}</p>
                  <p><strong>Age:</strong> {individual.age}</p>
                  <p><strong>Contact:</strong> {individual.contact}</p>
                  <p><strong>Aadhar:</strong> {individual.aadhar}</p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div>No bookings available.</div>
        )}
      </div>
    </div>
  );
};

export default ViewBooking;
