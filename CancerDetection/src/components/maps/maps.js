import { useState } from 'react'
import axios from 'axios'
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
import Navbar from '../navbar/navbar'
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import './maps.css'
const Token = "pk.eyJ1Ijoic2Fpa3VtYXIzIiwiYSI6ImNscjRtemcycTFnMXkyam8xOXIzMG9oMWgifQ.EMbgdqSKTvIrE0yjrC20_w"
function Maps() {
    document.querySelector('title').textContent = "CancerCare | Hospitals"
    const [location, setLocation] = useState([17.39732591351507, 78.49027731768723])
    const [viewport, setViewport] = useState({
        latitude: 17.39732591351507,
        longitude: 78.49027731768723,
        zoom: 15
    })
    const [Hospitals, setHospitals] = useState([])
    const ongeolocation = (e) => {
        setLocation([e.coords.latitude, e.coords.longitude])
        setViewport({ ...viewport, latitude: e.coords.latitude, longitude: e.coords.longitude })
        getHospitals([e.coords.latitude, e.coords.longitude])
    }
    const onClicked = (e) => {
        setLocation([e.lngLat.lat, e.lngLat.lng])
        setViewport({ ...viewport, latitude: e.lngLat.lat, longitude: e.lngLat.lng })
        getHospitals([e.lngLat.lat, e.lngLat.lng])
    }
    const onSearchlocation = (coords) => {
        setLocation(coords)
        setViewport({ ...viewport, latitude: coords[0], longitude: coords[1] })
        getHospitals(coords)
    }
    const getHospitals = async (coords) => {
        const overpassUrl = "http://overpass-api.de/api/interpreter";
        const overpassQuery = `
        [out:json];
        node(around:5000,${coords[0]},${coords[1]})["amenity"="hospital"];
        out;
        `;
        await axios.get(overpassUrl, { params: { data: overpassQuery } })
            .then((res) => {
                setHospitals(res.data.elements)
                if (res.data.elements.length === 0) {
                    alert("Sorry, There is no nearby Hospitals!")
                    return;
                }
            })
    }
    return (
        <div className='mainmap'>
            <Navbar />
            {Hospitals.length !== 0 && <SideBar Hospitals={Hospitals} />}
            <SearchBar onSearchlocation={onSearchlocation} />
            <ReactMapGL
                cursor='pointer'
                {...viewport}
                onClick={(e) => onClicked(e)}
                mapboxAccessToken={Token}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onMove={(viewport) => setViewport(viewport.viewState)}
            >
                <Marker
                    color='red'
                    latitude={location[0]}
                    longitude={location[1]} />
                {Hospitals.map(p => {
                    return (
                        <Marker
                            latitude={p.lat}
                            longitude={p.lon}
                            key={p.id}
                        />
                    )
                })}
                <GeolocateControl onGeolocate={ongeolocation} position='bottom-right' />
            </ReactMapGL>
        </div>
    )
}

export default Maps

