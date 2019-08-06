import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Error from "./ErrorMessage";

export const ALL_TEAMS_QUERY = gql`
  query ALL_TEAMS_QUERY {
    teams {
      id
      name
    }
  }
`;

const CREATE_PLAYER_MUTATION = gql`
  mutation CREATE_PLAYER_MUTATION(
    $number: String!
    $position: String!
    $firstName: String!
    $lastName: String!
    $team: String!
  ) {
    createPlayer(
      number: $number
      lastName: $lastName
      firstName: $firstName
      position: $position
      team: $team
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
  const [ teamId, setTeamId ] = useState();

  const handleFormUpdate = (e) => {
    const { name, type, value } = e.target;

    const val = type === "number" ? parseFloat(value) : value;
    switch (name) {
      case "firstName":
        setFirstName(val);
        break;
      case "lastName":
        setLastName(val);
        break;
      case "position":
        setPosition(val);
        break;
      case "number":
        setNumber(val);
        break;
      case "team":
        setTeamId(val);
        break;
      default:
        return;
    }
  };

  const onSubmitPlayer = async (mutation) => {
    const res = await mutation();

    Router.push({
      pathname: "/player",
      query: { id: res.data.createPlayer.id },
    });
  };

  return (
    <Query query={ALL_TEAMS_QUERY}>
      {({ data, loading, error }) => {
        const { teams } = data;

        return (
          <Mutation
            mutation={CREATE_PLAYER_MUTATION}
            variables={{ firstName, lastName, number, position, team: teamId }}
          >
            {(createPlayer, { error, loading }) => (
              <Fragment>
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
                      <div className="select">
                        <select
                          defaultValue={`Please Select a Position`}
                          value={position}
                          name="position"
                          onChange={handleFormUpdate}
                        >
                          <option disabled>Please Select a Position</option>
                          <option>Libero</option>
                          <option>Middle</option>
                          <option>Opposite</option>
                          <option>Outside</option>
                          <option>Setter</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Team</label>
                    <div className="control">
                      <div className="select">
                        <select
                          defaultValue={`Please Select a Team`}
                          value={teamId}
                          name="team"
                          onChange={handleFormUpdate}
                        >
                          <option disabled key="key">
                            Please Select a Team
                          </option>
                          {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                              {team.name}
                            </option>
                          ))}
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
                  <TopPadding className="field is-grouped">
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
                  </TopPadding>
                </fieldset>
              </Fragment>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};
