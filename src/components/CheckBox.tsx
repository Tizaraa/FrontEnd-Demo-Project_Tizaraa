import { InputHTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";
import { color, compose, space, SpaceProps } from "styled-system";
import systemCss from "@styled-system/css";

import { colorOptions } from "../interfaces";
import { isValidProp } from "@utils/utils";

// ==============================================================

type CheckBoxProps = {
 color?: colorOptions;
 labelColor?: colorOptions;
 labelPlacement?: "start" | "end";
 label?: any;
 id?: string; // Changed to string for better consistency
 size?: number;
};

// ==============================================================

type WrapperProps = { labelPlacement?: "start" | "end" };
const StyledCheckBox = styled.input.withConfig({
 shouldForwardProp: (prop: string) => isValidProp(prop),
})<CheckBoxProps & InputHTMLAttributes<HTMLInputElement>>(
 ({ color, size }) =>
  systemCss({
   appearance: "none", // Remove default styling
   outline: "none",
   cursor: "pointer",
   margin: 0,
   width: size || "20px", // Set width and height for square shape
   height: size || "20px",
   border: "2px solid",
   borderColor: "text.hint",
   borderRadius: "2px", // Optional: you can change this for sharper corners
   position: "relative",
   transition: "border-color 150ms",

   "&:checked": { borderColor: `${color}.main` }, // Border color changes when checked

   "&:after": {
    content: '""', // Initially empty
    width: "100%", // Fill the entire square
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    background: "transparent", // Transparent when not checked
    borderRadius: "2px", // Match the border radius of the checkbox
    transition: "background-color 150ms",
   },

   "&:checked:after": {
    content: "'✔'", // Display the checkmark when checked
    fontSize: `${size ? size - 9 : 12}px`, // Adjust font size relative to the checkbox size
    color: `${color}.main`, // Use the specified color for the checkmark
    position: "absolute",
    top: "50%",
    left: "70%",
    transform: "translate(-50%, -50%)", // Center the checkmark inside the box
   },

   "&:disabled": {
    borderColor: `text.disabled`,
    cursor: "not-allowed",
   },

   "&:checked:disabled:after": {
    color: `text.disabled`, // Grey out the checkmark if disabled
   },
  }),
 compose(color)
);

const Wrapper = styled.div.withConfig({
 shouldForwardProp: (prop: string) => isValidProp(prop),
})<WrapperProps & SpaceProps>`
 display: flex;
 align-items: center;
 flex-direction: ${(props) =>
  props.labelPlacement !== "end" ? "row" : "row-reverse"};
 input {
  ${(props) =>
   props.labelPlacement !== "end"
    ? "margin-right: 0.5rem"
    : "margin-left: 0.5rem"};
 }
 label {
  cursor: pointer;
 }
 input[disabled] + label {
  color: disabled;
  cursor: unset;
 }
 ${color}
 ${space}
`;

const CheckBox = ({
 id,
 label,
 labelPlacement,
 labelColor = "secondary",
 ...props
}: InputHTMLAttributes<HTMLInputElement> & CheckBoxProps & SpaceProps) => {
 const checkboxId = id || `checkbox-${Math.random()}`; // Use provided id or generate a unique one

 return (
  <Wrapper
   // size={18}
   color={`${labelColor}.main`}
   labelPlacement={labelPlacement}
  >
   <StyledCheckBox id={checkboxId} type="checkbox" {...props} />
   <label htmlFor={checkboxId}>{label}</label>
  </Wrapper>
 );
};

export default CheckBox;
