import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import { CURRENT_USER_QUERY } from "./User";
import Error from "./ErrorMessage";

const CenteredContainer = styled.div`
  padding-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HalfContainer = styled.div`width: 50%;`;

const TopPadding = styled.div`padding-top: 10px;`;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export const SignInForm = () => {
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  const handleUpdateForm = (e) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const signInUser = async (mutation) => {
    const rest = await mutation();
    // TODO: redirect the user somewhere
    clearState();
  };

  const clearState = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={{ email, password }}
      // refetch on successful mutation
      refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
    >
      {(signIn, { error, loading }) => {
        return (
          <CenteredContainer>
            <HalfContainer className="box">
              <fieldset disabled={loading} aria-busy={loading}>
                <Error error={error} />
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Email</label>
                  </div>
                  <div className="field-body">
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="email"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={handleUpdateForm}
                      />
                      <span className="icon is-left">
                        <i className="fas fa-envelope" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Password</label>
                  </div>
                  <div className="field-body">
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleUpdateForm}
                      />
                      <span className="icon is-left">
                        <i className="fas fa-lock" />
                      </span>
                    </div>
                  </div>
                </div>
                <TopPadding>
                  <div className="field is-grouped is-grouped-centered">
                    <p className="control">
                      <a
                        className="button is-primary"
                        onClick={() => {
                          signInUser(signIn);
                        }}
                      >
                        Sign In
                      </a>
                    </p>
                    <p className="control">
                      <a className="button is-light" onClick={clearState}>
                        Reset
                      </a>
                    </p>
                  </div>
                </TopPadding>
              </fieldset>
            </HalfContainer>
          </CenteredContainer>
        );
      }}
    </Mutation>
  );
};
