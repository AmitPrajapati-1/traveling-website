import React from 'react';

const PackageCard = ({ pkg }) => {
    return (
        <div className="package-card border p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{pkg.sub_package_name}</h3>
            <img
                src={pkg.image_url || 'https://via.placeholder.com/150'}
                alt={pkg.sub_package_name}
                className="w-full h-48 object-cover my-4"
            />
            <p><strong>Description:</strong> {pkg.description}</p>
            <p><strong>Sightseeing:</strong> {pkg.sightseeing}</p>
            <p><strong>Transfer:</strong> {pkg.transfer}</p>
            <p><strong>Meal Service:</strong> {pkg.meal_service}</p>
            <p><strong>Flight Included:</strong> {pkg.flight_included}</p>
            <p><strong>Total Nights:</strong> {pkg.total_nights}</p>
            <p><strong>Stay in:</strong> {pkg.place_name} for {pkg.stay_nights} nights</p>
            <p><strong>Price:</strong> ₹ {pkg.price}</p>
        </div>
    );
};

export default PackageCard;
