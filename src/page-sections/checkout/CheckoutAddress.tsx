"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Fragment } from "react";
import CheckBox from "@component/CheckBox";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import { Chip } from "@component/Chip";
import { Small } from "@component/Typography";
import Typography from "@component/Typography";
import authService from "services/authService";
import Address from "@models/address.model"; 


export default function CheckoutAddress() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const authtoken = authService.getToken(); 
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          `https://tizaraa.com/api/user/address`,
          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            },
          }
        );
        console.log("data", response.data)
        setAddresses(response.data.user); 
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [authtoken]);

  // Handle address selection
  const handleSelect = (item: Address) => {
    setSelectedAddress(item);
    sessionStorage.setItem("address", JSON.stringify(item));

    // Log the selected address
    console.log("Selected Address:", item);
  };

  return (
    <Fragment>
      
      {addresses.length > 0 ? (
        addresses.map((item) => (
          <AddressItem
            key={item.id}
            item={item}
            isSelected={selectedAddress?.id === item.id}
            onSelect={handleSelect}
          />
        ))
      ) : (
        <div>No addresses found</div>
      )}
    </Fragment>
  );
}

interface AddressItemProps {
  item: Address;
  isSelected: boolean;
  onSelect: (item: Address) => void;
}

function AddressItem({ item, isSelected, onSelect }: AddressItemProps) {
  const handleCheckboxChange = () => {
    onSelect(item);
  };


  const landmarkMap: { [key: number]: string } = {
    1: "Home",
    2: "Office",
  };

  const landmarkLabel = landmarkMap[item.landmark] || "Other"; 

  return (
    <Grid
      style={{
        border: "1px solid #ccc",
        marginBottom: "1rem",
        borderRadius: "1rem",
      }}
    >
      <FlexBox
        my="1rem"
        padding="1px 5px"
        style={{
          display: "flex",
          alignItems: "center", 
          gap: "1rem", 
        }}
      >
        <CheckBox checked={isSelected} onChange={handleCheckboxChange} />

        <FlexBox>
          <Typography className="pre" m="6px" textAlign="left">
            {item.name || "No Name"}
          </Typography>
          <Typography className="pre" m="6px" textAlign="left">
            {item.phone}
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox
        flex="1 1 260px !important"
        m="6px"
        textAlign="left"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <Chip p="0.25rem 1rem" bg="#4CAF50">
          <Small color="white">{landmarkLabel}</Small>
        </Chip>

        <Typography className="pre" m="6px" textAlign="left">
          {item.address},
          {item.province_id},
          {item.city_id},
          {item.area_id}
        </Typography>
      </FlexBox>

      
    </Grid>



    
  );
}
