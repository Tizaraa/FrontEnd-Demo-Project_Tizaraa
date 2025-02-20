// "use client";

// import { Fragment, useEffect } from "react";
// import Box from "@component/Box";
// import Card from "@component/Card";
// import Avatar from "@component/avatar";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import Typography from "@component/Typography";
// import useWindowSize from "@hook/useWindowSize";

// interface OrderStatusProps {
//   return_status: number; // Numeric status: 0, 1, 2, ...
//   deliveredAt: string;   // Delivery date
// }

// export default function ReturnedOrderStatus({
//   return_status,
//   deliveredAt,
// }: OrderStatusProps) {
//   const width = useWindowSize();
//   const stepIconList = ["package-box", "truck-1", "delivery"]; // Icons for steps

//   const breakpoint = 350; // Screen width breakpoint

//   // Log the current numeric status for debugging
//   useEffect(() => {
//     console.log("Current Return Status (number):", return_status);
//   }, [return_status]);

//   return (
//     <Card p="2rem 1.5rem" mb="30px" borderRadius={8}>
//       <FlexBox
//         my="2rem"
//         flexWrap="wrap"
//         alignItems="center"
//         justifyContent="space-between"
//         flexDirection={width < breakpoint ? "column" : "row"}
//       >
//         {stepIconList.map((item, ind) => (
//           <Fragment key={item}>
//             <Box position="relative">
//               <Avatar
//                 size={64}
//                 bg={ind <= return_status ? "primary.main" : "gray.300"}
//                 color={ind <= return_status ? "gray.white" : "primary.main"}
//               >
//                 <Icon size="32px" defaultcolor="currentColor">
//                   {item}
//                 </Icon>
//               </Avatar>

//               {ind < return_status && (
//                 <Box position="absolute" right="0" top="0">
//                   <Avatar size={22} bg="gray.200" color="success.main">
//                     <Icon size="12px" defaultcolor="currentColor">
//                       done
//                     </Icon>
//                   </Avatar>
//                 </Box>
//               )}
//             </Box>

//             {ind < stepIconList.length - 1 && (
//               <Box
//                 height={width < breakpoint ? 50 : 4}
//                 minWidth={width < breakpoint ? 4 : 50}
//                 flex={width < breakpoint ? "unset" : "1 1 0"}
//                 bg={ind < return_status ? "primary.main" : "gray.300"}
//               />
//             )}
//           </Fragment>
//         ))}
//       </FlexBox>

//       <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
//         <Typography
//           p="0.5rem 1rem"
//           bg="primary.light"
//           textAlign="center"
//           borderRadius="300px"
//           color="primary.main"
//         >
//           Estimated Delivery Date: <b>{deliveredAt}</b>
//         </Typography>
//       </FlexBox>
//     </Card>
//   );
// }



"use client";

import { Fragment, useEffect } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";

interface OrderStatusProps {
  return_status: number; // Numeric status: 0, 1, 2, ...
  deliveredAt: string;   // Delivery date
}

export default function ReturnedOrderStatus({
  return_status,
  deliveredAt,
}: OrderStatusProps) {
  const width = useWindowSize();

  // Define the icons and their corresponding conditions
  const stepIconList = [
    { icon: "package-box", condition: return_status >= 2 }, // package-box active if return_status >= 2
    { icon: "truck-1", condition: return_status >= 3 },    // truck-1 active if return_status >= 3
    { icon: "delivery", condition: return_status >= 4 },   // delivery active if return_status >= 4
  ];

  const breakpoint = 350; // Screen width breakpoint

  // Log the current numeric status for debugging
  useEffect(() => {
    console.log("Current Return Status (number):", return_status);
  }, [return_status]);

  return (
    <Card p="2rem 1.5rem" mb="30px" borderRadius={8}>
      <FlexBox
        my="2rem"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={width < breakpoint ? "column" : "row"}
      >
        {stepIconList.map(({ icon, condition }, ind) => (
          <Fragment key={icon}>
            <Box position="relative">
              <Avatar
                size={64}
                bg={condition ? "primary.main" : "gray.300"}  // Active if condition is true
                color={condition ? "gray.white" : "primary.main"}  // Change icon color if active
              >
                <Icon size="32px" defaultcolor="currentColor">
                  {icon}
                </Icon>
              </Avatar>

              {return_status >= ind && (
                <Box position="absolute" right="0" top="0">
                  <Avatar size={22} bg="gray.200" color="success.main">
                    <Icon size="12px" defaultcolor="currentColor">
                      done
                    </Icon>
                  </Avatar>
                </Box>
              )}
            </Box>

            {ind < stepIconList.length - 1 && (
              <Box
                height={width < breakpoint ? 50 : 4}
                minWidth={width < breakpoint ? 4 : 50}
                flex={width < breakpoint ? "unset" : "1 1 0"}
                bg={return_status >= ind ? "primary.main" : "gray.300"}
              />
            )}
          </Fragment>
        ))}
      </FlexBox>

      <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
        <Typography
          p="0.5rem 1rem"
          bg="primary.light"
          textAlign="center"
          borderRadius="300px"
          color="primary.main"
        >
          Estimated Delivery Date: <b>{deliveredAt}</b>
        </Typography>
      </FlexBox>
    </Card>
  );
}
