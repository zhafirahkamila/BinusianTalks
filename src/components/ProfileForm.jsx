import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import gwen from "../assets/images/gwen.jpg";

const ProfileForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  // 🔹 AMBIL DATA USER DARI MONGODB
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5050/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setForm({
        name: data.username,
        email: data.email,
        password: "",
        bio: data.bio || "",
      });
    };

    fetchProfile();
  }, []);

  // 🔹 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 SAVE PROFILE
  const handleSave = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch("http://localhost:5050/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: form.name,
        bio: form.bio,
        password: form.password || undefined,
      }),
    });

    alert("Profile updated successfully");
    setIsEdit(false);
    setForm({ ...form, password: "" });
  };

  return (
    <Container className="d-flex flex-column align-items-center mb-5">
      <div
        className="p-5 w-100 shadow"
        style={{
          maxWidth: "800px",
          backgroundColor: "#137EB4",
          borderRadius: "15px",
          marginTop: "30px",
        }}
      >
        <div className="text-center mb-5">
          <img
            src={gwen}
            alt="User Avatar"
            width={150}
            height={150}
            style={{ borderRadius: "50%", border: "5px solid white" }}
          />
        </div>

        <Form onSubmit={handleSave}>
          <Row className="mb-4">
            {/* LEFT */}
            <Col md={6}>
              <Form.Label style={{ color: "white" }}>Name</Form.Label>
              <Form.Group className="mb-4">
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={!isEdit}
                  style={{ borderRadius: "8px", height: "45px" }}
                />
              </Form.Group>

              {/* <Form.Label style={{ color: "white" }}>E-mail</Form.Label>
              <Form.Group className="mb-4">
                <Form.Control
                  value={form.email}
                  disabled
                  style={{ borderRadius: "8px", height: "45px" }}
                />
              </Form.Group> */}
            </Col>

            {/* RIGHT */}
            <Col md={6}>
              <Form.Label style={{ color: "white" }}>E-mail</Form.Label>
              <Form.Group className="mb-4">
                <Form.Control
                  value={form.email}
                  disabled
                  style={{ borderRadius: "8px", height: "45px" }}
                />
              </Form.Group>

              {/* <Form.Label style={{ color: "white" }}>New Password</Form.Label>
              <Form.Group className="mb-4">
                <Form.Control
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  disabled={!isEdit}
                  placeholder="Password"
                  style={{ borderRadius: "8px", height: "45px" }}
                />
              </Form.Group> */}
            </Col>
          </Row>

          {/* BIO */}
          <Form.Label style={{ color: "white" }}>Bio</Form.Label>
          <Form.Group className="mb-5">
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={form.bio}
              onChange={handleChange}
              disabled={!isEdit}
              style={{ borderRadius: "8px" }}
            />
          </Form.Group>

          {/* BUTTON */}
          <div className="text-center">
            {!isEdit ? (
              <Button
                type="button"
                onClick={() => setIsEdit(true)}
                style={{
                  backgroundColor: "#FFB84F",
                  borderColor: "#FFB84F",
                  color: "white",
                  padding: "10px 40px",
                  borderRadius: "25px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Edit
              </Button>
            ) : (
              <Button
                type="submit"
                style={{
                  backgroundColor: "#FFB84F",
                  borderColor: "#FFB84F",
                  color: "white",
                  padding: "10px 40px",
                  borderRadius: "25px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Save
              </Button>
            )}
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default ProfileForm;