import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import useAuth from '../Authentication/useAuth'

const Conditional_Layout = ({ children, noNavbar, noFooter }) => {

  const { user } = useAuth()
  Conditional_Layout.propTypes = {
    /**
     * Whether to display the navbar, or not.
     */
    noNavbar: PropTypes.bool,
    /**
     * Whether to display the footer, or not.
     */
    noFooter: PropTypes.bool
  };

  Conditional_Layout.defaultProps = {
    noNavbar: false,
    noFooter: false
  };

  return (
    <React.Fragment>
      {user !== null ?
        <Container fluid>
          <Row>
            <MainSidebar />
            <Col
              className="main-content p-0"
              // lg={{ size: 10, offset: 2 }}
              // md={{ size: 9, offset: 3 }}
              lg="12"
              tag="main"
            >
               <MainNavbar />
                  {children}
              {/* <MainFooter /> */}
            </Col>
          </Row>
        </Container>
        : children
      }
    </React.Fragment>
  )
};



export default Conditional_Layout;
