import React, { useState, Fragment } from "react";
// import { Transition } from "react-transition-group";
import styled from "styled-components";

const ContentContainer = styled.div`padding: 1rem;`;

const StatTitle = styled.h5`
  && {
    margin-bottom: 0.5rem;
  }
`;

const PlayerSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0 8px 8px;
`;

const StatRow = styled.div`margin-bottom: 1rem;`;

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

  const fadeUpdateTag = () => {
    console.log("Component appeared");
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
              {`${currentPlayer.firstName} ${currentPlayer.lastName} #${currentPlayer.number}`}
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
            <StatTitle className="subtitle is-5">Passing</StatTitle>
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
            <StatTitle className="subtitle is-5">Serving</StatTitle>
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
                Ace
              </span>
              <span
                className="button is-rounded"
                onClick={() => createGameStat("serving", "error")}
                disabled={isSubMode}
                style={{ backgroundColor: "#2851b2", color: "white" }}
              >
                Error
              </span>
            </div>
          </StatRow>
          <div>
            <StatTitle className="subtitle is-5">Hitting</StatTitle>
            <div className="buttons">
              <span
                className="button is-rounded"
                onClick={() => createGameStat("hitting", "attempt")}
                disabled={isSubMode}
                style={{ backgroundColor: "#8f83bc", color: "white" }}
              >
                Attempt
              </span>
              <span
                className="button is-success is-rounded"
                onClick={() => createGameStat("hitting", "kill")}
                disabled={isSubMode}
                style={{ backgroundColor: "#8375b5", color: "white" }}
              >
                Kill
              </span>
              <span
                className="button is-danger is-rounded"
                onClick={() => createGameStat("hitting", "error")}
                disabled={isSubMode}
                style={{ backgroundColor: "#7768ae", color: "white" }}
              >
                Error
              </span>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};
