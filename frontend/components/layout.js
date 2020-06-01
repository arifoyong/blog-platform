import AppHeader from "./appHeader";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <AppHeader />
      {children}
      <p>footer</p>
    </React.Fragment>
  );
};

export default Layout;
