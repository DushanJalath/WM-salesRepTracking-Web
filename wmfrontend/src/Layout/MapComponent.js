import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import {
    Container,
    Row,
    Col,
} from "react-bootstrap";
import {useJsApiLoader, GoogleMap, Marker, InfoWindow, Polyline} from "@react-google-maps/api";
import axios from "axios";
import {useParams} from "react-router-dom";

const center = {lat: 48.8584, lng: 2.2945}; // Default center

function MapComponent() {
    const {repId} = useParams();

    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDvERMXD4BvE5p8HSXK8wLBQI5BtwxVhdU",
        libraries: ["geometry"],
    });

    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [locations, setLocations] = useState([]); // Array of location objects (latitude, longitude)
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [salesData, setSalesData] = useState([]);
    const [contact, setContact] = useState("");

    useEffect(() => {
        // Fetch location data from your server
        axios.get(`http://localhost:8081/getRepsLocation/${repId}`)
            .then(response => {
                console.log(response.data);
                setLocations(response.data); // Assuming response.data is an array of location objects
            })
            .catch(error => {
                console.error("Error loading locations:", error);
            });

        axios.get(`http://localhost:8081/getSalesDataBydate/${repId}`)
            .then(response => {
                setSalesData(response.data[0]);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error loading sales data:", error);
            });

        axios.get(`http://localhost:8081/getrepContact/${repId}`)
            .then(response => {
                setContact(response.data[0].mobileNo);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error loading sales data:", error);
            });
    }, []);

    if (!isLoaded || loadError) {
        return <p>Loading... Please wait.</p>;
    }

    const polylinePath = locations.map(location => new window.google.maps.LatLng(location.lat, location.lng));

    return (
        <Container className="alog">
            <Row>
                <Col sm={4}>
                    <div className="p-4 h-100 bg-white shadow">
                        {/* Details Side */}
                        <h2>DETAILS</h2>
                        <Table striped bordered hover responsive>
                            <tbody>
                            <tr>
                                <th>Sales Rep:</th>
                                <td>{salesData.repId}</td>
                            </tr>
                            <tr>
                                <th>Contact:</th>
                                <td>{contact}</td>
                            </tr>
                            <tr>
                                <th>Customer:</th>
                                <td>{salesData.customerId}</td>
                            </tr>
                            <tr>
                                <th>Item:</th>
                                <td>{salesData.itemName}</td>
                            </tr>
                            <tr>
                                <th>Quantity:</th>
                                <td>{salesData.qty}</td>
                            </tr>
                            </tbody>
                        </Table>
                        {/* Add details or any components you want */}
                    </div>
                </Col>
                <Col sm={8}>
                    <div className="position-relative" style={{height: "100vh"}}>
                        {/* Google Map Box */}
                        <GoogleMap
                            center={center}
                            zoom={12}
                            mapContainerStyle={{width: "100%", height: "100%"}}
                            options={{
                                zoomControl: true,
                                streetViewControl: true,
                                mapTypeControl: true,
                                fullscreenControl: true,
                            }}
                            onLoad={(map) => setMap(map)}
                        >
                            {locations.map((location, index) => {
                                const label = index === 0 ? "A" : index === locations.length - 1 ? "B" : "";
                                return (
                                    <Marker
                                        key={index}
                                        position={location}
                                        label={label}
                                        onClick={() => {
                                            setSelectedLocation(location);
                                        }}
                                    />
                                );
                            })}
                            {selectedLocation && (
                                <InfoWindow
                                    position={selectedLocation}
                                    onCloseClick={() => {
                                        setSelectedLocation(null);
                                    }}
                                >
                                    <div>
                                        <p>Location {String.fromCharCode(65 + locations.indexOf(selectedLocation))}</p>
                                    </div>
                                </InfoWindow>
                            )}
                            {locations.length > 1 && (
                                <Polyline
                                    path={polylinePath}
                                    options={{
                                        strokeColor: "#FB6B0E", // Adjust the color as needed
                                        strokeOpacity: 1.0,
                                        strokeWeight: 2,
                                    }}
                                />
                            )}
                        </GoogleMap>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default MapComponent;
