import React, { useState, useEffect } from "react";
import axios from "axios";

const CitySelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch countries on first load
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://crio-location-selector.onrender.com/countries");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        alert("Failed to load countries. Please try again.");
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
          setStates(response.data);
        } catch (error) {
          console.error("Error fetching states:", error);
          alert("Failed to load states. Please try again.");
        }
      };
      fetchStates();
    }
  }, [selectedCountry]);

  // Fetch cities when selectedState changes
  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
          setCities(response.data);
        } catch (error) {
          console.error("Error fetching cities:", error);
          alert("Failed to load cities. Please try again.");
        }
      };
      fetchCities();
    }
  }, [selectedState]);

  // Handlers
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
    setCities([]);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select Location</h2>

      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="country">Country:</label>
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="state">State:</label>
        <select id="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="city">City:</label>
        <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* ✅ Show selected location */}
      {selectedCountry && selectedState && selectedCity && (
        <p>
          <strong>Selected Location:</strong> {selectedCountry}, {selectedState}, {selectedCity}
        </p>
      )}
    </div>
  );
};

export default CitySelector;
