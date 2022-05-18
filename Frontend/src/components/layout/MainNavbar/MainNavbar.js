import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar } from "shards-react";

import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";
import NavbarSearch from "./NavbarSearch";

const MainNavbar = ({ layout, stickyTop }) => {
  const classes = classNames(
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top"
  );

  return (
    <div className={classes} >
      <div className="p-0">
        <Navbar type="light" className=" p-0">
          {/* <NavbarSearch /> */}
          <NavbarNav />
          <NavbarToggle />
        </Navbar>
      </div>
    </div>
  );
};

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
