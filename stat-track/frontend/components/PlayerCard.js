import React, { useState, Fragment } from "react";
// import { Transition } from "react-transition-group";
import styled from "styled-components";

const ContentContainer = styled.div`padding: 0.75rem;`;

const RowLabel = styled.span`
  font-size: 1.5rem;
  padding-right: 4px;
`;

const PlayerSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0 8px 8px;
`;

const StatRow = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  :last-child {
    margin-bottom: 0;
  }
`;

const StatsIcon = styled.span`
  padding-left: 4px;
  padding-top: 1px;
`;

export const PlayerCard = ({
  team,
  player,
  onStatChange,
  toggleModal,
  setActivePlayer,
}) => {
  const [ isSubMode, setSubMode ] = useState(false);
  const [ currentPlayer, setcurrentPlayer ] = useState(player);
  // const [ hasUpdated, setHasUpdated ] = useState(false);

  const createGameStat = (action, result) => {
    const { firstName, lastName, id } = currentPlayer;
    onStatChange({ playerId: id, firstName, lastName, action, result });
  };

  const updateCurrentPlayer = (e) => {
    const { value } = e.target;
    setSubMode(false);
    const newPlayer = findPlayerFromTeam(value);
    setcurrentPlayer(newPlayer);
  };

  const findPlayerFromTeam = (id) => {
    return team.find((player) => player.id === id);
  };

  const toggleSubMode = () => {
    isSubMode ? setSubMode(false) : setSubMode(true);
  };

  // const fadeUpdateTag = () => {
  //   console.log("Component appeared");
  // };

  const trimLastName = (name) => {
    if (!name) return "";

    return name.toUpperCase().charAt(0) + ".";
  };

  return (
    <div className="card">
      <header className="card-header">
        {isSubMode ? (
          <PlayerSelectorContainer>
            <div className="field">
              <div className="control">
                <div className="select">
                  <select
                    defaultValue={`Please Select a Player`}
                    name="player"
                    onChange={updateCurrentPlayer}
                  >
                    <option disabled key="key">
                      Please Select a Player
                    </option>
                    {team.map((player) => (
                      <option key={player.id} value={player.id}>
                        {player.firstName} {player.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </PlayerSelectorContainer>
        ) : (
          <Fragment>
            <p
              className="card-header-title"
              onClick={() => {
                toggleModal(true);
                setActivePlayer(currentPlayer);
              }}
            >
              {`${currentPlayer.firstName} ${trimLastName(
                currentPlayer.lastName,
              )} #${currentPlayer.number}`}
              <StatsIcon className="icon has-text-info">
                <i className="fas fa-table" />
              </StatsIcon>
            </p>

            <div className="card-header-icon" aria-label="more options">
              <span className="button is-dark is-small" onClick={toggleSubMode}>
                <b>Substitute</b>
              </span>
            </div>
          </Fragment>
        )}
      </header>
      <ContentContainer className="card-content">
        {/* <Transition>
          {hasUpdated && (
            <span className="tag is-success">
              Updated
              <button className="delete is-small" />
            </span>
          )}
        </Transition> */}
        <div className="stat-track">
          <StatRow>
            {/* <RowLabel>P:</RowLabel> */}
            <div className="buttons">
              <span
                className="button is-rounded"
                onClick={() => createGameStat("passing", "0")}
                disabled={isSubMode}
                style={{ backgroundColor: "#4dccbd", color: "white" }}
              >
                0
              </span>
              <span
                className="button is-rounded"
                onClick={() => createGameStat("passing", "1")}
                disabled={isSubMode}
                style={{ backgroundColor: "#46baac", color: "white" }}
              >
                1
              </span>
              <span
                className="button is-rounded"
                onClick={() => createGameStat("passing", "2")}
                disabled={isSubMode}
                style={{ backgroundColor: "#40a79b", color: "white" }}
              >
                2
              </span>
              <span
                className="button is-rounded"
                onClick={() => createGameStat("passing", "3")}
                disabled={isSubMode}
                style={{ backgroundColor: "#39958a", color: "white" }}
              >
                3
              </span>
            </div>
          </StatRow>
          <StatRow>
            {/* <RowLabel>S:</RowLabel> */}
            <div className="buttons">
              <span
                className="button is-rounded"
                onClick={() => createGameStat("serving", "3")}
                disabled={isSubMode}
                style={{ backgroundColor: "#5177cd", color: "white" }}
              >
                3
              </span>
              <span
                className="button is-info is-rounded"
                onClick={() => createGameStat("serving", "2")}
                disabled={isSubMode}
                style={{ backgroundColor: "#3e68c8", color: "white" }}
              >
                2
              </span>
              <span
                className="button is-rounded"
                onClick={() => createGameStat("serving", "1")}
                disabled={isSubMode}
                style={{ backgroundColor: "#2b59c3", color: "white" }}
              >
                1
              </span>
              <span
                className="button is-rounded"
                onClick={() => createGameStat("serving", "0")}
                disabled={isSubMode}
                style={{ backgroundColor: "#2851b2", color: "white" }}
              >
                A
              </span>
              <span
                className="button is-rounded"
                onClick={() => createGameStat("serving", "error")}
                disabled={isSubMode}
                style={{ backgroundColor: "#2851b2", color: "white" }}
              >
                E
              </span>
            </div>
          </StatRow>
          <StatRow>
            {/* <RowLabel>H:</RowLabel> */}
            <div className="buttons">
              <span
                className="button is-rounded"
                onClick={() => createGameStat("hitting", "attempt")}
                disabled={isSubMode}
                style={{ backgroundColor: "#8f83bc", color: "white" }}
              >
                A
              </span>
              <span
                className="button is-success is-rounded"
                onClick={() => createGameStat("hitting", "kill")}
                disabled={isSubMode}
                style={{ backgroundColor: "#8375b5", color: "white" }}
              >
                K
              </span>
              <span
                className="button is-danger is-rounded"
                onClick={() => createGameStat("hitting", "error")}
                disabled={isSubMode}
                style={{ backgroundColor: "#7768ae", color: "white" }}
              >
                E
              </span>

              {/* <div style={{ paddingLeft: 24 }}>
                <span
                  className="button is-success is-rounded"
                  onClick={() => createGameStat("dig", "downball")}
                  disabled={isSubMode}
                  style={{ backgroundColor: "#982649", color: "white" }}
                >
                  D
                </span>
                <span
                  className="button is-danger is-rounded"
                  onClick={() => createGameStat("dig", "freeball")}
                  disabled={isSubMode}
                  style={{ backgroundColor: "#982649", color: "white" }}
                >
                  F
                </span>
              </div> */}
            </div>
          </StatRow>
          <StatRow>
            {/* <RowLabel>P:</RowLabel> */}
            <div className="buttons">
              <span
                className="button is-success is-rounded"
                onClick={() => createGameStat("dig", "downball")}
                disabled={isSubMode}
                style={{ backgroundColor: "#AA4d6a", color: "white" }}
              >
                D
              </span>
              <span
                className="button is-danger is-rounded"
                onClick={() => createGameStat("dig", "freeball")}
                disabled={isSubMode}
                style={{ backgroundColor: "#982649", color: "white" }}
              >
                F
              </span>
              <span
                className="button is-rounded"
                onClick={() => createGameStat("other", "ball handling error")}
                disabled={isSubMode}
                style={{ backgroundColor: "#7d203c", color: "white" }}
              >
                BHE
              </span>
            </div>
          </StatRow>
        </div>
      </ContentContainer>
    </div>
  );
};
