// "use client";
// import { useEffect, useRef, useState } from "react";
// import { useLoadScript } from "@react-google-maps/api";
// import { borderRadius, marginBottom } from "styled-system";

// interface Vendor {
//   id: number;
//   name: string;
//   latitude: number;
//   longitude: number;
//   address: string;
//   rating: number;
//   province?: string;
//   city?: string;
//   area?: string;
// }

// interface VendorMapPageProps {
//   selectedProvince: string;
//   selectedCity: string;
//   selectedArea: string;
//   vendors: Vendor[];
// }

// const mapContainerStyle = {
//   width: "100%",
//   height: "400px",
//   borderRadius: "10px",
//   marginBottom: "10px",
//   marginTop: "10px"
// };

// const center = {
//   lat: 23.8103, // Default location: Dhaka
//   lng: 90.4125,
// };

// const VendorMapPage: React.FC<VendorMapPageProps> = ({
//   selectedProvince,
//   selectedCity,
//   selectedArea,
//   vendors,
// }) => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
//     libraries: ["marker"],
//   });



//   const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
//   const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

//   // Filter vendors based on selected province, city, and area
//   useEffect(() => {
//     const filtered = vendors.filter((vendor) => {
//       return (
//         vendor.province === selectedProvince &&
//         vendor.city === selectedCity &&
//         vendor.area === selectedArea
//       );
//     });
//     setFilteredVendors(filtered);
//   }, [selectedProvince, selectedCity, selectedArea, vendors]);

//   // Initialize the map and markers
//   useEffect(() => {
//     if (!isLoaded || !mapRef.current || !window.google) return;

//     const { AdvancedMarkerElement } = google.maps.marker;

//     // Initialize the map
//     const map = new google.maps.Map(mapRef.current, {
//       center: center,
//       zoom: 12,
//       mapId: "e1ef4c90f9cab1e5",
//     });

//     // Clear existing markers
//     markersRef.current.forEach((marker) => (marker.map = null));
//     markersRef.current = [];

//     // Add new markers for filtered vendors
//     filteredVendors.forEach((vendor) => {
//       const marker = new AdvancedMarkerElement({
//         position: { lat: vendor.latitude, lng: vendor.longitude },
//         map,
//         title: vendor.name,
//       });

//       // Add click listener to show vendor details
//       marker.addListener("click", () => setSelectedVendor(vendor));
//       markersRef.current.push(marker);
//     });
//   }, [isLoaded, filteredVendors]);

//   // If Google Maps script is not loaded, return null (no loading indicator)
//   if (!isLoaded) return null;

//   return (
//     <div style={{lineHeight: "0", marginLeft: "10px", marginTop: "-10px"}} className="ml-0"> 
//       <h1 className="text-xl font-bold mb-4">Tizaraa Authorized Seller</h1>
//       <div ref={mapRef} style={mapContainerStyle} />

//       {/* Vendor details popup */}
//       {selectedVendor && (
//         <div className="absolute bg-white shadow-lg p-4 rounded-lg top-20 left-1/2 transform -translate-x-1/2">
//           <h3 className="font-bold">{selectedVendor.name}</h3>
//           <p>{selectedVendor.address}</p>
//           <p>Rating: ⭐{selectedVendor.rating}</p>
//           <button
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={() => setSelectedVendor(null)}
//           >
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VendorMapPage;




// "use client";
// import { useEffect, useRef } from "react";
// import { useLoadScript } from "@react-google-maps/api";
// import ApiBaseUrl from "api/ApiBaseUrl";

// // Define the Vendor interface to match the API response (sellerDetails)
// interface Vendor {
//   id: number;
//   shop_name: string;
//   lat: string | null;
//   lon: string | null;
//   seller_address: string;
//   seller_logo: string;
//   shop_name_slug: string;
//   province_name?: string;
//   city_name?: string;
//   area_name?: string;
//   rating?: number;
// }

// interface VendorMapPageProps {
//   selectedProvince: string;
//   selectedCity: string;
//   selectedArea: string;
//   vendors: Vendor[];
// }

// const mapContainerStyle = {
//   width: "100%",
//   height: "600px",
//   borderRadius: "10px",
//   marginBottom: "10px",
//   marginTop: "10px",
// };

// const defaultCenter = {
//   lat: 23.8103, // Default location: Dhaka
//   lng: 90.4125,
// };

// const VendorMapPage: React.FC<VendorMapPageProps> = ({
//   selectedProvince,
//   selectedCity,
//   selectedArea,
//   vendors,
// }) => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
//     libraries: ["places", "marker"],
//   });

