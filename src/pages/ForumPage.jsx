import React from "react";
import Footer from "../components/Footer";
import ForumComponent from "../components/Forum/ForumComponent";
import NavbarComp from "../components/Navbar";

const ForumPage = () => {
  return (
    <div
      style={{
        backgroundColor: "#dbeafe",
        minHeight: "100vh"
      }}
    >
      <NavbarComp />
      <ForumComponent />
      <Footer />
    </div>
  );
};

export default ForumPage;