"use client";

import styled from "styled-components";

// Keeps the order summary in view while the form scrolls on desktop.
// On tablets and phones the summary stacks with the form, so it stays static.
const StickySummary = styled.div`
 position: sticky;
 top: 96px;

 @media (max-width: 1024px) {
  position: static;
 }
`;

export default StickySummary;
