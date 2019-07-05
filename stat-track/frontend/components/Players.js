import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import { Player } from "./Player";
import { DeletePlayerModal } from "./DeletePlayerModal";

const Container = styled.div`padding: 10px 32px 0 32px;`;

export const ALL_PLAYERS_QUERY = gql`
  query ALL_PLAYERS_QUERY {
    players {
      id
      firstName
      lastName
      position
      number
      image
    }
  }
`;

export const Players = (props) => {
  const [ isActive, setIsActive ] = useState(false);
  const [ player, setPlayer ] = useState();
  return (
    <Query query={ALL_PLAYERS_QUERY}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;

        const { players } = data;

        return (
          <Container>
            <h2 className="title is-2">Players</h2>
            <div className="columns is-multiline is-mobile">
              {players.map((player) => (
                <Player
                  player={player}
                  key={player.id}
                  toggleModal={setIsActive}
                  setPlayer={setPlayer}
                />
              ))}
            </div>
            <DeletePlayerModal isActive={isActive} toggle={setIsActive} player={player} />
          </Container>
        );
      }}
    </Query>
  );
};
