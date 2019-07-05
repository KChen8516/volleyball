import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { ALL_PLAYERS_QUERY } from "./Players";

const DELETE_PLAYER_MUTATION = gql`
  mutation DELETE_PLAYER_MUTATION($id: ID!) {
    deletePlayer(id: $id) {
      id
    }
  }
`;

export const DeletePlayerModal = ({ isActive, toggle, player }) => {
  const toggleModal = () => {
    isActive ? toggle(false) : toggle(true);
  };

  const update = (cache, payload) => {
    // manually update the cache on the client
    // 1. read the cache for the player we want
    const data = cache.readQuery({ query: ALL_PLAYERS_QUERY });
    // 2. filter the deleted player
    data.players = data.players.filter(
      (player) => player.id !== payload.data.deletePlayer.id,
    );
    // 3. put the players back
    cache.writeQuery({ query: ALL_PLAYERS_QUERY, data });
    toggleModal();
  };

  // SSR doesn't provide client objects so check for browser env
  return process.browser
    ? ReactDOM.createPortal(
        <Mutation
          mutation={DELETE_PLAYER_MUTATION}
          variables={player ? { id: player.id } : {}}
          update={update}
        >
          {(deletePlayer, { error }) => (
            <div className={"modal " + (isActive ? "is-active" : null)}>
              <div className="modal-background" />
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Delete Player</p>
                  <button className="delete" aria-label="close" onClick={toggleModal} />
                </header>
                <section className="modal-card-body">
                  {player &&
                    `Are you sure you want to delete ${player.firstName} ${player.lastName}?`}
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-danger" onClick={deletePlayer}>
                    Delete
                  </button>
                  <button className="button" onClick={toggleModal}>
                    Cancel
                  </button>
                </footer>
              </div>
            </div>
          )}
        </Mutation>,
        document.body,
      )
    : null;
};

DeletePlayerModal.propTypes = {
  isActive: PropTypes.bool,
  toggle: PropTypes.func,
  player: PropTypes.object,
};
