import FormInput from "../components/formInput";
import NavbarComp from "../components/Navbar";

const LoginPage = () => {
  return (
    <>
      <NavbarComp showMenu={false} authButtonType="register" />
      <FormInput isRegister={false} />
    </>
  );
};

export default LoginPage;