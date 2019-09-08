import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export const PlayerStatsModal = ({ isActive, toggleModal, stats, activePlayer = {} }) => {
  const toggle = () => {
    isActive ? toggleModal(false) : toggleModal(true);
  };

  const filterPlayerStats = (stats) => {
    if (!stats) return null;
    console.log({ stats });
    console.log({ activePlayer });
    console.log(stats.filter((stat) => stat.playerId === activePlayer.id));
    return stats.filter((stat) => stat.playerId === activePlayer.id).reverse();
  };

  const renderPlayerStats = (stats) => {
    if (!stats) return null;

    const filteredStats = filterPlayerStats(stats);

    console.log({ filteredStats });

    return filteredStats.map((stat) => (
      <tr>
        <th>{stat.action}</th>
        <td>{stat.result}</td>
      </tr>
    ));
  };

  console.log({ activePlayer });

  // SSR doesn't provide client objects so check for browser env
  return process.browser
    ? ReactDOM.createPortal(
        <div className={"modal " + (isActive ? "is-active" : null)}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                {activePlayer.firstName} {activePlayer.lastName} Stats
              </p>
              <button className="delete" aria-label="close" onClick={toggle} />
            </header>
            <section className="modal-card-body">
              <div className="content">
                <table className="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>{renderPlayerStats(stats)}</tbody>
                </table>
              </div>
            </section>
            <footer className="modal-card-foot">
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
};
