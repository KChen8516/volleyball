import React from "react";
import styled from "styled-components";

const CenteredContainer = styled.div`
  padding-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignOut = () => {
  return (
    <CenteredContainer>
      <h2 className="title is-2">You have successfully signed out.</h2>
    </CenteredContainer>
  );
};

export default SignOut;
