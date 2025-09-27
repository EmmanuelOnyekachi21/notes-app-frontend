import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { ToastContainer, toast } from 'react-toastify';

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <div style={{ paddingBottom: "60px" }}>
        <ToastContainer autoClose={3000} />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
