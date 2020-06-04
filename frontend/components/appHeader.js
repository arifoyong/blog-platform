import { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import Link from "next/link";

import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";
import Router from "next/router";

const AppHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [authData, setAuthData] = useState(null);
  const toggle = () => setIsOpen(!isOpen);
  const handleSignout = () => {
    signout(() => {
      Router.push("/signin");
    });
  };

  useEffect(() => {
    setAuthData(isAuth());
  }, []);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold" href="">
            {APP_NAME}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {!authData && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink href="">Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink href="">Signup</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

            {authData && authData.role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink href="">{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {authData && authData.role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink href="">{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {authData && (
              <NavItem>
                <NavLink onClick={() => handleSignout()}>Signout</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppHeader;
