import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useProperty } from "../contexts/PropertyContext";

const AddProperty = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    furnished: "",
    securityDeposit: "",
    maintenanceCharges: "",
    amenities: [],
    parking: "",
    images: [],
    // Removed ownerName, ownerPhone, ownerEmail
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useAuth();
  const { addProperty } = useProperty();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting property with user token:", user?.token);
    console.log("Form data:", formData);

    if (!user || !user.token) {
      setError("You must be logged in to add a property.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();

      // Append all form data
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((image) => {
            formDataToSend.append("images", image);
          });
        } else if (key === "amenities") {
          formDataToSend.append(
            "amenities",
            JSON.stringify(formData.amenities)
          );
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Remove appending owner ID from auth context since backend sets owner from token
      // if (user?.id) {
      //   formDataToSend.append("owner", user.id);
      // }

      await addProperty(formDataToSend);
      setSuccess(true);

      // Reset form
      setFormData({
        type: "",
        title: "",
        description: "",
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        furnished: "",
        securityDeposit: "",
        maintenanceCharges: "",
        amenities: [],
        parking: "",
        images: [],
      });
      setCurrentStep(1);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || "Failed to add property");
      }
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const amenityOptions = [
    "WiFi",
    "Parking",
    "Air Conditioning",
    "Gym",
    "Swimming Pool",
    "Security",
    "Lift",
    "Power Backup",
    "Water Supply",
    "Gas Pipeline",
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div>
              <label className="block text-sm font-medium mb-2">
                Property Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Type</option>
                <option value="Bungalow">Bungalow</option>
                <option value="Flat">Flat</option>
                <option value="Tenement">Tenement</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., 2BHK Apartment in City Center"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="4"
                placeholder="Describe your property..."
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Location Details</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., Alkapuri, Vadodara"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Property Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  min="0"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Area (sq ft)
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Furnished
                </label>
                <select
                  name="furnished"
                  value={formData.furnished}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select</option>
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Monthly Rent
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Security Deposit
                </label>
                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Maintenance Charges
              </label>
              <input
                type="number"
                name="maintenanceCharges"
                value={formData.maintenanceCharges}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Amenities & Images</h3>
            <div>
              <label className="block text-sm font-medium mb-2">
                Amenities
              </label>
              <div className="grid grid-cols-2 gap-2">
                {amenityOptions.map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="mr-2"
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Property Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Property ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Parking
                </label>
                <select
                  name="parking"
                  value={formData.parking}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select</option>
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
              {/* Removed ownerName, ownerPhone, ownerEmail fields */}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Add New Property
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Property added successfully!
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs">Basic Info</span>
              <span className="text-xs">Location</span>
              <span className="text-xs">Details</span>
              <span className="text-xs">Amenities</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Property"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