//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
//   const mapInstanceRef = useRef<google.maps.Map | null>(null);
//   const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

//   // Initialize the map and markers
// // Initialize the map and markers
// useEffect(() => {
//   if (!isLoaded || !mapRef.current || !window.google) return;

//   const { AdvancedMarkerElement } = google.maps.marker;

//   // Calculate the center dynamically based on vendors with valid lat/lon
//   let center = defaultCenter;
//   const validVendors = vendors.filter((vendor) => vendor.lat && vendor.lon);
//   if (validVendors.length > 0) {
//     const avgLat =
//       validVendors.reduce((sum, vendor) => sum + parseFloat(vendor.lat!), 0) /
//       validVendors.length;
//     const avgLon =
//       validVendors.reduce((sum, vendor) => sum + parseFloat(vendor.lon!), 0) /
//       validVendors.length;
//     center = { lat: avgLat, lng: avgLon };
//   }

//   // Initialize the map
//   const map = new google.maps.Map(mapRef.current, {
//     center: center,
//     zoom: 15, // Fixed zoom level
//     mapId: "e1ef4c90f9cab1e5",
//   });
//   mapInstanceRef.current = map;

//   // Initialize InfoWindow
//   infoWindowRef.current = new google.maps.InfoWindow();

//   // Clear existing markers
//   markersRef.current.forEach((marker) => (marker.map = null));
//   markersRef.current = [];

//   // Add new markers for vendors with valid lat/lon
//   vendors.forEach((vendor) => {
//     if (!vendor.lat || !vendor.lon) return;

//     const lat = parseFloat(vendor.lat);
//     const lon = parseFloat(vendor.lon);

//     if (isNaN(lat) || isNaN(lon)) return;

//     const marker = new AdvancedMarkerElement({
//       position: { lat, lng: lon },
//       map,
//       title: vendor.shop_name,
//     });

//     // Add click listener to show InfoWindow
//     marker.addListener("click", () => {
//       const shopNameSlug =
//         vendor.shop_name_slug || vendor.shop_name.toLowerCase().replace(/\s+/g, "-");

//       const contentString = `
//         <a href="/shops/${shopNameSlug}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
//           <div style="padding: 10px; max-width: 200px; cursor: pointer;">
//             ${
//               vendor.seller_logo
//                 ? `<img
//                      src="${ApiBaseUrl.ImgUrl}${vendor.seller_logo}"
//                      alt="Seller Logo"
//                      style="width: 64px; height: 64px; margin-bottom: 8px; object-fit: contain;"
//                      onerror="this.style.display='none';"
//                    />`
//                 : `<div style="width: 64px; height: 64px; margin-bottom: 8px; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center; color: #6b7280;">
//                      No Logo
//                    </div>`
//             }
//             <h3 style="font-weight: bold; margin-bottom: 5px;">${vendor.shop_name}</h3>
//             <p style="margin-bottom: 5px;">${vendor.seller_address}</p>
//             <p style="margin-bottom: 5px;">Rating: ⭐${vendor.rating || 5}</p>
//           </div>
//         </a>
//       `;
//       infoWindowRef.current!.setContent(contentString);
//       infoWindowRef.current!.open(map, marker);
//     });

//     markersRef.current.push(marker);
//   });

//   // Adjust map bounds to fit all markers
//   if (validVendors.length > 0) {
//     const bounds = new google.maps.LatLngBounds();
//     validVendors.forEach((vendor) => {
//       if (vendor.lat && vendor.lon) {
//         bounds.extend({
//           lat: parseFloat(vendor.lat),
//           lng: parseFloat(vendor.lon),
//         });
//       }
//     });

//     map.fitBounds(bounds);

//     // Slightly zoom out to level 8 after the bounds are applied
//     google.maps.event.addListenerOnce(map, "bounds_changed", () => {
//       if (map.getZoom() > 15) {
//         map.setZoom(15); // Ensures a fixed zoom level of 8
//       }
//     });
//   }
// }, [isLoaded, vendors]);


//   if (!isLoaded) return <div>Loading Google Maps...</div>;

//   return (
//     <div style={{ lineHeight: "0", marginLeft: "10px", marginTop: "-10px" }} className="ml-0">
//       <h1 className="text-xl font-bold mb-4">Tizaraa Authorized Seller</h1>
//       <div ref={mapRef} style={mapContainerStyle} />
//     </div>
//   );
// };

// export default VendorMapPage;







