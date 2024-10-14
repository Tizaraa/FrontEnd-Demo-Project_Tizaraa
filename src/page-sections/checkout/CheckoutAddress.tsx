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
import ApiBaseUrl from "api/ApiBaseUrl";

export default function CheckoutAddress() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [province, setProvince] = useState([]); // State for storing provinces
  const authtoken = authService.getToken();

  // Fetch provinces data
  const fetchProvince = async () => {
    const authtoken = localStorage.getItem("token");
    try {
      const response = await axios.get(`${ApiBaseUrl.baseUrl}checkout/address`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      });
      console.log("Provinces data:", response.data);

      if (Array.isArray(response.data)) {
        setProvince(response.data); // Set province data
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  // Fetch addresses data
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${ApiBaseUrl.baseUrl}user/address`, {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        });
        console.log("Address data:", response.data);
        const fetchedAddresses = response.data.user;
        setAddresses(fetchedAddresses);

        // Load the selected address from sessionStorage
        const storedAddress = sessionStorage.getItem("address");
        if (storedAddress) {
          const parsedAddress = JSON.parse(storedAddress);
          // Check if the parsed address is in the fetched addresses
          const matchingAddress = fetchedAddresses.find((addr) => addr.id === parsedAddress.id);
          if (matchingAddress) {
            handleAutoSelect(matchingAddress); // Automatically select the address from sessionStorage
          }
        } else if (fetchedAddresses.length > 0) {
          const firstAddress = fetchedAddresses[0];
          handleAutoSelect(firstAddress); // Automatically select the first address if no stored address
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
    fetchProvince(); // Fetch provinces when the component mounts
  }, [authtoken]);

  // Handle automatic selection of the first address and set delivery charge in sessionStorage
  const handleAutoSelect = (item: Address) => {
    // Find the corresponding province to get the delivery charge
    const selectedProvince = province.find((prov: any) => prov.id === item.province_id);

    if (selectedProvince && selectedProvince.delivery_charge) {
      item.deliveryCharge = selectedProvince.delivery_charge; // Add deliveryCharge to the selected item
      sessionStorage.setItem("deliveryCharge", JSON.stringify(item.deliveryCharge)); // Store in sessionStorage
    }

    setSelectedAddress(item);

    // console.log("Auto-selected Address:", item);
    // console.log("Delivery Charge stored in sessionStorage:", item.deliveryCharge || "Delivery charge not available");
  };

  // Handle manual selection of an address
  const handleSelect = (item: Address) => {
    // Find the corresponding province to get the delivery charge
    const selectedProvince = province.find((prov: any) => prov.id === item.province_id);

    if (selectedProvince && selectedProvince.delivery_charge) {
      item.deliveryCharge = selectedProvince.delivery_charge; // Add deliveryCharge to the selected item
    }

    setSelectedAddress(item);
    sessionStorage.setItem("address", JSON.stringify(item)); // Only store in sessionStorage when manually selected

    // Log the selected address and delivery charge
    console.log("Manually Selected Address:", item);
    console.log("Delivery Charge:", item.deliveryCharge || "Delivery charge not available");
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
        border: "0.5px solid #E94560",
        marginBottom: "1rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
    
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
        padding="1px 5px"
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
          {item.address}, {item.province_id}, {item.city_id}, {item.area_id}
        </Typography>
      </FlexBox>
    </Grid>
  );
}


