// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "@component/buttons";
// import FlexBox from "@component/FlexBox";

// export default function EditProfileButton() {
//   const { push } = useRouter();

//   return (
//     <FlexBox style={{gap:"1rem"}}>
//     <Button color="primary" bg="primary.light" px="2rem" onClick={() => push("/profile/edit")}>
//       Edit Profile
//     </Button>

//     <Button color="primary" bg="primary.light" px="2rem" onClick={() => push("/profile/set-password")}>
//       Change Password
//     </Button>

//     </FlexBox>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";

export default function EditProfileButton() {
 const { push } = useRouter();

 // Retrieve userInfo from localStorage
 const userInfo =
  typeof window !== "undefined"
   ? JSON.parse(localStorage.getItem("userInfo"))
   : null;
 const status = userInfo?.status;

 return (
  <FlexBox style={{ gap: "1rem" }}>
   {/* Blue Edit Profile Button */}
   <Button
    style={{
     backgroundColor: "#357EE2",
     color: "#ffffff",
    }}
    onClick={() => push("/profile/edit")}
   >
    Edit Profile
   </Button>

   {/* Orange Change Password Button */}
   {status !== 2 && (
    <Button
     style={{
      backgroundColor: "#FF7870",
      color: "#ffffff",
     }}
     onClick={() => push("/profile/set-password")}
    >
     Change Password
    </Button>
   )}
  </FlexBox>
 );
}
