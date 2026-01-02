import React from "react";
import Footer from "../components/Footer";
import ProfileForm from "../components/ProfileComponents/ProfileForm";
import NavbarComp from "../components/Navbar";

const ProfilePage = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <NavbarComp />
      <ProfileForm />
      <Footer />
    </div>
  );
};

export default ProfilePage;
