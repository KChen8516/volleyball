import React from "react";
import styled from "styled-components";

const ContentContainer = styled.div`padding: 1rem;`;

const StatTitle = styled.h5`
  && {
    margin-bottom: 0.5rem;
  }
`;

const StatRow = styled.div`margin-bottom: 1rem;`;

export const PlayerCard = ({
  player: { firstName, lastName, id, number, position },
  onStatChange,
}) => {
  const createGameStat = (action, result) => {
    onStatChange({ playerId: id, firstName, lastName, action, result });
  };
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          {`${firstName} ${lastName} #${number}, ${position}`}
        </p>
        {/* <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </a> */}
      </header>
      <ContentContainer className="card-content">
        <div className="stat-track">
          <StatRow>
            <StatTitle className="subtitle is-5">Passing</StatTitle>
            <div className="buttons">
              <span
                className="button is-danger is-rounded"
                onClick={() => createGameStat("passing", "0")}
              >
                0
              </span>
              <span
                className="button is-info is-rounded"
                onClick={() => createGameStat("passing", "1")}
              >
                1
              </span>
              <span
                className="button is-info is-rounded"
                onClick={() => createGameStat("passing", "2")}
              >
                2
              </span>
              <span
                className="button is-success is-rounded"
                onClick={() => createGameStat("passing", "3")}
              >
                3
              </span>
            </div>
          </StatRow>
          <StatRow>
            <StatTitle className="subtitle is-5">Serving</StatTitle>
            <div className="buttons">
              <span
                className="button is-danger is-rounded"
                onClick={() => createGameStat("serving", "3")}
              >
                3
              </span>
              <span
                className="button is-info is-rounded"
                onClick={() => createGameStat("serving", "2")}
              >
                2
              </span>
              <span
                className="button is-info is-rounded"
                onClick={() => createGameStat("serving", "1")}
              >
                1
              </span>
              <span
                className="button is-success is-rounded"
                onClick={() => createGameStat("serving", "0")}
              >
                Ace
              </span>
            </div>
          </StatRow>
          <div>
            <StatTitle className="subtitle is-5">Hitting</StatTitle>
            <div className="buttons">
              <span
                className="button is-info is-rounded"
                onClick={() => createGameStat("hitting", "attempt")}
              >
                Attempt
              </span>
              <span
                className="button is-success is-rounded"
                onClick={() => createGameStat("hitting", "kill")}
              >
                Kill
              </span>
              <span
                className="button is-danger is-rounded"
                onClick={() => createGameStat("hitting", "error")}
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
