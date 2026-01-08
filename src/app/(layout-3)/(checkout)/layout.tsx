// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { Fragment, PropsWithChildren, useEffect, useState } from "react";

// import Box from "@component/Box";
// import Grid from "@component/grid/Grid";
// import Stepper from "@component/Stepper";

// // const stepperList = [
// //   { title: "Cart", disabled: false },
// //   { title: "Details", disabled: false },
// //   { title: "Payment", disabled: false },
// //   { title: "Submit", disabled: true }
// // ];
// const defaultStepperList = [
//   { title: "Cart", disabled: false },
//   { title: "Details", disabled: false },
//   { title: "Payment", disabled: false },
//   { title: "Submit", disabled: true }
// ];

// const rfqStepperList = [
//   { title: "Details", disabled: false },
//   { title: "Submit", disabled: true }
// ];

// export default function Layout({ children }: PropsWithChildren) {
//   const [selectedStep, setSelectedStep] = useState(0);
//   const [stepperList, setStepperList] = useState(defaultStepperList);
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     // Check if the checkout flow is from RFQ
//     const isRfq = searchParams.get("rfq") === "true";
//     setStepperList(isRfq ? rfqStepperList : defaultStepperList);
//   }, [searchParams]);

//   const handleStepChange = (_step: any, ind: number) => {
//     // if(stepperList === rfqStepperList){
//     //   switch (ind) {
//     //     case 0:
//     //       router.push("/checkout?source=rfq");
//     //       break;
//     //     case 1:
//     //       router.push("/orders");
//     //       break;
//     //     default:
//     //       break;
//     //   }
//     // }else{
//     //   switch (ind) {
//     //     case 0:
//     //       router.push("/cart");
//     //       break;
//     //     case 1:
//     //       router.push("/checkout");
//     //       break;
//     //     case 2:
//     //       router.push("/payment");
//     //       break;
//     //     case 3:
//     //       router.push("/orders");
//     //       break;
//     //     default:
//     //       break;
//     //   }
//     // }
//     switch (ind) {
//       case 0:
//         if (stepperList === defaultStepperList) {
//           router.push("/cart");
//         } else {
//           router.push("/checkout");
//         }
//         break;
//       case 1:
//         if (stepperList === defaultStepperList) {
//           router.push("/checkout");
//         } else {
//           router.push("/orders");
//         }
//         break;
//       case 2:
//         router.push("/payment");
//         break;
//       case 3:
//         router.push("/orders");
//         break;
//       default:
//         break;
//     }

//   };

//   useEffect(() => {
//     switch (pathname) {
//       case "/cart":
//         setSelectedStep(1);
//         break;
//       case "/checkout":
//         setSelectedStep(2);
//         break;
//       case "/payment":
//         setSelectedStep(3);
//         break;
//       default:
//         break;
//     }
//   }, [pathname]);

//   return (
//     <Fragment>
//       <Box mb="14px">
//         <Grid container spacing={6}>
//           <Grid item lg={8} md={8} xs={12}>
//             <Stepper
//               stepperList={stepperList}
//               selectedStep={selectedStep}
//               onChange={handleStepChange}
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       {children}
//     </Fragment>
//   );
// }

// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { Fragment, PropsWithChildren, useEffect, useState } from "react";

// import Box from "@component/Box";
// import Grid from "@component/grid/Grid";
// import Stepper from "@component/Stepper";
// import authService from "services/authService";

// export default function Layout({ children }: PropsWithChildren) {
//   const [selectedStep, setSelectedStep] = useState(0);
//   const [hasVisitedPayment, setHasVisitedPayment] = useState(false); // 🔹 new state
//   const [stepperList, setStepperList] = useState([
//     { title: "Cart", disabled: false },
//     { title: "Details", disabled: false },
//     { title: "Payment", disabled: true }, // 🔹 start disabled
//     { title: "Submit", disabled: true },
//   ]);

//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const isRfq = searchParams.get("rfq") === "true";
//   const responseId = searchParams.get("response_id");

//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     setIsLoggedIn(authService.isAuthenticated());
//   }, []);

//   // 🔹 Update hasVisitedPayment if pathname is '/payment'
//   useEffect(() => {
//     if (pathname === "/payment") {
//       setHasVisitedPayment(true);
//     }
//   }, [pathname]);

