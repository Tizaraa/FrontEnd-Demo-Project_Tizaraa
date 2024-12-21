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


"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";

import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Stepper from "@component/Stepper";
import authService from "services/authService";

export default function Layout({ children }: PropsWithChildren) {
  const [selectedStep, setSelectedStep] = useState(0);
  const [stepperList, setStepperList] = useState([
    { title: "Cart", disabled: false },
    { title: "Details", disabled: false },
    { title: "Payment", disabled: false },
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
    if (isRfq) {
      setStepperList([
        { title: "Details", disabled: false },
        { title: "Submit", disabled: true },
      ]);
    } else {
      setStepperList([
        { title: "Cart", disabled: false },
        { title: "Details", disabled: false },
        { title: "Payment", disabled: false },
        { title: "Submit", disabled: true },
      ]);
    }
  }, [isRfq]);

  const handleStepChange = (_step: any, ind: number) => {
    if (isRfq) {
      switch (ind) {
        case 0:
          router.push(`/checkout?rfq=true${responseId ? `&response_id=${responseId}` : ""}`);
          break;
        case 1:
          router.push("/submit");
          break;
        default:
          break;
      }
    } else {
      switch (ind) {
        case 0:
          router.push("/cart");
          break;
        case 1:
          if(isLoggedIn){
            router.push("/checkout");
          }else{
            router.push("/login");
          }
          //router.push("/checkout");
          break;
        case 2:
          if(isLoggedIn){
            router.push("/payment");
          }else{
            router.push("/login");
          }
          //router.push("/payment");
          break;
        case 3:
          if(isLoggedIn){
            router.push("/orders");
          }else{
            router.push("/login");
          }
          //router.push("/orders");
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (isRfq) {
      if (pathname === "/checkout?rfq=true" && responseId) setSelectedStep(0);
    } else {
      switch (pathname) {
        case "/cart":
          setSelectedStep(1);
          break;
        case "/checkout":
          setSelectedStep(2);
          break;
        case "/payment":
          setSelectedStep(3);
          break;
        // case "/submit":
        //   setSelectedStep(3);
        //   break;
        default:
          break;
      }
    }
  }, [pathname, isRfq]);

  return (
    <Fragment>
      <Box mb="14px">
        <Grid container spacing={6}>
          <Grid item lg={8} md={8} xs={12}>
            <Stepper
              stepperList={stepperList}
              selectedStep={selectedStep}
              onChange={handleStepChange}
            />
          </Grid>
        </Grid>
      </Box>

      {children}
    </Fragment>
  );
}
