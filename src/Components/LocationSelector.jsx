import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // 1. useEffect to load countries when component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // 2. useEffect to load states when a country is selected
  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry) {
        try {
          const res = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
          );
          setStates(res.data);
          setSelectedState("");
          setSelectedCity("");
          setCities([]);
        } catch (err) {
          console.error("Error fetching states:", err);
        }
      }
    };
    fetchStates();
  }, [selectedCountry]);

  // 3. useEffect to load cities when a state is selected
  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountry && selectedState) {
        try {
          const res = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
          );
          setCities(res.data);
          setSelectedCity("");
        } catch (err) {
          console.error("Error fetching cities:", err);
        }
      }
    };
    fetchCities();
  }, [selectedCountry, selectedState]);

  return (
    <>
    <div
      style={{
        padding: "2rem",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h2 style={{ textAlign: "center", width: "100%" }}>Select Location</h2>

      {/* Row-wise dropdowns */}
      <div style={{ display: "flex", gap: "20px", marginTop: "1rem" }}>
        {/* Country */}
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          style={{
            width: "200px",
            height: "40px",
            fontSize: "16px",
          }}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* State */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
          style={{
            width: "200px",
            height: "40px",
            fontSize: "16px",
          }}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
          style={{
            width: "200px",
            height: "40px",
            fontSize: "16px",
          }}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Final text */}
    <span>
  {selectedCity && selectedState && selectedCountry
    ? `You selected ${selectedCity}, ${selectedState}, ${selectedCountry}`
    : ""}
</span>



    </div>
    </>
  );
};

export default LocationSelector;
