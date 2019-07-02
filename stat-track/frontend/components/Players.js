import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import { Player } from "./Player";

const Container = styled.div`padding-top: 10px;`;

const ALL_PLAYERS_QUERY = gql`
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
  return (
    <Query query={ALL_PLAYERS_QUERY}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;

        const { players } = data;

        return (
          <Container className="container is-fluid">
            <h2 className="title is-2">Players</h2>
            <div className="columns">
              {players.map((player) => <Player player={player} key={player.id} />)}
            </div>
          </Container>
        );
      }}
    </Query>
  );
};