//   // 🔹 Set stepper list when isRfq or hasVisitedPayment changes
//   useEffect(() => {
//     if (isRfq) {
//       setStepperList([
//         { title: "Details", disabled: false },
//         { title: "Submit", disabled: true },
//       ]);
//     } else {
//       setStepperList([
//         { title: "Cart", disabled: false },
//         { title: "Details", disabled: false },
//         { title: "Payment", disabled: !hasVisitedPayment },
//         { title: "Submit", disabled: true },
//       ]);
//     }
//   }, [isRfq, hasVisitedPayment]);

//   const handleStepChange = (_step: any, ind: number) => {
//     if (isRfq) {
//       switch (ind) {
//         case 0:
//           router.push(`/checkout?rfq=true${responseId ? `&response_id=${responseId}` : ""}`);
//           break;
//         case 1:
//           router.push("/submit");
//           break;
//         default:
//           break;
//       }
//     } else {
//       switch (ind) {
//         case 0:
//           router.push("/cart");
//           break;
//         case 1:
//           if (isLoggedIn) {
//             router.push("/checkout");
//           } else {
//             router.push("/login");
//           }
//           break;
//         case 2:
//           if (isLoggedIn) {
//             router.push("/payment");
//           } else {
//             router.push("/login");
//           }
//           break;
//         case 3:
//           if (isLoggedIn) {
//             router.push("/orders");
//           } else {
//             router.push("/login");
//           }
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   useEffect(() => {
//     if (isRfq) {
//       if (pathname === "/checkout?rfq=true" && responseId) setSelectedStep(0);
//     } else {
//       switch (pathname) {
//         case "/cart":
//           setSelectedStep(1);
//           break;
//         case "/checkout":
//           setSelectedStep(2);
//           break;
//         case "/payment":
//           setSelectedStep(3);
//           break;
//         default:
//           break;
//       }
//     }
//   }, [pathname, isRfq]);

//   return (
//     <Fragment>
//       <Box mb="14px">
//         <Grid container spacing={6}>
//           <Grid item lg={8} md={8} xs={12}>
//             <Stepper
//               stepperList={stepperList}
//               selectedStep={selectedStep}
//               onChange={handleStepChange}
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       {children}
//     </Fragment>
//   );
// }

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Stepper from "@component/Stepper";
import authService from "services/authService";

// Mobile stepper components
const MobileStepperContainer = styled("div")({
 width: "100%",
 overflowX: "auto",
 padding: "16px 0",
 scrollbarWidth: "none",
 "&::-webkit-scrollbar": { display: "none" },
});

const MobileStepperTrack = styled("div")({
 display: "flex",
 position: "relative",
 height: "72px",
 alignItems: "center",
 padding: "0 16px",
 "@media (max-width: 600px)": {
  height: "64px",
  padding: "0 8px",
 },
});

const MobileStep = styled("div")<{
 active: boolean;
 completed: boolean;
 disabled: boolean;
}>(({ active, completed, disabled }) => ({
 display: "flex",
 flexDirection: "column",
 alignItems: "center",
 position: "relative",
 zIndex: 1,
 cursor: disabled ? "not-allowed" : "pointer",
 minWidth: "90px",
 padding: "0 8px",
 "@media (max-width: 600px)": {
  minWidth: "80px",
  padding: "0 4px",
 },
}));

const MobileStepNumber = styled("div")<{ active: boolean; completed: boolean }>(
 ({ active, completed }) => ({
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: active ? "#E94560" : completed ? "#4CAF50" : "#e0e0e0",
  color: active || completed ? "#fff" : "#7D879C",
  fontWeight: 600,
  fontSize: "16px",
  marginBottom: "8px",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  "@media (max-width: 600px)": {
   width: "32px",
   height: "32px",
   fontSize: "14px",
  },
 })
);

const MobileStepTitle = styled("div")<{ active: boolean }>(({ active }) => ({
 fontSize: "14px",
 fontWeight: active ? 600 : 400,
 color: active ? "#2B3445" : "#7D879C",
 whiteSpace: "nowrap",
 textAlign: "center",
 transition: "all 0.3s ease",
 "@media (max-width: 600px)": {
  fontSize: "12px",
  maxWidth: "80px",
  overflow: "hidden",
  textOverflow: "ellipsis",
 },
}));

const MobileProgressLine = styled("div")<{ progress: number }>(
 ({ progress }) => ({
  position: "absolute",
  top: "50%",
  left: "0",
  height: "4px",
  backgroundColor: "#E94560",
  width: `${progress}%`,
  transition: "width 0.4s ease",
  zIndex: 0,
  transform: "translateY(-50%)",
  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  borderRadius: "2px",
 })
);

const MobileBackgroundLine = styled("div")({
 position: "absolute",
 top: "50%",
 left: "0",
 height: "4px",
 backgroundColor: "#e0e0e0",
 width: "100%",
 zIndex: 0,
 transform: "translateY(-50%)",
 borderRadius: "2px",
 boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
});

export default function Layout({ children }: PropsWithChildren) {
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("md"));

 const [selectedStep, setSelectedStep] = useState(0);
 const [hasVisitedPayment, setHasVisitedPayment] = useState(false);
 const [stepperList, setStepperList] = useState([
  { title: "Cart", disabled: false },
  { title: "Details", disabled: false },
  { title: "Payment", disabled: true },
  { title: "Submit", disabled: true },
 ]);

 const router = useRouter();
 const pathname = usePathname();
 const searchParams = useSearchParams();

 const isRfq = searchParams.get("rfq") === "true";
 const responseId = searchParams.get("response_id");
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
  setIsLoggedIn(authService.isAuthenticated());
 }, []);

 useEffect(() => {
  if (pathname === "/payment") setHasVisitedPayment(true);
 }, [pathname]);

 useEffect(() => {
  setStepperList(
   isRfq
    ? [
       { title: "Details", disabled: false },
       { title: "Submit", disabled: true },
      ]
    : [
       { title: "Cart", disabled: false },
       { title: "Details", disabled: false },
       { title: "Payment", disabled: !hasVisitedPayment },
       { title: "Submit", disabled: true },
      ]
  );
 }, [isRfq, hasVisitedPayment]);

 const handleStepChange = (_step: any, ind: number) => {
  if (isRfq) {
   const routes = [
    `/checkout?rfq=true${responseId ? `&response_id=${responseId}` : ""}`,
    "/submit",
   ];
   router.push(routes[ind]);
  } else {
   const routes = isLoggedIn
    ? ["/cart", "/checkout", "/payment", "/orders"]
    : ["/cart", "/login", "/login", "/login"];
   router.push(routes[ind]);
  }
 };

 const handleMobileStepClick = (index: number, disabled: boolean) => {
  if (!disabled) handleStepChange(null, index);
 };

 useEffect(() => {
  if (isRfq) {
   setSelectedStep(pathname.includes("/checkout") ? 0 : 1);
  } else {
   const stepMap: Record<string, number> = {
    "/cart": 0,
    "/checkout": 1,
    "/payment": 2,
    "/orders": 3,
   };
   setSelectedStep(stepMap[pathname] || 0);
  }
 }, [pathname, isRfq]);

 const progressPercentage = (selectedStep / (stepperList.length - 1)) * 100;

 return (
  <Fragment>
   <Box mb={isMobile ? "24px" : "14px"} px={{ xs: 2, sm: 0 }}>
    <Grid container spacing={6}>
     <Grid item lg={8} md={8} xs={12}>
      {isMobile ? (
       <MobileStepperContainer>
        <MobileStepperTrack>
         <MobileBackgroundLine />
         <MobileProgressLine progress={progressPercentage} />
         {stepperList.map((step, index) => (
          <MobileStep
           key={step.title}
           active={selectedStep === index}
           completed={selectedStep > index}
           disabled={step.disabled}
           onClick={() => handleMobileStepClick(index, step.disabled)}
          >
           <MobileStepNumber
            active={selectedStep === index}
            completed={selectedStep > index}
           >
            {index + 1}
           </MobileStepNumber>
           <MobileStepTitle active={selectedStep === index}>
            {step.title}
           </MobileStepTitle>
          </MobileStep>
         ))}
        </MobileStepperTrack>
       </MobileStepperContainer>
      ) : (
       <Stepper
        stepperList={stepperList}
        selectedStep={selectedStep}
        onChange={handleStepChange}
       />
      )}
     </Grid>
    </Grid>
   </Box>
   {children}
  </Fragment>
 );
}
