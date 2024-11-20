import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AnotherPage = () => {
  const [formData, setFormData] = useState({
    toEmail: '',
    userName: '',
    packageName: '',
    packagePrice: '',
    numPersons: 1, // Start with 1 person by default
    travelDate: '',
    individualDetails: [{ name: '', age: '', contact: '', aadhar: '' }],
  });

  const [totalPrice, setTotalPrice] = useState(0);  // State to store total price

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const packageName = params.get('packageName');
  const packagePrice = parseFloat(params.get('packagePrice')) || 0;  // Get package price from URL

  // Recalculate total price whenever numPersons or packagePrice changes
  useEffect(() => {
    if (formData.numPersons && packagePrice) {
      setTotalPrice(formData.numPersons * packagePrice);  // Calculate the total price based on numPersons
    }
  }, [formData.numPersons, packagePrice]);  // Dependencies to trigger recalculation
  
  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIndividualDetailsChange = (index, field, value) => {
    const newIndividualDetails = [...formData.individualDetails];
    newIndividualDetails[index][field] = value;
    setFormData({ ...formData, individualDetails: newIndividualDetails });
  };

  const addPerson = () => {
    setFormData({
      ...formData,
      individualDetails: [...formData.individualDetails, { name: '', age: '', contact: '', aadhar: '' }],
    });
  };
  const updatedFormData = { ...formData, totalPrice,  packageName:packageName };
  console.log(updatedFormData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Call the /api/bookings endpoint
      const response = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });
  
      if (response.ok) {
        alert('Booking confirmed! You will receive an email shortly.');
  
        // Step 2: Execute the PHP file
        const phpResponse = await fetch('http://localhost/myweb/bookings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFormData), // Send the same data to the PHP file
        });
  
        const phpResult = await phpResponse.json();
        if (phpResult.success) {
          console.log('PHP file executed successfully:', phpResult.message);
        } else {
          console.error('Error executing PHP file:', phpResult.message);
        }
      } else {
        alert('Error submitting booking. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
    }
  };

  // Increment and decrement the number of persons
  const incrementPersons = () => {
    setFormData(prevData => ({ ...prevData, numPersons: prevData.numPersons + 1 }));
  };

  const decrementPersons = () => {
    setFormData(prevData => ({ ...prevData, numPersons: prevData.numPersons > 1 ? prevData.numPersons - 1 : 1 }));
  };

  return (
    <div className="flex h-screen">
      {/* Right Panel */}
      <div className="flex-1  p-5 overflow-y-auto">
        <h3 className="mt-5 text-2xl text-gray-800">Individual Details</h3>
        {formData.individualDetails.map((person, index) => (
          <div key={index} className="flex flex-col mb-4">
            <input
              type="text"
              placeholder="Name"
              value={person.name}
              onChange={(e) => handleIndividualDetailsChange(index, 'name', e.target.value)}
              required
              className="w-full p-3 my-2 border-2 border-gray-300 rounded-md text-lg"
            />
            <input
              type="number"
              placeholder="Age"
              value={person.age}
              onChange={(e) => handleIndividualDetailsChange(index, 'age', e.target.value)}
              required
              className="w-full p-3 my-2 border-2 border-gray-300 rounded-md text-lg"
            />
            <input
              type="text"
              placeholder="Contact"
              value={person.contact}
              onChange={(e) => handleIndividualDetailsChange(index, 'contact', e.target.value)}
              required
              className="w-full p-3 my-2 border-2 border-gray-300 rounded-md text-lg"
            />
            <input
              type="text"
              placeholder="Aadhar Number"
              value={person.aadhar}
              onChange={(e) => handleIndividualDetailsChange(index, 'aadhar', e.target.value)}
              required
              className="w-full p-3 my-2 border-2 border-gray-300 rounded-md text-lg"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addPerson}
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md"
        >
          Add Another Person
        </button>
      </div>

      {/* Left Panel */}
      <div className="flex-1  p-5 overflow-y-auto">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-center text-3xl text-gray-800 mb-6">Book Your Package</h2>

          <input
            type="email"
            name="toEmail"
            placeholder="Your Email"
            onChange={handleChange}
            required
            className="w-full p-3 my-2 border-2 border-gray-300 rounded-md text-lg"
          />
          <input
            type="text"
            name="userName"
            placeholder="Your Name"
            onChange={handleChange}
            required
            className="w-full p-3 my-2 border-2 border-gray-300 rounded-md text-lg"
          />
          <input
            type="text"
            name="packageName"
            placeholder="Package Name"
            onChange={handleChange}
            required
            className="w-full p-3 my-2 border-2 border-gray-300 rounded-md text-lg"
            value={packageName || formData.packageName} // Fill from URL if available
          />
          <input
            type="number"
            name="packagePrice"
            placeholder="Package Price"
            onChange={handleChange}
            required
            className="w-full p-3 my-2 border-2 border-gray-300 rounded-md text-lg"
            value={packagePrice || formData.packagePrice} // Fill from URL if available
          />

          {/* Increment/Decrement number of persons */}
          <div className="flex justify-center items-center my-4">
            <button type="button" onClick={decrementPersons} className="bg-gray-300 rounded-full px-4 py-2 mr-4 text-lg">-</button>
            <span className="text-xl">{formData.numPersons}</span>
            <button type="button" onClick={incrementPersons} className="bg-gray-300 rounded-full px-4 py-2 ml-4 text-lg">+</button>
          </div>

         <h2>Travel date</h2>
          <input
            type="date"
            name="travelDate"
            onChange={handleChange}
            required
            className="w-full p-3 my-2 border-2 border-gray-300 rounded-md text-lg"
          />

          {/* Display total price */}
          <div className="text-center text-xl font-bold text-gray-800 my-4">
            <strong>Total Price: ₹{totalPrice}</strong>
          </div>

          <button type="submit" className="bg-blue-600 text-white w-full py-3 rounded-md text-lg mt-4">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnotherPage;
