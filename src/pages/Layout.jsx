import { Outlet } from "react-router-dom";
import Header from "../composants/Header";
import Footer from "../composants/Footer";
function Layout() {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  );
}

export default Layout;
