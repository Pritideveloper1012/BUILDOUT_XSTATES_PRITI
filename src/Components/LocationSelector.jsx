import { useState, useEffect } from "react";
import axios from "axios";

const LocationSelector = () => {
    const [countries,setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    /* Fetch countries */
    useEffect(()=>{
        axios.get(`https://crio-location-selector.onrender.com/countries`)
        .then((res)=>{
            console.log(res.data)
            setCountries(res.data)
        })
        .catch((e)=>{
            console.error("error",e)
        })
    },[])
     
    /* Fetch states when changes country */
     useEffect(()=>{
        if(selectedCountry){
        axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((res)=>{
            console.log(res.data)
            setStates(res.data)
            setCities([])
            setSelectedState("")
            setSelectedCity("")
        })
        .catch((e)=>{
            console.error("error",e)
        })
    }
    },[selectedCountry])

    /* Fetch states when changes country */
     useEffect(()=>{
        if(selectedCountry && selectedState){
        axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((res)=>{
            console.log(res.data)
            setCities(res.data)
            setSelectedCity("")
        })
        .catch((e)=>{
            console.error("error",e)
        })
    }
    },[selectedCountry,selectedState])

    return (
        <div>
            <h1>Select Location</h1>
            {/* Dropdown for Country */}
            <select 
            value={selectedCountry} 
            onChange={(e)=>setSelectedCountry(e.target.value)}
             style={{ marginRight: "1rem", border:"1px solid #dedede", padding:"10px", borderRadius:"2px" }}
            >
                <option value="">Select a Country</option>
                {
                    countries.map((country)=>(
                        <option value={country} key={country}>{country}</option>
                    )
                    )
                }
            </select>
             {/* Dropdown for State */}
            <select 
            value={selectedState}
            onChange={(e)=>setSelectedState(e.target.value)}
             style={{ marginRight: "1rem", border:"1px solid #dedede", padding:"10px", borderRadius:"2px" }}
            >
                <option value="">Select a State</option>
                {
                    states.map((state)=>(
                        <option value={state} key={state}>{state}</option>
                    )
                    )
                }
            </select>
              {/* Dropdown for Cities */}
            <select 
            value={selectedCity}
            onChange={(e)=>setSelectedCity(e.target.value)}
             style={{ marginRight: "1rem", border:"1px solid #dedede", padding:"10px", borderRadius:"2px" }}
            >
                <option value="">Select a City</option>
                {
                    cities.map((city)=>(
                        <option value={city} key={city}>{city}</option>
                    )
                    )
                }
            </select>

           <div>
           {selectedCountry && selectedState && selectedCity && (
            <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
            )}
            </div>
        </div>
    )
}

export default LocationSelector;