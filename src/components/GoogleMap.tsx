// "use client";
// import { Fragment, useEffect, useRef, useState } from "react";
// import Script from "next/script";

// export default function GoogleMap({ latitude, longitude, locations }) {
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const [isLoaded, setIsLoaded] = useState(false);

//   // Check if Google Maps is loaded
//   const handleScriptLoad = () => {
//     setIsLoaded(true);
//   };

//   useEffect(() => {
//     if (latitude && longitude && isLoaded && window.google) {
//       initMap(latitude, longitude);
//     }
//   }, [latitude, longitude, isLoaded]);

//   function initMap(lat: number, lng: number) {
//     if (mapRef.current && window.google && window.google.maps) {
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: { lat, lng },
//         zoom: 14,
//       });

//       new window.google.maps.Marker({
//         position: { lat, lng },
//         map,
//         title: "You are here!",
//       });
//     }
//   }

//   return (
//     <Fragment>
//       {/* Google Maps API Script */}
//       <Script
//         src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAmAPSNY0a_MHfoTRHzh9UsamdFMuAVs8w`}
//         strategy="afterInteractive"
//         onLoad={handleScriptLoad} // Set isLoaded to true after script loads
//       />

//       {/* Map Container */}
//       <div
//         ref={mapRef}
//         style={{
//           width: "100%",
//           height: "500px",
//           borderRadius: "8px",
//           overflow: "hidden",
//         }}
//       ></div>
//     </Fragment>
//   );
// }

"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function GoogleMap({ latitude, longitude, locations }) {
 const mapRef = useRef<HTMLDivElement | null>(null);
 const [isLoaded, setIsLoaded] = useState(false);

 // Check if Google Maps is loaded
 const handleScriptLoad = () => {
  setIsLoaded(true);
 };

 useEffect(() => {
  if ((latitude || locations) && isLoaded && window.google) {
   initMap(latitude, longitude, locations); // Pass locations as well
  }
 }, [latitude, longitude, locations, isLoaded]);

 function initMap(lat: number, lng: number, locations: any[]) {
  if (mapRef.current && window.google && window.google.maps) {
   const map = new window.google.maps.Map(mapRef.current, {
    center: { lat: lat || 0, lng: lng || 0 }, // Default to 0 if no coords
    zoom: 14,
   });

   // Add marker for current location
   if (lat && lng) {
    new window.google.maps.Marker({
     position: { lat, lng },
     map,
     title: "You are here!",
    });
   }

   // Add markers for all locations passed in the locations prop
   if (locations && Array.isArray(locations)) {
    locations.forEach((location) => {
     const { lat, lng, title } = location;
     new window.google.maps.Marker({
      position: { lat, lng },
      map,
      title: title || "Marker", // Default to "Marker" if no title
     });
    });
   }
  }
 }

 return (
  <Fragment>
   {/* Google Maps API Script */}
   <Script
    src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAmAPSNY0a_MHfoTRHzh9UsamdFMuAVs8w`}
    strategy="afterInteractive"
    onLoad={handleScriptLoad} // Set isLoaded to true after script loads
   />

   {/* Map Container */}
   <div
    ref={mapRef}
    style={{
     width: "100%",
     height: "500px",
     borderRadius: "8px",
     overflow: "hidden",
     marginBottom: "50px",
    }}
   ></div>
  </Fragment>
 );
}
