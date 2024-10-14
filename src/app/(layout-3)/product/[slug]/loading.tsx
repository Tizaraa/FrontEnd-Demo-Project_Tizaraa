"use client"
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function Loading() {
  return (
    <LoaderWrapper>
      <Vortex />
    </LoaderWrapper>
  );
}
