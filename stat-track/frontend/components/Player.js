import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";

const CardHeaderContainer = styled.div`
  flex-direction: column;
  align-items: flex-start;
`;

export const Player = ({ player, toggleModal, setPlayer }) => {
  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet" key={player.id}>
      <div className="card">
        <header className="card-header">
          <Link
            href={{
              pathname: "/player",
              query: { id: player.id },
            }}
          >
            <CardHeaderContainer className="card-header-title">
              <p>
                {player.firstName} {player.lastName}
              </p>
              <p className="subtitle is-6">{player.team.name}</p>
            </CardHeaderContainer>
          </Link>
          {/* <a href="#" className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </a> */}
        </header>
        <div className="card-content">
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis
            mauris.
            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
            <br />
            <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
        <footer className="card-footer">
          {/* <a
            href="#"
            className="card-footer-item"
            onClick={() => {
              toggleModal(true);
            }}
          >
            Save
          </a> */}
          <Link
            href={{
              pathname: "update",
              query: { id: player.id },
            }}
          >
            <a className="card-footer-item">Edit</a>
          </Link>
          <a
            href="#"
            className="card-footer-item"
            onClick={() => {
              toggleModal(true);
              setPlayer(player);
            }}
          >
            Delete
          </a>
        </footer>
      </div>
    </div>
  );
};

Player.prototype = {
  player: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    position: PropTypes.string,
    nunber: PropTypes.string,
  }),
  toggleModal: PropTypes.func,
};
