import React from 'react'
import NavbarComp from '../components/Navbar';
import FormInput from '../components/formInput';

const LoginPage = () => {
  return (
    <>
      <NavbarComp />
      <FormInput isRegister={false} />
    </>
  );
}

export default LoginPage
