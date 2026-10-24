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
  <FlexBox flexWrap="wrap" style={{ gap: "8px" }}>
   <Button variant="contained" color="primary" onClick={() => push("/profile/edit")}>
    Edit profile
   </Button>

   {status !== 2 && (
    <Button variant="outlined" color="secondary" onClick={() => push("/profile/set-password")}>
     Change password
    </Button>
   )}
  </FlexBox>
 );
}
