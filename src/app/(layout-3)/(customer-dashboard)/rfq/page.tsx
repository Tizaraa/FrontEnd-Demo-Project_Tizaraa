
import React, {Fragment} from 'react'
//import RfqProductForm from "./rfq-form/RfqProductForm"
import RfqProductList from './RfqProductList'
import DashboardPageHeader from "@component/layout/DashboardPageHeader";

const page = () => {
  return (
    <Fragment>
      <RfqProductList />
    </Fragment>
  )
}

export default page