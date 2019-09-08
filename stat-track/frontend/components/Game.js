import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Router from "next/router";

import { PlayerCard } from "./PlayerCard";
import { PlayerStatsModal } from "./PlayerStatsModal";
import Error from "./ErrorMessage";

const Container = styled.div`padding: 32px 32px 0 32px;`;

/**
 * Game Obj:
 * {
 *  id: num,
 *  opposingTeam: string,
 *  stats: Array,
 *  homeScore: num,
 *  opponentScore: num,
 *  homeTeam: string,
 *  homeTeamId: num
 * }
 */

/**
  * State Obj:
  * {
  *     playerId: num,
  *     playerName: string,
  *     teamId: num,
  *     gameId: num,
  *     action: string,
  *     result: string,
  * }
  */

const SINGLE_TEAM_QUERY = gql`
  query SINGLE_TEAM_QUERY($id: ID!) {
    team(where: { id: $id }) {
      players {
        id
        number
        position
        firstName
        lastName
      }
      name
    }
  }
`;

const UPDATE_GAME_MUTATION = gql`
  mutation UPDATE_GAME_MUTATION(
    $id: ID!
    $homeScore: String
    $opponentScore: String
    $stats: [StatCreateWithoutGameInput]!
  ) {
    updateGame(
      id: $id
      stats: $stats
      homeScore: $homeScore
      opponentScore: $opponentScore
    ) {
      id
    }
  }
`;

export const GameScreen = ({ gameId, homeTeamId }) => {
  const [ stats, setStats ] = useState([]);
  const [ isActive, setIsActive ] = useState(false);
  const [ activePlayer, setActivePlayer ] = useState();

  const recordStat = ({ playerId, firstName, lastName, action, result }) => {
    setStats((stats) =>
      stats.concat({
        team: homeTeamId,
        player: playerId,
        playerName: `${firstName} ${lastName}`,
        action,
        result,
      }),
    );
  };

  const renderPlayerCards = (players) => {
    let cards = [];

    if (players.length < 6) {
      players.forEach((player, i) => {
        cards.push(
          <div className="column is-one-third-tablet is-half-mobile" key={i}>
            <PlayerCard
              player={players[i]}
              onStatChange={recordStat}
              toggleModal={setIsActive}
              setActivePlayer={setActivePlayer}
              team={players}
            />
          </div>,
        );
      });
    } else {
      // just display the first six as default
      for (let i = 0; i < 6; i++) {
        cards.push(
          <div className="column is-one-third-tablet is-half-mobile" key={i}>
            <PlayerCard
              player={players[i]}
              onStatChange={recordStat}
              toggleModal={setIsActive}
              setActivePlayer={setActivePlayer}
              team={players}
            />
          </div>,
        );
      }
    }

    return cards;
  };

  const submitGame = async (updateGameMutation) => {
    const res = await updateGameMutation();
    console.log(res.data);
    // go to the games collection screen for the team
    Router.push({
      pathname: "/games",
      query: { id: res.data.updateGame.id },
    });
  };

  return (
    <Query query={SINGLE_TEAM_QUERY} variables={{ id: homeTeamId }}>
      {({ data, loading, error }) => {
        const { team: { players, name } } = data;

        if (loading) {
          return <h1>Loading...</h1>;
        }

        if (error) {
          return <Error error={error} />;
        }

        return (
          <Mutation
            mutation={UPDATE_GAME_MUTATION}
            variables={{
              id: gameId,
              homeTeamId,
              stats,
              homeTeam: name,
            }}
          >
            {(updateGame, { error, loading }) => {
              if (error) {
                return <Error error={error} />;
              }

              return (
                <Container>
                  {/* <h2 className="title is-2">Current Roster</h2> */}
                  <div className="columns is-multiline is-mobile">
                    {renderPlayerCards(players)}
                  </div>
                  <div className="field is-grouped">
                    <p className="control" onClick={() => submitGame(updateGame)}>
                      <a className="button is-link">Save Game</a>
                    </p>
                    <p className="control">
                      <a className="button is-danger">New Game</a>
                    </p>
                  </div>
                  <PlayerStatsModal
                    isActive={isActive}
                    toggleModal={setIsActive}
                    stats={stats}
                    activePlayer={activePlayer}
                  />
                </Container>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  );
};
