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
  background: #fff // Optional: semi-transparent overlay
`;

const PrimaryLoader = `${ApiBaseUrl.ImgUrl}frontend/loader/loader.gif`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <img
        src={PrimaryLoader}
        alt="Loading"
        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
      />
    </LoaderWrapper>
  );
};

export default Loader;