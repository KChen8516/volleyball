import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";

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

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

export const SignUpForm = () => {
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  const handleUpdateForm = (e) => {
    const { name, value } = e.target;

    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const signUpUser = async (mutation) => {
    const response = await mutation();
    clearState();
    Router.push({
      pathname: "/",
    });
  };

  const clearState = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={{ name, email, password }} // refetch on successful mutation
      refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
    >
      {(signUp, { error, loading }) => {
        return (
          <CenteredContainer>
            <HalfContainer className="box">
              <fieldset disabled={loading} aria-busy={loading}>
                <Error error={error} />
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Name</label>
                  </div>
                  <div className="field-body">
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={handleUpdateForm}
                      />
                      <span className="icon is-left">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                  </div>
                </div>
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
                          signUpUser(signUp);
                        }}
                      >
                        Sign Up
                      </a>
                    </p>
                    <p className="control">
                      <a className="button is-light" onClick={clearState}>
                        Clear
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
