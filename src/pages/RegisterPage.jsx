import FormInput from "../components/formInput";
import NavbarComp from "../components/Navbar";

const RegisterPage = () => {
  return (
    <>
      <NavbarComp />
      <FormInput isRegister={true} />
    </>
  );
};

export default RegisterPage;
