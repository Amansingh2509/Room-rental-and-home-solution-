import React, { useState, useEffect } from "react";
import { FileText, CheckCircle } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RentalAgreement = () => {
  const { id } = useParams();
  const [agreed, setAgreed] = useState(false);

  // New state for booking form
  const [renterName, setRenterName] = useState("");
  const [renterEmail, setRenterEmail] = useState("");
  const [renterPhone, setRenterPhone] = useState("");
  const [renterDocumentType, setRenterDocumentType] = useState("");
  const [renterDocumentNumber, setRenterDocumentNumber] = useState("");
  const [renterDocumentImage, setRenterDocumentImage] = useState(null);
  const [propertyId, setPropertyId] = useState("");

  React.useEffect(() => {
    console.log("propertyId state changed:", propertyId);
  }, [propertyId]);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [properties, setProperties] = useState([]);

  // New state to hold submitted booking details
  const [submittedBooking, setSubmittedBooking] = useState(null);

  useEffect(() => {
    // Fetch properties to populate dropdown
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties");
        setProperties(response.data);

        // Validate id param and set propertyId only if it exists in fetched properties
        if (id && response.data.some((p) => p._id === id)) {
          setPropertyId(id);
        } else if (response.data.length > 0) {
          // Fallback: set propertyId to first property if id param invalid
          setPropertyId(response.data[0]._id);
        }
        console.log("Properties fetched:", response.data);
        console.log("PropertyId set to:", propertyId);
      } catch (error) {
        console.error("Failed to fetch properties", error);
      }
    };
    fetchProperties();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError("");

    console.log("Submitting booking with propertyId:", propertyId);
    if (!propertyId) {
      setBookingError("Please select a property.");
      return;
    }
    console.log({
      renterName,
      renterEmail,
      renterPhone,
      renterDocumentType,
      renterDocumentNumber,
      propertyId,
      additionalDetails,
      renterDocumentImage,
    });

    try {
      const formData = new FormData();
      formData.append("renterName", renterName);
      formData.append("renterEmail", renterEmail);
      formData.append("renterPhone", renterPhone);
      formData.append("renterDocumentType", renterDocumentType);
      formData.append("renterDocumentNumber", renterDocumentNumber);
      console.log("Appending propertyId to formData:", propertyId);
      formData.append("propertyId", propertyId ? propertyId.trim() : "");
      formData.append("additionalDetails", additionalDetails);
      if (renterDocumentImage) {
        formData.append("renterDocumentImage", renterDocumentImage);
      }

      const response = await axios.post("/api/properties/booking", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setBookingSuccess(true);
        // Save submitted booking details for display
        setSubmittedBooking({
          renterName,
          renterEmail,
          renterPhone,
          renterDocumentType,
          renterDocumentNumber,
          propertyId,
          additionalDetails,
        });
      }
    } catch (error) {
      // Show backend error message if available
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setBookingError(error.response.data.message);
      } else {
        setBookingError("Failed to submit booking. Please try again.");
      }
    }
  };

  const handlePropertyChange = (e) => {
    setPropertyId(e.target.value);
    console.log("PropertyId changed to:", e.target.value);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
        <h1 className="text-2xl font-bold mb-4 flex items-center">
          <FileText className="mr-2" /> Rental Agreement
        </h1>

        <p className="text-gray-700 mb-4">
          This rental agreement outlines the terms and conditions for staying at
          the listed property. By proceeding, you agree to follow these rules
          during your tenancy.
        </p>

        <div className="space-y-3 text-sm text-gray-800">
          <p>
            1. A valid government ID proof is mandatory at the time of check-in.
          </p>
          <p>
            2. A security deposit (20% of rent) is required and refundable upon
            exit.
          </p>
          <p>
            3. No illegal activities or subletting is permitted on the property.
          </p>
          <p>4. Rent must be paid by the 5th of every month without delay.</p>
          <p>
            5. Property should be returned in good condition. Damages will be
            chargeable.
          </p>
          <p>
            6. Noise complaints and neighbor disturbances may lead to eviction.
          </p>
          <p>7. Early termination requires at least 15 days’ notice.</p>
          <p>
            8. Pets are {`not allowed`}/allowed as per listing owner's terms.
          </p>
          <p>
            9. Smoking and alcohol are strictly prohibited in shared premises.
          </p>
        </div>

        {!agreed ? (
          <button
            onClick={() => setAgreed(true)}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            I Agree & Proceed
          </button>
        ) : bookingSuccess ? (
          <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-300">
            <p className="flex items-center text-green-700 font-medium mb-2">
              <CheckCircle className="mr-2" />
              Booking submitted successfully!
            </p>
            <p className="text-gray-700">
              The property owner will contact you soon at your provided contact
              details.
            </p>
          </div>
        ) : submittedBooking ? (
          <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-300">
            <h2 className="text-lg font-semibold mb-2">Booking Details</h2>
            <p>
              <strong>Name:</strong> {submittedBooking.renterName}
            </p>
            <p>
              <strong>Email:</strong> {submittedBooking.renterEmail}
            </p>
            <p>
              <strong>Phone:</strong> {submittedBooking.renterPhone}
            </p>
            <p>
              <strong>Document Type:</strong>{" "}
              {submittedBooking.renterDocumentType}
            </p>
            <p>
              <strong>Document Number:</strong>{" "}
              {submittedBooking.renterDocumentNumber}
            </p>
            <p>
              <strong>Additional Details:</strong>{" "}
              {submittedBooking.additionalDetails || "N/A"}
            </p>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="renterName">
                Full Name
              </label>
              <input
                id="renterName"
                type="text"
                value={renterName}
                onChange={(e) => setRenterName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="renterEmail">
                Email
              </label>
              <input
                id="renterEmail"
                type="email"
                value={renterEmail}
                onChange={(e) => setRenterEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="renterPhone">
                Phone Number
              </label>
              <input
                id="renterPhone"
                type="tel"
                value={renterPhone}
                onChange={(e) => setRenterPhone(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label
                className="block font-medium mb-1"
                htmlFor="renterDocumentType"
              >
                Document Type
              </label>
              <select
                id="renterDocumentType"
                value={renterDocumentType}
                onChange={(e) => setRenterDocumentType(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select Document Type</option>
                <option value="Aadhar">Aadhar</option>
                <option value="PAN">PAN</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>

            <div>
              <label
                className="block font-medium mb-1"
                htmlFor="renterDocumentNumber"
              >
                Document Number
              </label>
              <input
                id="renterDocumentNumber"
                type="text"
                value={renterDocumentNumber}
                onChange={(e) => setRenterDocumentNumber(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label
                className="block font-medium mb-1"
                htmlFor="renterDocumentImage"
              >
                Document Image
              </label>
              <input
                id="renterDocumentImage"
                type="file"
                accept="image/*"
                onChange={(e) => setRenterDocumentImage(e.target.files[0])}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {renterDocumentImage && (
                <img
                  src={URL.createObjectURL(renterDocumentImage)}
                  alt="Document Preview"
                  className="mt-2 max-h-40 object-contain"
                />
              )}
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="propertyId">
                Property / Flat ID
              </label>
              <select
                id="propertyId"
                value={propertyId}
                onChange={handlePropertyChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select Property</option>
                {properties.map((property) => (
                  <option key={property._id} value={property._id}>
                    {property.title} ({property._id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block font-medium mb-1"
                htmlFor="additionalDetails"
              >
                Additional Details
              </label>
              <textarea
                id="additionalDetails"
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {bookingError && (
              <p className="text-red-600 font-medium">{bookingError}</p>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RentalAgreement;
