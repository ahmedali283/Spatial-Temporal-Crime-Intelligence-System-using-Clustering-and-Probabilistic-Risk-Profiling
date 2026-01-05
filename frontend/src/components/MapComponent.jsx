import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { Locate } from 'lucide-react';

const LocationMarker = ({ setPosition, manualPosition }) => {
    const map = useMap();

    useEffect(() => {
        if (manualPosition) {
            map.flyTo(manualPosition, 15);
        }
    }, [manualPosition, map]);

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return manualPosition ? <Marker position={manualPosition}></Marker> : null;
};

const MapComponent = ({ onLocationSelect }) => {
    const [position, setPosition] = useState(null);

    // Default to Karachi
    const defaultCenter = [24.8607, 67.0011];

    const handleLocateMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const newPos = { lat: latitude, lng: longitude };
                    setPosition(newPos);
                    onLocationSelect(newPos);
                },
                (err) => {
                    alert("Could not pull location. Please check browser permissions.");
                    console.error(err);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const updatePosition = (pos) => {
        setPosition(pos);
        onLocationSelect(pos);
    }

    return (
        <div className="map-wrapper">
            <button className="locate-btn" onClick={handleLocateMe} title="Use my location">
                <Locate size={20} /> Use My Location
            </button>
            <MapContainer
                center={defaultCenter}
                zoom={12}
                scrollWheelZoom={true}
                style={{ height: '400px', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker setPosition={updatePosition} manualPosition={position} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
