import React, { Fragment, useState } from "react";
import styled from "styled-components";

import { RestrictSignIn } from "./RestrictSignIn";
import { PlayerForm } from "./AddPlayer";
import { TeamForm } from "./AddTeam";
import { GameForm } from "./AddGame";

const Container = styled.div`padding: 0 32px;`;

const TopPadding = styled.div`padding-top: 10px;`;

export const CreateTabs = () => {
  const [ currentTab, setCurrentTab ] = useState("player");
  return (
    <RestrictSignIn>
      <Container className="tabs is-large">
        <ul>
          <li
            className={currentTab === "player" ? "is-active" : ""}
            onClick={() => setCurrentTab("player")}
          >
            <a>Player</a>
          </li>
          <li
            className={currentTab === "team" ? "is-active" : ""}
            onClick={() => setCurrentTab("team")}
          >
            <a>Team</a>
          </li>
          <li
            className={currentTab === "game" ? "is-active" : ""}
            onClick={() => setCurrentTab("game")}
          >
            <a>Game</a>
          </li>
        </ul>
      </Container>
      <TopPadding className="container is-fluid">
        {currentTab === "player" && <PlayerForm />}
        {currentTab === "team" && <TeamForm />}
        {currentTab === "game" && <GameForm />}
      </TopPadding>
    </RestrictSignIn>
  );
};
