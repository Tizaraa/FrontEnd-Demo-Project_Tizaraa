import styled from "styled-components";
import { getTheme } from "@utils/utils";

export const Styledbutton = styled.div`

/* Hide spin buttons in WebKit browsers (Chrome, Safari, Edge) */
.no-spin-button::-webkit-outer-spin-button,
.no-spin-button::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide spin buttons in Firefox */
.no-spin-button[type="number"] {
  -moz-appearance: textfield;
}

/* Remove border color when input is focused */
.no-spin-button:focus {
  border-color: #ccc; /* Keep the border color the same when focused */
  outline: none; /* Remove the outline */
}

}

.no-spin-button:focus {
  border-color: transparent; /* Hides the selected border color */
  outline: none; /* Removes the outline when focused */
}
`;