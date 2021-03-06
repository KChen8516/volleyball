import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const ERROR_STATS_STYLES = {
  backgroundColor: "#f1c1c0",
  color: "#e15554",
};

const StatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PlayerStatsModal = ({
  isActive,
  toggleModal,
  stats,
  activePlayer,
  deleteStat,
}) => {
  const [ playerStats, setplayerStats ] = useState([]);

  useEffect(
    () => {
      const filteredStats = filterPlayerStats(stats);
      setplayerStats(filteredStats);
    },
    [ stats, activePlayer ],
  );

  const toggle = () => {
    isActive ? toggleModal(false) : toggleModal(true);
  };

  const filterPlayerStats = (stats) => {
    if (!stats || !activePlayer) return [];
    return stats.filter((stat) => stat.player === activePlayer.id).reverse();
  };

  const isErrorStat = (stat) => {
    return (
      stat.result === "error" ||
      (stat.result === "0" && stat.action !== "serving") ||
      stat.action === "other"
    );
  };

  const renderPlayerStats = () => {
    return playerStats.map((stat) => {
      const isError = isErrorStat(stat);

      return (
        <tr style={isError ? ERROR_STATS_STYLES : null} key={stat.id}>
          <th style={isError ? { color: "#e15554" } : null}>{stat.action}</th>
          <td>
            <StatContainer>
              <span>{stat.result} </span>
              <a className="delete" onClick={() => deleteStat(stat.id)} />
            </StatContainer>
          </td>
        </tr>
      );
    });
  };

  const calcPercentage = (action) => {
    // get the total of the passed in action
    const totalActionStats = playerStats.filter((data) => data.action === action);

    if (totalActionStats.length === 0) return 0;

    // calculate the sum of each action result
    const sumOfActionValues = totalActionStats.reduce((prev, curr) => {
      if (curr.result === "error") return prev;
      return prev + Number(curr.result);
    }, 0);

    const calculatedPercentage = (sumOfActionValues / totalActionStats.length).toFixed(2);

    return calculatedPercentage;
  };

  const calcHittingPercentage = () => {
    // get the total # of attempts, kills, and errors
    let attempts = 0;
    let kills = 0;
    let errors = 0;

    playerStats.forEach((data) => {
      if (data.action === "hitting") {
        if (data.result === "attempt") attempts++;
        if (data.result === "kill") kills++;
        if (data.result === "error") errors++;
      }
    });

    if (attempts === 0) return 0;

    //TODO: should show an error if # of kills/attempts > # of attempts

    return ((kills - errors) / attempts).toFixed(3);
  };

  const countDigs = () => {
    return playerStats.filter((stat) => stat.action === "dig").length;
  };

  // SSR doesn't provide client objects so check for browser env
  return process.browser
    ? ReactDOM.createPortal(
        <div className={"modal " + (isActive ? "is-active" : null)}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head" style={{ padding: 12 }}>
              {activePlayer && (
                <p className="modal-card-title">
                  {activePlayer.firstName} {activePlayer.lastName} Stats
                </p>
              )}
              <button className="delete" aria-label="close" onClick={toggle} />
            </header>
            <section className="modal-card-body">
              <div className="content">
                {/* Aggregate stats here */}
                <nav className="level">
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Passing avg.</p>
                      <p className="title">{calcPercentage("passing")}</p>
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Serving avg.</p>
                      <p className="title">{calcPercentage("serving")}</p>
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Hitting %</p>
                      <p className="title">{calcHittingPercentage()}</p>
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Digs</p>
                      <p className="title">{countDigs()}</p>
                    </div>
                  </div>
                </nav>
                {/* Raw table stats */}
                <table className="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>{renderPlayerStats()}</tbody>
                </table>
              </div>
            </section>
            <footer className="modal-card-foot" style={{ padding: 8 }}>
              <button className="button" onClick={toggle}>
                Close
              </button>
            </footer>
          </div>
        </div>,
        document.body,
      )
    : null;
};

PlayerStatsModal.propTypes = {
  isActive: PropTypes.bool,
  toggle: PropTypes.func,
  stats: PropTypes.array,
  activePlayer: PropTypes.object,
  deleteStat: PropTypes.func,
};
