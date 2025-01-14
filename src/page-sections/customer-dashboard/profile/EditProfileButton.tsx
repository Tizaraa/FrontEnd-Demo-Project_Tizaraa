"use client";

import { useRouter } from "next/navigation";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";

export default function EditProfileButton() {
  const { push } = useRouter();

  return (
    <FlexBox style={{gap:"1rem"}}>
    <Button color="primary" bg="primary.light" px="2rem" onClick={() => push("/profile/edit")}>
      Edit Profile
    </Button>

    <Button color="primary" bg="primary.light" px="2rem" onClick={() => push("/profile/set-password")}>
      Set Password
    </Button>
    
    </FlexBox>
  );
}
