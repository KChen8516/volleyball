import React, { useState } from "react";
import styled from "styled-components";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Error from "./ErrorMessage";
import { ALL_TEAMS_QUERY } from "./AddPlayer";

// const CREATE_GAME_MUTATION = gql`
//   mutation CREATE_GAME_MUTATION($teamName: String!, $teamId: String!, $opponent: String) {
//     createGame(teamName: $teamName, teamId: $teamId, opponent: $opponent) {
//       id
//     }
//   }
// `;

// const TopPadding = styled.div`padding-top: 10px;`;

export const GameForm = () => {
  const [ teamName, setTeamName ] = useState();
  const [ opponentName, setOpponentName ] = useState();

  const handleFormUpdate = (e) => {
    const { name, type, value } = e.target;

    const val = type === "number" ? parseFloat(value) : value;
    switch (name) {
      case "city":
        setCity(val);
        break;
      case "name":
        setName(val);
        break;
      default:
        return;
    }
  };

  const onSubmitTeam = async (mutation) => {
    const res = await mutation();

    Router.push({
      pathname: "/team",
      query: { id: res.data.createTeam.id },
    });
  };

  return (
    // <Mutation mutation={CREATE_TEAM_MUTATION} variables={{ name, city, players: [] }}>
    //   {(createTeam, { error, loading }) => (
    //     <TopPadding className="container is-fluid">
    //       <Error error={error} />
    //       <fieldset disabled={loading} aria-busy={loading}>
    //         <h2 className="title is-2">Create a Team</h2>
    //         <div className="field">
    //           <label className="label">Team Name</label>
    //           <div className="control">
    //             <input
    //               className="input"
    //               name="name"
    //               type="text"
    //               placeholder="e.g Alex Smith"
    //               value={name}
    //               onChange={handleFormUpdate}
    //             />
    //           </div>
    //         </div>

    //         <div className="field">
    //           <label className="label">City</label>
    //           <div className="control">
    //             <input
    //               className="input"
    //               name="city"
    //               type="text"
    //               placeholder="e.g. Santa Clara"
    //               value={city}
    //               onChange={handleFormUpdate}
    //             />
    //           </div>
    //         </div>
    //         <TopPadding>
    //           <div className="field is-grouped">
    //             <p className="control">
    //               <a
    //                 className="button is-primary"
    //                 onClick={() => {
    //                   onSubmitTeam(createTeam);
    //                 }}
    //               >
    //                 Submit
    //               </a>
    //             </p>
    //             <p className="control">
    //               <a className="button is-light">Clear</a>
    //             </p>
    //           </div>
    //         </TopPadding>
    //       </fieldset>
    //     </TopPadding>
    //   )}
    // </Mutation>
    <Query query={ALL_TEAMS_QUERY}>
      {({ data, loading, error }) => {
        const { teams } = data;
        console.log("ADDGAME", { teams });
        if (loading) {
          return <h1>Loading...</h1>;
        }

        if (error) {
          return <Error error={error} />;
        }
        return <h1>Game Form</h1>;
      }}
    </Query>
  );
};
