import Link from "next/link";

export const Nav = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
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

        <a className="navbar-item">Teams</a>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-primary">
              <strong>Sign up</strong>
            </a>
            {/* <a class="button is-light">Log in</a> */}
          </div>
        </div>
      </div>
    </div>
  </nav>
);
