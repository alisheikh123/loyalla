import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import login from "../components/sessions/login";

const Nolayout = ({ children, noNavbar, noFooter }) => (


    <>
    {/* {!noNavbar && <login />} */}
    {children}
    {/* {!noFooter && <MainFooter />} */}
    </>






);

Nolayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,

  /**
   * Whether to display the footer, or not.
   */
};

Nolayout.defaultProps = {
  noNavbar: false,
  noFooter: true,
};

export default Nolayout;
