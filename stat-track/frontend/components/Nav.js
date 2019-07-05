import Link from "next/link";

export const Nav = () => (
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
        <div className="navbar-item">
          <div className="buttons">
            <Link href="/create">
              <a className="button is-primary">
                <strong>Create</strong>
              </a>
            </Link>
            <Link href="/signup">
              <a className="button is-light">Sign Up</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
);
