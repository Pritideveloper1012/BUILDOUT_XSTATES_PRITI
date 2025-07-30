// src/components/LocationSelector.js
import { useState, useEffect } from "react";
import axios from "axios";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch countries initially
  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Error fetching countries", err));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((res) => setStates(res.data))
        .catch((err) => console.error("Error fetching states", err));
      setSelectedState("");
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedCountry && selectedState) {
      axios
        .get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((res) => setCities(res.data))
        .catch((err) => console.error("Error fetching cities", err));
      setSelectedCity("");
    }
  }, [selectedState]);

  return (
    <div>
      <h2>Location Selector</h2>

      {/* Country Dropdown */}
      <select
        data-testid="country"
        onChange={(e) => setSelectedCountry(e.target.value)}
        value={selectedCountry}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <select
        data-testid="state"
        onChange={(e) => setSelectedState(e.target.value)}
        value={selectedState}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        data-testid="city"
        onChange={(e) => setSelectedCity(e.target.value)}
        value={selectedCity}
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Output */}
      {selectedCity && selectedState && selectedCountry && (
        <p data-testid="selected-location">
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      )}
    </div>
  );
};

export default LocationSelector;
