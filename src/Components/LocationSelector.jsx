import { useState, useEffect } from "react";
import axios from "axios";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch countries
  useEffect(() => {
    axios
      .get(`https://crio-location-selector.onrender.com/countries`)
      .then((res) => {
        setCountries(res.data);
      })
      .catch((e) => {
        console.error("Error fetching countries", e);
      });
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((res) => {
          setStates(res.data);
          setCities([]);
          setSelectedState("");
          setSelectedCity("");
        })
        .catch((e) => {
          console.error("Error fetching states", e);
        });
    }
  }, [selectedCountry]);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((res) => {
          setCities(res.data);
          setSelectedCity("");
        })
        .catch((e) => {
          console.error("Error fetching cities", e);
        });
    }
  }, [selectedCountry, selectedState]);

  return (
    <div>
      <h1>Select Location</h1>

      {/* Country Dropdown */}
      <select
        data-testid="country"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        style={{
          marginRight: "1rem",
          border: "1px solid #dedede",
          padding: "10px",
          borderRadius: "2px",
        }}
      >
        <option value="">Select a Country</option>
        {countries.map((country) => (
          <option value={country} key={country}>
            {country}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <select
        data-testid="state"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        disabled={!selectedCountry}
        style={{
          marginRight: "1rem",
          border: "1px solid #dedede",
          padding: "10px",
          borderRadius: "2px",
        }}
      >
        <option value="">Select a State</option>
        {states.map((state) => (
          <option value={state} key={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        data-testid="city"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedState}
        style={{
          marginRight: "1rem",
          border: "1px solid #dedede",
          padding: "10px",
          borderRadius: "2px",
        }}
      >
        <option value="">Select a City</option>
        {cities.map((city) => (
          <option value={city} key={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Display Final Selection */}
      {selectedCountry && selectedState && selectedCity && (
        <span data-testid="selected-location">
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </span>
      )}
    </div>
  );
};

export default LocationSelector;