"use client";
import { useEffect, useRef, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import ApiBaseUrl from "api/ApiBaseUrl";

// Define the Vendor interface to match the API response (sellerDetails)
interface Vendor {
  id: number;
  shop_name: string;
  lat: string | null;
  lon: string | null;
  seller_address: string;
  seller_logo: string;
  shop_name_slug: string;
  province_name?: string;
  city_name?: string;
  area_name?: string;
  rating?: number;
}

interface VendorMapPageProps {
  selectedProvince: string;
  selectedCity: string;
  selectedArea: string;
  vendors: Vendor[];
}

const mapContainerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "10px",
  marginBottom: "10px",
  marginTop: "10px",
  position: "relative" as const, // For overlay positioning
};

const defaultCenter = {
  lat: 23.8103, // Default location: Dhaka
  lng: 90.4125,
};

const VendorMapPage: React.FC<VendorMapPageProps> = ({
  selectedProvince,
  selectedCity,
  selectedArea,
  vendors,
}) => {
  const [showOverlay, setShowOverlay] = useState(true); // State to toggle overlay visibility
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places", "marker"],
  });

  const mapRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  // Initialize the map and markers when the map is loaded or vendors change
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.google) return;

    const { AdvancedMarkerElement } = google.maps.marker;

    // Calculate the center dynamically based on vendors with valid lat/lon
    let center = defaultCenter;
    const validVendors = vendors.filter((vendor) => vendor.lat && vendor.lon);
    if (validVendors.length > 0) {
      const avgLat =
        validVendors.reduce((sum, vendor) => sum + parseFloat(vendor.lat!), 0) /
        validVendors.length;
      const avgLon =
        validVendors.reduce((sum, vendor) => sum + parseFloat(vendor.lon!), 0) /
        validVendors.length;
      center = { lat: avgLat, lng: avgLon };
    }

    // Initialize the map
    const map = new google.maps.Map(mapRef.current, {
      center: center,
      zoom: 15,
      mapId: "e1ef4c90f9cab1e5",
      mapTypeId: "roadmap", // Default to roadmap view
      streetViewControl: true, // Enable Street View
      mapTypeControl: true, // Enable map type control (satellite/roadmap toggle via default Google Maps UI)
      zoomControl: true, // Enable zoom control
      fullscreenControl: true, // Enable fullscreen control
      draggable: true, // Enable dragging by default
      scrollwheel: true, // Enable scroll zooming
    });
    mapInstanceRef.current = map;

    // Initialize InfoWindow
    infoWindowRef.current = new google.maps.InfoWindow();

    // Clear existing markers
    markersRef.current.forEach((marker) => (marker.map = null));
    markersRef.current = [];

    // Add new markers for vendors with valid lat/lon
    vendors.forEach((vendor) => {
      if (!vendor.lat || !vendor.lon) return;

      const lat = parseFloat(vendor.lat);
      const lon = parseFloat(vendor.lon);

      if (isNaN(lat) || isNaN(lon)) return;

      const marker = new AdvancedMarkerElement({
        position: { lat, lng: lon },
        map,
        title: vendor.shop_name,
      });

      // Add click listener to show InfoWindow
      marker.addListener("click", () => {
        const shopNameSlug =
          vendor.shop_name_slug || vendor.shop_name.toLowerCase().replace(/\s+/g, "-");

        const contentString = `
          <a href="/shops/${shopNameSlug}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
            <div style="padding: 10px; max-width: 200px; cursor: pointer;">
              ${
                vendor.seller_logo
                  ? `<img
                       src="${ApiBaseUrl.ImgUrl}${vendor.seller_logo}"
                       alt="Seller Logo"
                       style="width: 64px; height: 64px; margin-bottom: 8px; object-fit: contain;"
                       onerror="this.style.display='none';"
                     />`
                  : `<div style="width: 64px; height: 64px; margin-bottom: 8px; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center; color: #6b7280;">
                       No Logo
                     </div>`
              }
              <h3 style="font-weight: bold; margin-bottom: 5px;">${vendor.shop_name}</h3>
              <p style="margin-bottom: 5px;">${vendor.seller_address}</p>
              <p style="margin-bottom: 5px;">Rating: ⭐${vendor.rating || 5}</p>
            </div>
          </a>
        `;
        infoWindowRef.current!.setContent(contentString);
        infoWindowRef.current!.open(map, marker);
      });

      markersRef.current.push(marker);
    });

    // Adjust map bounds to fit all markers
    if (validVendors.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      validVendors.forEach((vendor) => {
        if (vendor.lat && vendor.lon) {
          bounds.extend({
            lat: parseFloat(vendor.lat),
            lng: parseFloat(vendor.lon),
          });
        }
      });

      map.fitBounds(bounds);

      // Slightly zoom out to level 15 after the bounds are applied
      google.maps.event.addListenerOnce(map, "bounds_changed", () => {
        if (map.getZoom() > 15) {
          map.setZoom(15);
        }
      });
    }
  }, [isLoaded, vendors]); // Re-run when vendors change

  // Enable map interactions when overlay is removed
  useEffect(() => {
    if (mapInstanceRef.current) {
      if (showOverlay) {
        mapInstanceRef.current.setOptions({
          draggable: false, // Disable dragging when overlay is shown
          scrollwheel: false, // Disable scroll zooming when overlay is shown
          zoomControl: false, // Disable zoom control when overlay is shown
        });
      } else {
        mapInstanceRef.current.setOptions({
          draggable: true, // Re-enable dragging
          scrollwheel: true, // Re-enable scroll zooming
          zoomControl: true, // Re-enable zoom control
        });
      }
    }
  }, [showOverlay]);

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    // <div style={{ lineHeight: "0", marginLeft: "10px", marginTop: "-10px" }} className="ml-0">
    //   <h1 className="text-xl font-bold mb-4">Tizaraa Authorized Seller</h1>
    //   <div style={mapContainerStyle}>
    //     {/* Map Container */}
    //     <div
    //       ref={mapRef}
    //       style={{
    //         ...mapContainerStyle,
    //       }}
    //     />
    //     {/* Overlay with Button */}
    //     {showOverlay && (
    //       <div
    //         style={{
    //           position: "absolute",
    //           top: 0,
    //           left: 0,
    //           width: "100%",
    //           height: "100%",
    //           display: "flex",
    //           flexDirection: "column",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent dark overlay
    //           borderRadius: "10px",
    //           zIndex: 1,
    //         }}
    //       >
            // <h2
            //   style={{
            //     color: "white",
            //     fontSize: "24px",
            //     fontWeight: "bold",
            //     marginBottom: "20px",
            //     textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Optional shadow for better readability
            //   }}
            // >
            //   Seller Locations
            // </h2>
    //         <button
    //           onClick={() => setShowOverlay(false)}
    //           style={{
    //             padding: "10px 20px",
    //             fontSize: "16px",
    //             fontWeight: "bold",
    //             backgroundColor: "#E94560",
    //             color: "white",
    //             border: "none",
    //             borderRadius: "5px",
    //             cursor: "pointer",
    //             zIndex: 2,
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "center",
    //             gap: "8px",
    //             minWidth: "150px",
    //           }}
    //         >
    //           {/* Location Icon (SVG) */}
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="16"
    //             height="16"
    //             fill="currentColor"
    //             viewBox="0 0 16 16"
    //           >
    //             <path
    //               fillRule="evenodd"
    //               d="M8 0a5.5 5.5 0 0 1 5.5 5.5c0 3.038-5.5 10.5-5.5 10.5S2.5 8.538 2.5 5.5A5.5 5.5 0 0 1 8 0zm0 2a3.5 3.5 0 0 0-3.5 3.5c0 2.038 3.5 7.5 3.5 7.5s3.5-5.462 3.5-7.5A3.5 3.5 0 0 0 8 2zM8 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
    //             />
    //           </svg>
    //           <span>Show on Map</span>
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // </div>


  <div style={{ lineHeight: "0", marginLeft: "10px", marginTop: "-10px" }} className="ml-0">
  {/* <h1 className="text-xl font-bold mb-4">Tizaraa Authorized Seller</h1> */}
  <div style={mapContainerStyle}>
    {/* Map Container */}
    <div
      ref={mapRef}
      style={{
        ...mapContainerStyle,
      }}
    />
    {/* Image with Button and Overlay */}
    {showOverlay && (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          zIndex: 1,
          backgroundImage: `url('https://minio.tizaraa.shop/tizaraa/frontend/map.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // Overlay effect
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark overlay
          backgroundBlendMode: "darken",
        }}
      >
        <h2
          style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Optional shadow for better readability
          }}
          >
          Seller Locations
        </h2>
        <button
          onClick={() => setShowOverlay(false)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#E94560",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            minWidth: "150px",
          }}
        >
          {/* Location Icon (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 0a5.5 5.5 0 0 1 5.5 5.5c0 3.038-5.5 10.5-5.5 10.5S2.5 8.538 2.5 5.5A5.5 5.5 0 0 1 8 0zm0 2a3.5 3.5 0 0 0-3.5 3.5c0 2.038 3.5 7.5 3.5 7.5s3.5-5.462 3.5-7.5A3.5 3.5 0 0 0 8 2zM8 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
            />
          </svg>
          <span>Show on Map</span>
        </button>
      </div>
    )}
  </div>
</div>


  );
};

export default VendorMapPage;