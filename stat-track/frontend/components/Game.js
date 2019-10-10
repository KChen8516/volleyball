import React, { useState, useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Router from "next/router";
import uuid from "uuid";

import { PlayerCard } from "./PlayerCard";
import { PlayerStatsModal } from "./PlayerStatsModal";
import Error from "./ErrorMessage";
import { useLocalStorage } from "../lib/useLocalStorage";

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
  const [ activeGame, setActiveGame ] = useLocalStorage(gameId);

  useEffect(
    () => {
      // check if there's a game in localStorage for the gameId
      const unsavedGame = window.localStorage.getItem(gameId);
      if (unsavedGame) {
        // make sure it's the same gameId
        const storedStats = JSON.parse(unsavedGame);
        setStats(storedStats);
      } else {
        // initialize the stored state in localStorage
        setActiveGame([]);
      }
    },
    [ gameId ],
  );

  useEffect(
    () => {
      setActiveGame(stats);
    },
    [ stats ],
  );

  const recordStat = ({ playerId, firstName, lastName, action, result }) => {
    setStats((stats) =>
      stats.concat({
        id: uuid.v4(),
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
              player={player}
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
    // go to the games collection screen for the team
    Router.push({
      pathname: "/games",
      query: { id: res.data.updateGame.id },
    });
  };

  const clearLocalStorage = () => {
    // make sure to clear the localStorage of existing games
    if (window) {
      window.localStorage.removeItem(gameId);
    }
  };

  const getAggregateStat = (action, result) =>
    stats.filter((stat) => stat.action === action && stat.result === result).length;

  const calcActionAvg = (action) => {
    // get the total of the passed in action
    const totalActionStats = stats.filter((data) => data.action === action);

    if (totalActionStats.length === 0) return 0;

    // calculate the sum of each action result
    const sumOfActionValues = totalActionStats.reduce((prev, curr) => {
      if (curr.result === "error") return prev;
      return prev + Number(curr.result);
    }, 0);

    const calculatedAverage = (sumOfActionValues / totalActionStats.length).toFixed(2);

    return calculatedAverage;
  };

  const deleteStat = (id) => {
    const removeStat = stats.filter((stat) => stat.id !== id);
    setStats(removeStat);
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
            onCompleted={clearLocalStorage}
          >
            {(updateGame, { error, loading }) => {
              if (error) {
                return <Error error={error} />;
              }

              return (
                <Container>
                  {/* Highlight stats */}
                  <nav className="level">
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Service Errors</p>
                        <p className="title">{getAggregateStat("serving", "error")}</p>
                      </div>
                    </div>
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Passing Avg.</p>
                        <p className="title">{calcActionAvg("passing")}</p>
                      </div>
                    </div>
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Hitting Errors</p>
                        <p className="title">{getAggregateStat("hitting", "error")}</p>
                      </div>
                    </div>
                  </nav>
                  {/* Stat collection screen */}
                  <div className="columns is-multiline is-mobile">
                    {renderPlayerCards(players)}
                  </div>
                  <div className="field is-grouped" style={{ paddingBottom: 10 }}>
                    <p className="control" onClick={() => submitGame(updateGame)}>
                      <a className="button is-link">Save Game</a>
                    </p>
                    <p
                      className="control"
                      onClick={() => {
                        clearLocalStorage();
                        Router.push({ pathname: "/create" });
                      }}
                    >
                      <a className="button is-danger is-outlined">
                        <span>Delete</span>
                        <span className="icon is-small">
                          <i className="fas fa-times" />
                        </span>
                      </a>
                    </p>
                  </div>
                  <PlayerStatsModal
                    isActive={isActive}
                    toggleModal={setIsActive}
                    stats={stats}
                    activePlayer={activePlayer}
                    deleteStat={deleteStat}
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
