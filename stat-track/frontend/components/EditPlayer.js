import React, { useState } from "react";
import styled from "styled-components";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Error from "./ErrorMessage";

const SINGLE_PLAYER_QUERY = gql`
  query SINGLE_PLAYER_QUERY($id: ID!) {
    player(where: { id: $id }) {
      id
      number
      position
      firstName
      lastName
    }
  }
`;

const UPDATE_PLAYER_MUTATION = gql`
  mutation UPDATE_PLAYER_MUTATION(
    $id: ID!
    $number: String
    $position: String
    $firstName: String
    $lastName: String
  ) {
    updatePlayer(
      id: $id
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

export const EditPlayerForm = ({ id }) => {
  const [ playerUpdates, setPlayerUpdates ] = useState({});

  const handleFormUpdate = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    switch (name) {
      case "firstName":
        setPlayerUpdates((prevState) => {
          return { ...prevState, ...{ firstName: val } };
        });
        break;
      case "lastName":
        setPlayerUpdates((prevState) => ({ ...prevState, ...{ lastName: val } }));
        break;
      case "position":
        setPlayerUpdates((prevState) => ({ ...prevState, ...{ position: val } }));
        break;
      case "number":
        setPlayerUpdates((prevState) => ({ ...prevState, ...{ number: val } }));
        break;
      default:
        return;
    }
  };

  const onUpdatePlayer = async (mutation) => {
    const res = await mutation({
      variables: {
        id,
        ...playerUpdates,
      },
    });

    Router.push({
      pathname: "/player",
      query: { id: res.data.updatePlayer.id },
    });
  };

  return (
    <Query query={SINGLE_PLAYER_QUERY} variables={{ id }} fetchPolicy="network-only">
      {({ data, loading }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        const { player: { firstName, lastName, position, number } } = data;

        return (
          <Mutation mutation={UPDATE_PLAYER_MUTATION}>
            {(updatePlayer, { error, loading }) => (
              <TopPadding className="container is-fluid">
                <Error error={error} />
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2 className="title is-2">
                    Edit Player: {firstName} {lastName}
                  </h2>
                  <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                      <input
                        className="input"
                        name="firstName"
                        type="text"
                        placeholder="e.g Alex Smith"
                        defaultValue={firstName}
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
                        defaultValue={lastName}
                        onChange={handleFormUpdate}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Position</label>
                    <div className="control">
                      <div className="select" onChange={handleFormUpdate}>
                        <select defaultValue={position} name="position">
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
                        defaultValue={number}
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
                            onUpdatePlayer(updatePlayer);
                          }}
                        >
                          Save Changes
                        </a>
                      </p>
                      <p className="control">
                        <a
                          className="button is-danger"
                          onClick={() => {
                            Router.push({
                              pathname: "/players",
                            });
                          }}
                        >
                          Cancel
                        </a>
                      </p>
                    </div>
                  </TopPadding>
                </fieldset>
              </TopPadding>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};
