import { Fragment } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";

import { CURRENT_USER_QUERY } from "./User";
import { SignInForm } from "./SignIn";

const Container = styled.div`
  padding: 32px 32px 0 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RestrictSignIn = (props) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data) {
        return (
          <Fragment>
            <Container>
              <div className="notification is-danger">
                Please Sign In before continuing.
              </div>
            </Container>
            <SignInForm />
          </Fragment>
        );
      }
      return props.children;
    }}
  </Query>
);
