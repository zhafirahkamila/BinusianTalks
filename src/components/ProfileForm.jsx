import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import gwen from "../assets/images/gwen.jpg";

const ProfileForm = () => {
  const ValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    // Password baru bersifat opsional
    password: yup.string().min(8, "Password must be at least 8 characters").nullable(true),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .when('password', (password, schema) => {
        return password ? schema.required('Confirm password is required') : schema.notRequired();
      }),
    bio: yup.string().max(200, "Bio cannot exceed 200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "Your Current Name",
      email: "your.email@binus.ac.id",
      password: "",
      confirmPassword: "",
      bio: "This is your current bio...",
    },
    onSubmit: (values) => {
      // Logika untuk menyimpan data profil ke server
      alert(`Profile Saved!\n${JSON.stringify(values, null, 2)}`);
    },
    validationSchema: ValidationSchema,
  });

  return (
    <Container className="d-flex flex-column align-items-center mb-5">
      {/* Container utama biru tua, menyesuaikan gambar */}
      <div 
        className="p-5 w-100 shadow" 
        style={{ 
          maxWidth: '800px', 
          backgroundColor: '#137EB4', // Warna biru tua
          borderRadius: '15px',
          marginTop: '30px'
        }}
      >
        
        <div className="text-center mb-5">
          {/* Ganti URL_AVATAR_ANDA dengan gambar avatar yang sesuai */}
          <img
            src={gwen} 
            alt="User Avatar"
            width={150}
            height={150}
            style={{ borderRadius: '50%', border: '5px solid white' }}
          />
        </div>

        {/* Form Grid 2 Kolom */}
        <Form onSubmit={formik.handleSubmit}>
          <Row className="mb-4">
            {/* Kolom Kiri: Name & E-mail */}
            <Col md={6}>
              <Form.Label style={{ color: 'white' }}>Name</Form.Label>
              <Form.Group className="mb-4">
                <Form.Control 
                  name="name" type="text"
                  value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  isInvalid={formik.touched.name && !!formik.errors.name}
                  style={{ borderRadius: '8px', height: '45px' }}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
              </Form.Group>

              <Form.Label style={{ color: 'white' }}>E-mail</Form.Label>
              <Form.Group className="mb-4">
                <Form.Control 
                  name="email" type="email"
                  value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email && !!formik.errors.email}
                  style={{ borderRadius: '8px', height: '45px' }}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Kolom Kanan: Password & Confirm Password */}
            <Col md={6}>
              <Form.Label style={{ color: 'white' }}>Password</Form.Label>
              <Form.Group className="mb-4">
                <Form.Control 
                  name="password" type="password"
                  value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  isInvalid={formik.touched.password && !!formik.errors.password}
                  placeholder="Password"
                  style={{ borderRadius: '8px', height: '45px' }}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
              </Form.Group>

              <Form.Label style={{ color: 'white' }}>Confirm Password</Form.Label>
              <Form.Group className="mb-4">
                <Form.Control 
                  name="confirmPassword" type="password"
                  value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                  placeholder="Confirm Password"
                  style={{ borderRadius: '8px', height: '45px' }}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Bio Input - Full Width */}
          <Form.Label style={{ color: 'white' }}>Bio</Form.Label>
          <Form.Group className="mb-5">
            <Form.Control 
              as="textarea" name="bio" rows={3}
              value={formik.values.bio} onChange={formik.handleChange} onBlur={formik.handleBlur}
              isInvalid={formik.touched.bio && !!formik.errors.bio}
              style={{ borderRadius: '8px' }}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.bio}</Form.Control.Feedback>
          </Form.Group>

          {/* Save Button */}
          <div className="text-center">
            <Button 
              type="submit" 
              style={{ backgroundColor: '#FFB84F', borderColor: '#FFB84F', color: 'white', padding: '10px 40px', borderRadius: '25px', fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default ProfileForm;