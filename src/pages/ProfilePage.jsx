import NavbarComp from "../components/Navbar"; // Menggunakan Navbar Anda
import FooterComp from "../components/Footer"; // Menggunakan Footer Anda
import ProfileForm from "../components/ProfileForm"; 
import { Container } from "react-bootstrap";


const ProfilePage = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      
       <NavbarComp showAuthButton={false}
      showProfile={true} />

      <ProfileForm />
      <FooterComp />
      
      <div style={{ paddingBottom: '70px' }}></div> 
    </div>
  );
};

export default ProfilePage;