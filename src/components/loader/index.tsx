import ApiBaseUrl from 'api/ApiBaseUrl';
import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff
`;

const PrimaryLoader = `${ApiBaseUrl.ImgUrl}frontend/loader/loader.gif`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <img
        src={PrimaryLoader}
        alt="Loading"
      />
    </LoaderWrapper>
  );
};

export default Loader;