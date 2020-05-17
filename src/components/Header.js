import React from "react";
import { Link } from "gatsby";

import Container from "components/Container";

const Header = () => {
  return (
    <header>
      <Container type="content">
        <p>COVID-19 State Tracker</p>
        <ul>
          <li>
            <Link to="/">Graphs</Link>
          </li>
          <li>
            <Link to="/">Maps</Link>
          </li>
          <li>
            <a href="http://fullerton.edu">State Policy</a>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
