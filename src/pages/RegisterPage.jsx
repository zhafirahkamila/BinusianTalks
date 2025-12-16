import NavbarComp from "../components/Navbar";
import FormInput from "../components/formInput";

const RegisterPage = () => {
  return (
    <>
      <NavbarComp 
        showMenu={false} 
        authButtonType="signin" 
      />
      <FormInput isRegister={true} />
    </>
  );
};

export default RegisterPage;