import AppHeader from "./appHeader";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <AppHeader />
      {children}
    </React.Fragment>
  );
};

export default Layout;
