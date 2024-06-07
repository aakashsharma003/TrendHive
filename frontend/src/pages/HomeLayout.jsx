import { Outlet } from "react-router-dom";
import Navbar from "../components/Navabar";

const HomeLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default HomeLayout;
