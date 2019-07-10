import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import Head from "next/head";

import Error from "./ErrorMessage";

const Container = styled.div`padding: 32px 32px 0 32px;`;

const WarningContainer = styled.div`box-shadow: ${(props) => props.theme.boxShadow};`;

const SINGLE_PLAYER_QUERY = gql`
  query SINGLE_PLAYER_QUERY($id: ID!) {
    player(where: { id: $id }) {
      id
      firstName
      lastName
      position
      number
      team {
        name
      }
    }
  }
`;

export const PlayerProfile = ({ id }) => (
  <Container>
    <Query query={SINGLE_PLAYER_QUERY} variables={{ id }}>
      {({ data, loading, error }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (!data.player) {
          return (
            <WarningContainer className="notification is-danger">
              <button className="delete" />
              No Player Found for {id}!
            </WarningContainer>
          );
        }

        const { player: { firstName, lastName, position, number, team } } = data;

        return (
          <Fragment>
            {/* Side effect from NextJS */}
            <Head>
              <title>Stat Track | {firstName}</title>
            </Head>
            <div className="tile is-ancestor">
              <div className="tile is-4 is-vertical is-parent">
                <div className="tile is-child box">
                  <p className="title">
                    {firstName} {lastName}
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare
                    magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa
                    sem. Etiam finibus odio quis feugiat facilisis.
                  </p>
                </div>
                <div className="tile is-child box">
                  <p className="title">
                    # {number} - {position}
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare
                    magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa
                    sem. Etiam finibus odio quis feugiat facilisis.
                  </p>
                </div>
              </div>
              <div className="tile is-parent">
                <div className="tile is-child box">
                  <p className="title">Stats</p>
                  <p className="subtitle">Team: {team.name}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper
                    diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat
                    tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo
                    sit amet vehicula eleifend, nunc dui porta orci, quis semper odio
                    felis ut quam.
                  </p>
                  <p>
                    Suspendisse varius ligula in molestie lacinia. Maecenas varius eget
                    ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus,
                    augue diam porttitor lorem, et sollicitudin felis neque sit amet erat.
                    Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit
                    amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget
                    varius ligula, at volutpat tortor.
                  </p>
                  <p>
                    Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus
                    erat, vitae congue lectus dolor consequat libero. Donec leo ligula,
                    maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc
                    ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non
                    semper leo.
                  </p>
                </div>
              </div>
            </div>
          </Fragment>
        );
      }}
    </Query>
  </Container>
);
