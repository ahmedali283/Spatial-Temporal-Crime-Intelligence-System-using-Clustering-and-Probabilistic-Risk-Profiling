import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

const LocationMarker = ({ setPosition }) => {
    const [position, setPos] = useState(null);

    const map = useMapEvents({
        click(e) {
            setPos(e.latlng);
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
        locationfound(e) {
            setPos(e.latlng);
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
};

const MapComponent = ({ onLocationSelect }) => {
    // Default to Karachi (as hinted by notebooks in previous view)
    const defaultPosition = [24.8607, 67.0011];

    return (
        <div className="map-wrapper">
            <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker setPosition={onLocationSelect} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
