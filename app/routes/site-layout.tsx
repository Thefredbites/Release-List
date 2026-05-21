import { Outlet } from "react-router";
import { Footer } from "../shared/layout/Footer";
import { Navbar } from "../shared/layout/Navbar";

export default function SiteLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
