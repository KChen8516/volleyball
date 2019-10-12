import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import Router from "next/router";

import { User } from "./User";

export const ALL_GAMES_QUERY = gql`
  query ALL_GAMES_QUERY {
    games {
      id
      homeTeamId
      homeTeam
      opposingTeam
      user {
        id
        name
      }
    }
  }
`;

// Composing HOCs with react-adopt
const ComposedHOC = adopt({
  user: ({ render }) => <User>{render}</User>,
  games: ({ render }) => (
    <Query query={ALL_GAMES_QUERY} fetchPolicy="network-only">
      {render}
    </Query>
  ),
});

export const GamesLog = () => {
  const filterGamesByUser = (games, userId) => {
    if (!games) return [];
    return games.filter((game) => {
      if (!game.user) return false;
      return game.user.id === userId;
    });
  };

  const renderGames = (gamesArr) => {
    return gamesArr.map((gameObj) => {
      return (
        <div className="box" key={gameObj.id} onClick={() => routeToGame(gameObj)}>
          <div className="content">
            <h3 className="title is-3">Opponent</h3>
            <h5 className="subtitle is-5" style={{ marginBottom: 0 }}>
              {gameObj.opposingTeam}
            </h5>
          </div>
        </div>
      );
    });
  };

  const routeToGame = (gameObj) => {
    Router.push({
      pathname: "/postgame",
      query: { id: gameObj.id },
    });
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Recent Games</h1>
        <ComposedHOC>
          {({ user, games }) => {
            if (!user) {
              return <div>Error: User was not defined.</div>;
            }

            if (!games) {
              return <div>Error: No games returned.</div>;
            }

            const me = user.data.me;
            const allGames = games.data.games;
            const filteredGames = filterGamesByUser(allGames, me.id);

            if (filteredGames.length === 0) {
              return <div>You don't have any games yet! You should play one.</div>;
            }

            return <div>{renderGames(filteredGames)}</div>;
          }}
        </ComposedHOC>
      </div>
    </section>
  );
};
