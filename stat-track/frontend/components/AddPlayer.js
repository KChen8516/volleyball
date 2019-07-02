import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Error from "./ErrorMessage";

const CREATE_PLAYER_MUTATION = gql`
  mutation CREATE_PLAYER_MUTATION(
    $number: String!
    $position: String!
    $firstName: String!
    $lastName: String!
  ) {
    createPlayer(
      number: $number
      lastName: $lastName
      firstName: $firstName
      position: $position
    ) {
      id
    }
  }
`;

const TopPadding = styled.div`padding-top: 10px;`;

export const PlayerForm = () => {
  const [ firstName, setFirstName ] = useState();
  const [ lastName, setLastName ] = useState();
  const [ position, setPosition ] = useState();
  const [ number, setNumber ] = useState();

  const handleFormUpdate = (e) => {
    const { name, type, value } = e.target;
    console.log({ name, type, value });
    const val = type === "number" ? parseFloat(value) : value;
    switch (name) {
      case "firstName":
        setFirstName(val);
        break;
      case "lastName":
        setLastName(val);
        break;
      // select returns an empty string for name?
      case "":
        setPosition(val);
        break;
      case "number":
        setNumber(val);
        break;
      default:
        return;
    }
  };

  const onSubmitPlayer = async (mutation) => {
    const res = await mutation();
    console.log(res);
    Router.push({
      pathname: "/player",
      query: { id: res.data.createPlayer.id },
    });
  };

  return (
    <Mutation
      mutation={CREATE_PLAYER_MUTATION}
      variables={{ firstName, lastName, number, position }}
    >
      {(createPlayer, { error, loading }) => (
        <TopPadding className="container is-fluid">
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <h2 className="title is-2">Create a Player</h2>
            <div className="field">
              <label className="label">First Name</label>
              <div className="control">
                <input
                  className="input"
                  name="firstName"
                  type="text"
                  placeholder="e.g Alex Smith"
                  value={firstName}
                  onChange={handleFormUpdate}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input
                  className="input"
                  name="lastName"
                  type="text"
                  placeholder="e.g. alexsmith@gmail.com"
                  value={lastName}
                  onChange={handleFormUpdate}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Position</label>
              <div className="control">
                <div
                  className="select"
                  name="position"
                  value={position}
                  onChange={handleFormUpdate}
                >
                  <select>
                    <option disabled selected>
                      Please Select a Position
                    </option>
                    <option>Outside</option>
                    <option>Opposite</option>
                    <option>Libero</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field column is-1" style={{ padding: "10px 0 0 0" }}>
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Number"
                  value={number}
                  onChange={handleFormUpdate}
                  name="number"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-volleyball-ball" />
                </span>
              </p>
            </div>
            <TopPadding>
              <div className="field is-grouped">
                <p className="control">
                  <a
                    className="button is-primary"
                    onClick={() => {
                      onSubmitPlayer(createPlayer);
                    }}
                  >
                    Submit
                  </a>
                </p>
                <p className="control">
                  <a className="button is-light">Clear</a>
                </p>
              </div>
            </TopPadding>
          </fieldset>
        </TopPadding>
      )}
    </Mutation>
  );
};
