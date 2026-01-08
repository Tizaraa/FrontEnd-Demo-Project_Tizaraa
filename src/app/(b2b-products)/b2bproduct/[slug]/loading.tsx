"use client";

export default function Loading() {
 const skeletonStyle = {
  backgroundColor: "#e2e8f0",
  borderRadius: "0.375rem",
  animation: "pulse 1.5s ease-in-out infinite",
 };

 const pulseAnimation = `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `;

 return (
  <div style={{ maxWidth: "112rem", margin: "0 auto", padding: "2rem 1rem" }}>
   <style>{pulseAnimation}</style>
   {/* Breadcrumb Skeleton */}
   <div
    style={{
     display: "flex",
     alignItems: "center",
     gap: "0.5rem",
     marginBottom: "2rem",
    }}
   >
    {[1, 2, 3].map((i) => (
     <div
      key={i}
      style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
     >
      <div style={{ ...skeletonStyle, height: "1rem", width: "4rem" }} />
      <div style={{ fontSize: "1rem", color: "#94a3b8" }}>›</div>
     </div>
    ))}
   </div>

   <div
    style={{
     display: "grid",
     gridTemplateColumns: "repeat(12, 1fr)",
     gap: "2rem",
    }}
   >
    {/* Product Image Skeleton */}
    <div style={{ gridColumn: "span 4" }}>
     <div
      style={{ ...skeletonStyle, aspectRatio: "1 / 1", marginBottom: "1rem" }}
     />
     <div
      style={{
       display: "grid",
       gridTemplateColumns: "repeat(4, 1fr)",
       gap: "0.5rem",
      }}
     >
      {[1, 2].map((i) => (
       <div key={i} style={{ ...skeletonStyle, aspectRatio: "1 / 1" }} />
      ))}
     </div>
    </div>

    {/* Product Details Skeleton */}
    <div style={{ gridColumn: "span 5" }}>
     <div style={{ ...skeletonStyle, height: "2rem", width: "75%" }} />
     <div
      style={{
       ...skeletonStyle,
       height: "1.5rem",
       width: "6rem",
       marginTop: "1rem",
      }}
     />
     <div style={{ marginTop: "1rem" }}>
      {[1, 2, 3].map((i) => (
       <div
        key={i}
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
       >
        <div
         style={{ ...skeletonStyle, height: "1.25rem", width: `${i * 4}rem` }}
        />
        <div
         style={{ ...skeletonStyle, height: "1.25rem", width: `${i * 8}rem` }}
        />
       </div>
      ))}
     </div>
     <div
      style={{
       ...skeletonStyle,
       height: "1.25rem",
       width: "12rem",
       marginTop: "1rem",
      }}
     />
     <div style={{ marginTop: "1rem" }}>
      <div style={{ ...skeletonStyle, height: "2.5rem", width: "8rem" }} />
     </div>
    </div>

    {/* Shipping & Payment Info Skeleton */}
    <div style={{ gridColumn: "span 3" }}>
     {["Shipping", "Payments", "Returns"].map((section, index) => (
      <div key={index} style={{ marginBottom: "2rem" }}>
       <div
        style={{
         ...skeletonStyle,
         height: "1.25rem",
         width: "5rem",
         marginBottom: "0.75rem",
        }}
       />
       <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
         style={{
          ...skeletonStyle,
          height: "2rem",
          width: "2rem",
          borderRadius: "50%",
         }}
        />
        <div
         style={{
          ...skeletonStyle,
          height: "1.25rem",
          width: `${8 + index * 8}rem`,
         }}
        />
       </div>
      </div>
     ))}
     {/* QR Code */}
     <div style={{ textAlign: "center", marginBottom: "2rem" }}>
      <div
       style={{
        ...skeletonStyle,
        height: "8rem",
        width: "8rem",
        margin: "0 auto",
       }}
      />
      <div
       style={{
        ...skeletonStyle,
        height: "1rem",
        width: "12rem",
        marginTop: "1rem",
       }}
      />
     </div>
     {/* Seller Info */}
     <div>
      <div
       style={{
        ...skeletonStyle,
        height: "1.25rem",
        width: "4rem",
        marginBottom: "1rem",
       }}
      />
      <div
       style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
       }}
      >
       <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
         style={{
          ...skeletonStyle,
          height: "2rem",
          width: "2rem",
          borderRadius: "50%",
         }}
        />
        <div>
         <div
          style={{
           ...skeletonStyle,
           height: "1rem",
           width: "6rem",
           marginBottom: "0.5rem",
          }}
         />
         <div style={{ ...skeletonStyle, height: "1rem", width: "5rem" }} />
        </div>
       </div>
       <div style={{ ...skeletonStyle, height: "2.25rem", width: "6rem" }} />
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
