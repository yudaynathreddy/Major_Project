import { GoSearch } from "react-icons/go";
import axios from "axios";
import { RiDirectionFill, RiCloseFill } from "react-icons/ri";
import './SearchBar.css'
import { useState } from "react";
function SearchBar({ onSearchlocation }) {
  const [address, setAddress] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const apiKey = "83de4da3eab34fc2a6524fe28557ca9a";
  const onSearch = (event) => {
    event.preventDefault()
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address
    )}&apiKey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        onSearchlocation([data?.features[0]?.geometry?.coordinates[1], data?.features[0]?.geometry?.coordinates[0]])
      })
  }
  const handleTextChange = async () => {
    if (address.length === 0) {
      setSuggestions([])
    }
    else {
      await axios.get(`https://photon.komoot.io/api/?q=${address}&limit=15`)
        .then((res) => {          
          setSuggestions(res.data.features)
        })
    }
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        <GoSearch className="searchicon" />
        <input className="searchbar" value={address} placeholder='Search place' type="text" onChange={(e) => {
          setAddress(e.target.value)
          handleTextChange();
        }} autoFocus />
        <i className="entericon">{address.length !== 0 ? <RiCloseFill style={{ color: "black", cursor: "pointer" }} onClick={() => setAddress("")} /> : <RiDirectionFill />}</i>
      </form>
      {address.length !== 0 && <div className="suggestions">
        {suggestions.map(s => {
          return (
            <div onClick={()=>{
              setAddress("")
              onSearchlocation([s.geometry.coordinates[1],s.geometry.coordinates[0]])
              setSuggestions([])
            }}>
              <p className="suggestionplace" style={{ cursor: "pointer" }} key={s.properties.osm_id}>
                {s.properties.name}
                <br />
                <p style={{ fontSize: "12px" }}>{s.properties.state}, {s.properties.country}</p>
              </p>
              <hr style={{ color: "grey" }} />
            </div>
          )
        })}
      </div>
      }
    </div>
  )
}

export default SearchBar
