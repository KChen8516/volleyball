import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import { PlayerCard } from "./PlayerCard";
import { PlayerStatsModal } from "./PlayerStatsModal";

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

// const playerA = {
//   id: "123",
//   firstName: "Matt",
//   lastName: "Anderson",
//   number: "1",
//   position: "Opposite",
// };

// const playerB = {
//   id: "123",
//   firstName: "Aaron",
//   lastName: "Russell",
//   number: "2",
//   position: "Outside",
// };

// const playerC = {
//   id: "123",
//   firstName: "Erik",
//   lastName: "Shoji",
//   number: "22",
//   position: "Libero",
// };

// const playerD = {
//   id: "123",
//   firstName: "Taylor",
//   lastName: "Sander",
//   number: "3",
//   position: "Outside",
// };

// const playerE = {
//   id: "123",
//   firstName: "Micah",
//   lastName: "C.",
//   number: "11",
//   position: "Setter",
// };

// const playerF = {
//   id: "123",
//   firstName: "Max",
//   lastName: "Holt",
//   number: "12",
//   position: "Middle",
// };

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

// const UPDATE_GAME_MUTATION = gql`
//   mutation UPDATE_GAME_MUTATION(
//     $id: ID!
//     $number: String
//     $position: String
//     $firstName: String
//     $lastName: String
//   ) {
//     updatePlayer(
//       id: $id
//       number: $number
//       lastName: $lastName
//       firstName: $firstName
//       position: $position
//     ) {
//       id
//     }
//   }
// `;

export const GameScreen = ({ gameId, homeTeamId }) => {
  const [ stats, setStats ] = useState([]);
  const [ isActive, setIsActive ] = useState(false);
  const [ activePlayer, setActivePlayer ] = useState();

  const recordStat = ({ playerId, firstName, lastName, action, result }) => {
    console.log("STAT RECORDED >>>", { playerId, firstName, lastName, action, result });
    setStats((stats) => stats.concat({ playerId, firstName, lastName, action, result }));
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
            />
          </div>,
        );
      }
    }

    return cards;
  };

  const submitGame = () => {
    console.log("CURRENT STATS >>>", stats);
    console.log({ gameId, homeTeamId });
  };

  return (
    <Query query={SINGLE_TEAM_QUERY} variables={{ id: homeTeamId }}>
      {({ data, loading, error }) => {
        const { team: { players, name } } = data;

        console.log("TEAM DATA >>>", { players, name });

        if (loading) {
          return <h1>Loading...</h1>;
        }

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
              <p className="control" onClick={submitGame}>
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
    </Query>
  );
};
