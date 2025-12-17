import React from "react";
import Footer from "../components/Footer";
import ProfileForm from "../components/ProfileForm";
import NavbarComp from "../components/Navbar";

const ProfilePage = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* <NavbarComp showAuthButton={false} showProfile={true} /> */}
      <NavbarComp />
      <ProfileForm />
      <Footer />

      <div style={{ paddingBottom: "70px" }}></div>
    </div>
  );
};

export default ProfilePage;
