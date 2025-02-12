"use client";

import { Fragment } from "react";

interface ExpressedDeliveryProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ExpressedDelivery({ onChange }: ExpressedDeliveryProps) {
  return (
    <Fragment>
      <input type="checkbox" onChange={onChange} />
      Expressed Delivery
    </Fragment>
  );
}
