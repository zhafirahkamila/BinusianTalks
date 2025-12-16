// src/components/formInput.jsx

import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const FormInput = ({ 
  isRegister = false,
  showBottomLink = true  // Tampilkan link ke Login/Register di bawah form
}) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const auth = (values) => {
    // Sesuaikan logika otentikasi di sini (e.g., kirim ke API login/register)
    alert(`Submit Success!\n${JSON.stringify(values, null, 2)}`);
    
    // Redirect ke about page setelah berhasil login/register
    setTimeout(() => {
      navigate('/about');
    }, 500); // Delay 500ms agar user sempat lihat alert
  };

  // Skema Validasi
  const ValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format")
      .matches(
        /^[A-Za-z0-9._%+-]+@binus\.ac\.id$/,
        "Email must end with @binus.ac.id"
      ),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirm: isRegister
      ? yup
          .string()
          .oneOf([yup.ref("password")], "Password must match")
          .required("Confirm password is required")
      : yup.string().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm: "",
    },
    onSubmit: auth,
    validationSchema: ValidationSchema,
  });

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "85vh" }}
      >
        <h1 className="mb-5 text">
          {isRegister ? "Create Account" : "Sign in"}
        </h1>
        <Form onSubmit={formik.handleSubmit} className="form-wrapper">
          {/* 1. Email Input */}
          <Form.Group className="mb-5">
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Email (@binus.ac.id)"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && !!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* 2. Password Input */}
          <Form.Group className="mb-5">
            <div className="position-relative">
              <Form.Control
                className="form-input"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              <span onClick={() => setShowPass(!showPass)} className="eye-icon">
                {showPass ? <EyeSlash /> : <Eye />}
              </span>
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          {/* 3. Confirm Password Input - HANYA DITAMPILKAN JIKA isRegister=true */}
          {isRegister && (
            <Form.Group className="mb-5">
              <div className="position-relative">
                <Form.Control
                  className="form-input"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirm"
                  value={formik.values.confirm}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.confirm && !!formik.errors.confirm}
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="eye-icon"
                >
                  {showConfirm ? <EyeSlash /> : <Eye />}
                </span>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirm}
                </Form.Control.Feedback>
              </div>
            </Form.Group>
          )}

          {/* 4. Tombol Submit */}
          <div className="d-flex justify-content-center">
            <Button type="submit" className="btn-create">
              {isRegister ? "Create" : "Sign in"}
            </Button>
          </div>

          {/* 5. Teks Tautan - Optional */}
          {showBottomLink && (
            <div className="text-login text-center mt-3">
              {isRegister ? (
                <>
                  <span>Have an account? </span>
                  <Link to="/login" className="ms-1 text-decoration-none fw-bold">
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  <span>Didn't Have account? </span>
                  <Link to="/register" className="ms-1 text-decoration-none fw-bold">
                    Create Account
                  </Link>
                </>
              )}
            </div>
          )}
        </Form>
      </div>
    </>
  );
};

export default FormInput;