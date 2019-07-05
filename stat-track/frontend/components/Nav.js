import { Fragment } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";

import { User, CURRENT_USER_QUERY } from "./User";

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`;

export const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
            </a>
          </Link>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link href="/">
              <a className="navbar-item">Home</a>
            </Link>

            <Link href="/players">
              <a className="navbar-item">Players</a>
            </Link>
          </div>

          <div className="navbar-end">
            {me && (
              <Fragment>
                <div className="navbar-item">
                  <p>Welcome, {me.name}</p>
                </div>
                <Mutation
                  mutation={SIGNOUT_MUTATION}
                  refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
                >
                  {(signOut) => (
                    <a className="button is-light" onClick={signOut}>
                      Sign Out
                    </a>
                  )}
                </Mutation>
              </Fragment>
            )}
            <div className="navbar-item">
              <div className="buttons">
                {!me && (
                  <Fragment>
                    <Link href="/signup">
                      <a className="button is-light">Sign Up</a>
                    </Link>
                    <Link href="/signin">
                      <a className="button is-light">Sign In</a>
                    </Link>
                  </Fragment>
                )}
                <Link href="/create">
                  <a className="button is-primary">
                    <strong>Create</strong>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )}
  </User>
);
