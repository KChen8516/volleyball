import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Error from "./ErrorMessage";

const CREATE_TEAM_MUTATION = gql`
  mutation CREATE_TEAM_MUTATION($city: String, $name: String!, $players: [Player!]) {
    createTeam(city: $city, name: $name, players: $players) {
      id
    }
  }
`;

const TopPadding = styled.div`padding-top: 10px;`;

export const TeamForm = () => {
  const [ city, setCity ] = useState();
  const [ name, setName ] = useState();

  const handleFormUpdate = (e) => {
    const { name, type, value } = e.target;

    const val = type === "number" ? parseFloat(value) : value;
    switch (name) {
      case "city":
        setCity(val);
        break;
      case "name":
        setName(val);
        break;
      //   case "players":
      //     setPosition(val);
      //     break;
      default:
        return;
    }
  };

  const onSubmitPlayer = async (mutation) => {
    const res = await mutation();

    Router.push({
      pathname: "/team",
      query: { id: res.data.createPlayer.id },
    });
  };

  return (
    <Mutation mutation={CREATE_TEAM_MUTATION} variables={{ name, city, players: [] }}>
      {(createTeam, { error, loading }) => (
        <TopPadding className="container is-fluid">
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <h2 className="title is-2">Create a Team</h2>
            <div className="field">
              <label className="label">Team Name</label>
              <div className="control">
                <input
                  className="input"
                  name="name"
                  type="text"
                  placeholder="e.g Alex Smith"
                  value={name}
                  onChange={handleFormUpdate}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">City</label>
              <div className="control">
                <input
                  className="input"
                  name="city"
                  type="text"
                  placeholder="e.g. Santa Clara"
                  value={city}
                  onChange={handleFormUpdate}
                />
              </div>
            </div>
            {/* <div className="field">
              <label className="label">Position</label>
              <div className="control">
                <div className="select">
                  <select
                    defaultValue={`Please Select a Position`}
                    value={position}
                    name="position"
                    onChange={handleFormUpdate}
                  >
                    <option disabled>Please Select a Position</option>
                    <option>Outside</option>
                    <option>Opposite</option>
                    <option>Libero</option>
                  </select>
                </div>
              </div>
            </div> */}
            <TopPadding>
              <div className="field is-grouped">
                <p className="control">
                  <a
                    className="button is-primary"
                    onClick={() => {
                      onSubmitPlayer(createTeam);
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
