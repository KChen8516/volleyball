import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Error from "./ErrorMessage";
import { ALL_TEAMS_QUERY } from "./AddPlayer";

const CREATE_GAME_MUTATION = gql`
  mutation CREATE_GAME_MUTATION($homeTeamId: ID!, $opponent: String) {
    createGame(homeTeamId: $homeTeamId, opposingTeam: $opponent) {
      id
      homeTeamId
      homeTeam
    }
  }
`;

const TopPadding = styled.div`padding-top: 10px;`;

const QuarterField = styled.div`width: 25%;`;

export const GameForm = () => {
  const [ homeTeamId, setHomeTeamId ] = useState();
  const [ opponentName, setOpponentName ] = useState();

  const handleFormUpdate = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "homeTeam":
        setHomeTeamId(value);
        break;
      case "opponentTeam":
        setOpponentName(value);
        break;
      default:
        return;
    }
  };

  const onSubmitGame = async (mutation) => {
    const res = await mutation();
    console.log(res.data);
    Router.push({
      pathname: "/game",
      query: { id: res.data.createGame.id, homeTeamId: res.data.createGame.homeTeamId },
    });
  };

  return (
    <Query query={ALL_TEAMS_QUERY}>
      {({ data, loading, error }) => {
        const { teams } = data;

        if (loading) {
          return <h1>Loading...</h1>;
        }

        if (error) {
          return <Error error={error} />;
        }

        return (
          <Mutation
            mutation={CREATE_GAME_MUTATION}
            variables={{ homeTeamId, opponentName }}
          >
            {(createGame, { error, loading }) => (
              <Fragment>
                <Error error={error} />
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2 className="title is-2">Create a Game</h2>

                  <div className="field">
                    <label className="label">Home Team</label>
                    <div className="control">
                      <div className="select">
                        <select
                          defaultValue={`Please Select a Team`}
                          // value={homeTeamName}
                          name="homeTeam"
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

                  <QuarterField className="field">
                    <label className="label">Opposing Team</label>
                    <div className="control">
                      <input
                        className="input"
                        name="opponentTeam"
                        type="text"
                        placeholder="e.g. James Logan High School"
                        value={opponentName}
                        onChange={handleFormUpdate}
                      />
                    </div>
                  </QuarterField>

                  <TopPadding>
                    <div className="field is-grouped">
                      <p className="control">
                        <a
                          className="button is-primary"
                          onClick={() => {
                            onSubmitGame(createGame);
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
              </Fragment>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};
