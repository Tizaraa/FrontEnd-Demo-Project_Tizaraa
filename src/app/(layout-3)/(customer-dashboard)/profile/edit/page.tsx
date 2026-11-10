import { Fragment } from "react";
// API FUNCTIONS
import api from "@utils/__api__/users";
// GLOBAL CUSTOM COMPONENTS
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// PAGE SECTION COMPONENTS
import {
 ProfileEditForm,
 BackToProfileButton,
} from "@sections/customer-dashboard/profile";

// Fetching user data
export default async function ProfileEditor() {
 return (
  <Fragment>
   <DashboardPageHeader
    iconName="user_filled"
    title="Edit profile"
    subtitle="Update your name, phone, birthday and photo"
    button={<BackToProfileButton />}
   />

   <ProfileEditForm />
  </Fragment>
 );
}
