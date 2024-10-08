import { Fragment } from "react";
// GLOBAL CUSTOM COMPONENTS
import { Card1 } from "@component/Card1";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// PAGE SECTION COMPONENTS
import { BackToAddress } from '@sections/customer-dashboard/address';
import EditAddressForm from '../../../../../../page-sections/customer-dashboard/address/EditAddressForm';

export default function EditAddress({ params }: { params: { id: string } }) {
  return (
    <Fragment>
      <DashboardPageHeader
        iconName="pin_filled"
        title="Edit Address"
        button={<BackToAddress />}
      />

      <Card1 borderRadius={8}>
        <EditAddressForm addressId={params.id} />
      </Card1>
    </Fragment>
  );
}
