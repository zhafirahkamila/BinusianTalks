import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useFormik } from "formik";
import * as yup from "yup";

const FormInput = ({ isRegister = false }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = async (values) => {
    setLoading(true);
    setStatusMsg(null);
    const url = isRegister
      ? `${import.meta.env.VITE_API_URL}/api/auth/register`
      : `${import.meta.env.VITE_API_URL}/api/auth/login`;

    const body = isRegister
      ? {
          email: values.email,
          password: values.password,
          confirmPass: values.confirm,
        }
      : {
          email: values.email,
          password: values.password,
        };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setStatusMsg({ text: data.message || "Error", type: "danger" });
        return;
      }

      if (isRegister) {
        setStatusMsg({
          text: "Account created successfully!",
          type: "success",
        });
        formik.resetForm();

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setStatusMsg({
          text: "Login success! Redirecting...",
          type: "success",
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          window.location.href = "/about";
        }, 1500);
      }
    } catch (err) {
      setLoading(false);
      setStatusMsg({ text: "Server error: " + err.message, type: "danger" });
    }
  };

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
          {statusMsg && (
            <Alert variant={statusMsg.type} className="text-center">
              {statusMsg.text}
            </Alert>
          )}
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
          <div className="d-flex justify-content-center">
            <Button type="submit" className="btn-create">
              {isRegister ? "Create" : "Sign in"}
            </Button>
          </div>
          <div className="text-login text-center mt-3">
            {isRegister ? (
              <>
                <span>Have an account?</span>
                <a href="/login" className="ms-1">
                  Sign in
                </a>
              </>
            ) : (
              <>
                <span>Didn't Have account?</span>
                <a href="/register" className="ms-1">
                  Create Account
                </a>
              </>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default FormInput;
