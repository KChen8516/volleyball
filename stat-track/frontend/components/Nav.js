import { Fragment, useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import Router from "next/router";

import { User, CURRENT_USER_QUERY } from "./User";

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`;

export const Nav = () => {
  const [ isMobileMenuOpen, setIsMobile ] = useState(false);

  const toggleMobileMenu = () => {
    !isMobileMenuOpen ? setIsMobile(true) : setIsMobile(false);
  };

  return (
    <User>
      {({ data }) => {
        if (!data) {
          return <div>There was a catastrophic error.</div>;
        }
        const { me } = data;

        return (
          <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <Link href="/">
                <a className="navbar-item">
                  <img src="/static/toastee-logo.png" width="112" height="28" />
                </a>
              </Link>

              <a
                role="button"
                className={
                  `navbar-burger burger` + (isMobileMenuOpen ? " is-active" : "")
                }
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                onClick={toggleMobileMenu}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>

            <div
              id="navbarBasicExample"
              className={`navbar-menu` + (isMobileMenuOpen ? " is-active" : "")}
            >
              <div className="navbar-start">
                <Link href="/">
                  <a className="navbar-item" onClick={toggleMobileMenu}>
                    Home
                  </a>
                </Link>

                <Link href="/players">
                  <a className="navbar-item" onClick={toggleMobileMenu}>
                    Players
                  </a>
                </Link>
                <Link href="/games">
                  <a className="navbar-item" onClick={toggleMobileMenu}>
                    Games Log
                  </a>
                </Link>
              </div>

              <div className="navbar-end">
                {me && (
                  <div className="navbar-item">
                    <p>Welcome, {me.name}</p>
                  </div>
                )}
                <div className="navbar-item">
                  <div className="buttons">
                    {me && (
                      <Fragment>
                        <Mutation
                          mutation={SIGNOUT_MUTATION}
                          refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
                          onCompleted={() => {
                            Router.push({
                              pathname: "/signout",
                            });
                            toggleMobileMenu();
                          }}
                        >
                          {(signOut) => (
                            <a className="button is-danger is-outlined" onClick={signOut}>
                              Sign Out
                            </a>
                          )}
                        </Mutation>
                        <Link href="/create">
                          <a className="button is-primary" onClick={toggleMobileMenu}>
                            <strong>Create</strong>
                          </a>
                        </Link>
                      </Fragment>
                    )}
                    {!me && (
                      <Fragment>
                        <Link href="/signup">
                          <a
                            className="button is-info is-outlined"
                            onClick={toggleMobileMenu}
                          >
                            Sign Up
                          </a>
                        </Link>
                        <Link href="/signin">
                          <a className="button is-primary" onClick={toggleMobileMenu}>
                            Sign In
                          </a>
                        </Link>
                      </Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        );
      }}
    </User>
  );
};
