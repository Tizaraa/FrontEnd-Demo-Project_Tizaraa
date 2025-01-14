import { Fragment } from "react";
// API FUNCTIONS
import api from "@utils/__api__/users";
// GLOBAL CUSTOM COMPONENTS
import { Card1 } from "@component/Card1";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// PAGE SECTION COMPONENTS
import { ProfileEditForm, BackToProfileButton } from "@sections/customer-dashboard/profile";
import SetPasswordForm from "@sections/customer-dashboard/profile/SetPasswordForm";
import SetPassword from "@sections/customer-dashboard/profile/SetPassword";

// Fetching user data
export default async function ProfileEditor() {

  return (
    <Fragment>
      <DashboardPageHeader
        iconName="user_filled"
        title="Edit Profile"
        button={<BackToProfileButton />}
      />

      <Card1 borderRadius={8}>
        {/* <SetPasswordForm /> */}
        <SetPassword></SetPassword>
      </Card1>
    </Fragment>
  );
}
