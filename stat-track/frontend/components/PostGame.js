import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Error from "./ErrorMessage";

const SINGLE_GAME_QUERY = gql`
  query SINGLE_GAME_QUERY($id: ID!) {
    game(where: { id: $id }) {
      id
      opposingTeam
      stats {
        id
        playerName
        action
        result
      }
    }
  }
`;

export const PostGame = ({ gameId }) => {
  const createPlayerRow = (stats) => {
    if (!stats || stats.length === 0) {
      return (
        <tr>
          <th>No Stats Found</th>
        </tr>
      );
    }

    let uniquePlayers = {};
    let playerRows = [];
    let startingIndex = 0;

    stats.forEach((stat) => {
      const { playerName, action, result } = stat;
      if (!uniquePlayers[playerName] && uniquePlayers[playerName] !== 0) {
        // if the player hasn't been found initialize
        // and store its index
        uniquePlayers[playerName] = startingIndex;
        startingIndex++;
        // base stat obj to display
        const statObj = {
          name: playerName,
          serving: [],
          hitting: [],
          dig: [],
          other: [],
          passing: [],
        };

        statObj[action].push(result);
        playerRows.push(statObj);
      } else {
        // update the existing stat counts
        const rowIndex = uniquePlayers[playerName];
        playerRows[rowIndex][action].push(result);
      }
    });

    return playerRows.map((player) => renderPlayerRow(player));
  };

  const renderPlayerRow = (statObj) => {
    const { name } = statObj;
    let hitting = 0,
      passing = 0,
      serving = 0,
      errors = 0;

    // update each stat
    passing = calculateAverage(statObj.passing);
    serving = calculateAverage(statObj.serving);
    hitting = calculatePercentage(statObj.hitting);
    errors = sumTotalErrors(statObj);

    return (
      <tr key={name}>
        <th>{name}</th>
        <td>{serving}</td>
        <td>{passing}</td>
        <td>{hitting}</td>
        <td>{statObj.dig.length}</td>
        <td>{errors}</td>
      </tr>
    );
  };

  const calculateAverage = (statArr) => {
    let total = statArr.length;
    if (total === 0) return 0;

    // calculate the sum of each action result
    const sumOfActionValues = statArr.reduce((prev, curr) => {
      if (curr === "error") return prev;
      return prev + Number(curr);
    }, 0);

    const calculatedPercentage = (sumOfActionValues / total).toFixed(2);

    return calculatedPercentage;
  };

  const calculatePercentage = (statArr) => {
    // get the total # of attempts, kills, and errors
    let attempts = 0;
    let kills = 0;
    let errors = 0;

    statArr.forEach((data) => {
      if (data === "attempt") attempts++;
      if (data === "kill") kills++;
      if (data === "error") errors++;
    });

    if (attempts === 0) return 0;

    return ((kills - errors) / attempts).toFixed(3);
  };

  const sumTotalErrors = (statsObj) => {
    let count = 0;
    for (let key in statsObj) {
      if (key !== "name") {
        Array.from(statsObj[key]).forEach((value) => {
          if (value === "error" || value === "ball handling error") count++;
          if (key === "passing" && value === "0") count++;
        });
      }
    }
    return count;
  };

  return (
    <section className="section">
      <div className="container">
        <Query query={SINGLE_GAME_QUERY} variables={{ id: gameId }}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;

            if (error) {
              return <Error error={error} />;
            }

            const { game: { stats, opposingTeam } } = data;

            return (
              <Fragment>
                <h1 className="title">Opponent: {opposingTeam}</h1>
                <table className="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th>Player</th>
                      <th>Serving</th>
                      <th>Passing</th>
                      <th>Hitting</th>
                      <th>Digs</th>
                      <th>Errors</th>
                    </tr>
                  </thead>
                  <tbody>{createPlayerRow(stats)}</tbody>
                </table>
              </Fragment>
            );
          }}
        </Query>
      </div>
    </section>
  );
};
