import React, { useState } from "react";
import styled from "styled-components";

import { PlayerCard } from "./PlayerCard";

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

const playerA = {
  id: "123",
  firstName: "Matt",
  lastName: "Anderson",
  number: "1",
  position: "Opposite",
};

const playerB = {
  id: "123",
  firstName: "Aaron",
  lastName: "Russell",
  number: "2",
  position: "Outside",
};

const playerC = {
  id: "123",
  firstName: "Erik",
  lastName: "Shoji",
  number: "22",
  position: "Libero",
};

const playerD = {
  id: "123",
  firstName: "Taylor",
  lastName: "Sander",
  number: "3",
  position: "Outside",
};

const playerE = {
  id: "123",
  firstName: "Micah",
  lastName: "C.",
  number: "11",
  position: "Setter",
};

const playerF = {
  id: "123",
  firstName: "Max",
  lastName: "Holt",
  number: "12",
  position: "Middle",
};

export const GameScreen = ({ id, teamId }) => {
  const [ stats, setStats ] = useState([]);
  const recordStat = ({ playerId, firstName, lastName, action, result }) => {
    console.log({ playerId, firstName, lastName, action, result });
    setStats((stats) => stats.concat({ playerId, firstName, lastName, action, result }));
  };

  console.log(stats);
  return (
    <Container>
      <div className="columns is-multiline is-mobile">
        <div className="column is-one-third-tablet is-half-mobile">
          <PlayerCard player={playerA} onStatChange={recordStat} />
        </div>

        <div className="column is-one-third-tablet is-half-mobile">
          <PlayerCard player={playerB} onStatChange={recordStat} />
        </div>

        <div className="column is-one-third-tablet is-half-mobile">
          <PlayerCard player={playerC} onStatChange={recordStat} />
        </div>

        <div className="column is-one-third-tablet is-half-mobile">
          <PlayerCard player={playerD} onStatChange={recordStat} />
        </div>

        <div className="column is-one-third-tablet is-half-mobile">
          <PlayerCard player={playerE} onStatChange={recordStat} />
        </div>

        <div className="column is-one-third-tablet is-half-mobile">
          <PlayerCard player={playerF} onStatChange={recordStat} />
        </div>
      </div>
    </Container>
  );
};
