import ApiBaseUrl from "api/ApiBaseUrl";
import React from "react";
import styled from "styled-components";

interface LoaderProps {
  inline?: boolean;
}

const LoaderWrapper = styled.div<{ $inline?: boolean }>`
  ${({ $inline }) =>
    $inline
      ? `
    position: relative;
    width: 100%;
    min-height: 420px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
  `
      : `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    z-index: 9999;
  `}
`;

const PrimaryLoader = `${ApiBaseUrl.ImgUrl}frontend/loader/loader.gif`;

const Loader = ({ inline = false }: LoaderProps) => {
  return (
    <LoaderWrapper $inline={inline}>
      <img src={PrimaryLoader} alt="Loading" />
    </LoaderWrapper>
  );
};

export default Loader;

