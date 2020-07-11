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
import NProgress from "nprogress";
import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";
import Router from "next/router";
import Search from "./blog/search";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const AppHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    setAuthData(isAuth());
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const handleSignout = () => {
    signout(() => {
      Router.push("/signin");
    });
  };

  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold" href="">
            {APP_NAME}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link href="/blogs">
                <NavLink href="">Blogs</NavLink>
              </Link>
            </NavItem>
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
                  <NavLink href="">{`${isAuth().name}`}</NavLink>
                </Link>
              </NavItem>
            )}

            {authData && authData.role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink href="">{`${isAuth().name}`}</NavLink>
                </Link>
              </NavItem>
            )}

            {authData && (
              <NavItem>
                <NavLink href="/" onClick={() => handleSignout()}>
                  Signout
                </NavLink>
              </NavItem>
            )}

            <NavItem>
              <Link href="/user/crud/blog">
                <NavLink className="btn btn-primary text-light" href="">
                  Write Blog
                </NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );
};

export default AppHeader;
