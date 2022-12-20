import { AdminNavBar } from "components";

const Layout = (props) => {
  return (
    <>
      <AdminNavBar>{props.children}</AdminNavBar>
    </>
  );
};

export default Layout;