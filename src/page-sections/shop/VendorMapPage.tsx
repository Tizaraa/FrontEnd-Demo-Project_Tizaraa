"use client";
import { useEffect, useRef, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { borderRadius, marginBottom } from "styled-system";

interface Vendor {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  rating: number;
  province?: string;
  city?: string;
  area?: string;
}

interface VendorMapPageProps {
  selectedProvince: string;
  selectedCity: string;
  selectedArea: string;
  vendors: Vendor[];
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "10px",
  marginBottom: "10px"
};

const center = {
  lat: 23.8103, // Default location: Dhaka
  lng: 90.4125,
};

const VendorMapPage: React.FC<VendorMapPageProps> = ({
  selectedProvince,
  selectedCity,
  selectedArea,
  vendors,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["marker"],
  });

  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  // Filter vendors based on selected province, city, and area
  useEffect(() => {
    const filtered = vendors.filter((vendor) => {
      return (
        vendor.province === selectedProvince &&
        vendor.city === selectedCity &&
        vendor.area === selectedArea
      );
    });
    setFilteredVendors(filtered);
  }, [selectedProvince, selectedCity, selectedArea, vendors]);

  // Initialize the map and markers
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.google) return;

    const { AdvancedMarkerElement } = google.maps.marker;

    // Initialize the map
    const map = new google.maps.Map(mapRef.current, {
      center: center,
      zoom: 12,
      mapId: "e1ef4c90f9cab1e5",
    });

    // Clear existing markers
    markersRef.current.forEach((marker) => (marker.map = null));
    markersRef.current = [];

    // Add new markers for filtered vendors
    filteredVendors.forEach((vendor) => {
      const marker = new AdvancedMarkerElement({
        position: { lat: vendor.latitude, lng: vendor.longitude },
        map,
        title: vendor.name,
      });

      // Add click listener to show vendor details
      marker.addListener("click", () => setSelectedVendor(vendor));
      markersRef.current.push(marker);
    });
  }, [isLoaded, filteredVendors]);

  // If Google Maps script is not loaded, return null (no loading indicator)
  if (!isLoaded) return null;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tizaraa Vendors on Map</h1>
      <div ref={mapRef} style={mapContainerStyle} />

      {/* Vendor details popup */}
      {selectedVendor && (
        <div className="absolute bg-white shadow-lg p-4 rounded-lg top-20 left-1/2 transform -translate-x-1/2">
          <h3 className="font-bold">{selectedVendor.name}</h3>
          <p>{selectedVendor.address}</p>
          <p>Rating: ⭐{selectedVendor.rating}</p>
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setSelectedVendor(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorMapPage;