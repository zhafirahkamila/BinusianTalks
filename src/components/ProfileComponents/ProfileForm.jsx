import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ConfirmLogoutModal from "../ConfirmLogoutModal";
import ProfileAvatar from "./ProfileAvatar";
import ProfileFields from "./ProfileFields";
import ProfileActions from "./ProfileActions";

const ProfileForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("/assets/images/gwen.jpg");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("https://binusiantalks-api-production.up.railway.app/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            // "ngrok-skip-browser-warning": "true"
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Failed to fetch profile");
          return;
        }

        setForm({
          name: data.username || "",
          email: data.email || "",
          password: "",
          bio: data.bio || "",
        });

        setPreview(
          data.profileImage ? `https://binusiantalks-api-production.up.railway.app${data.profileImage}` : "/assets/images/gwen.jpg"
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔑 hapus auth
    navigate("/login", { replace: true }); // 🚀 redirect
  };

  const handleSave = async (e) => {
  e.preventDefault();
  if (!isEdit) return;

  const token = localStorage.getItem("token");
  const formData = new FormData();

  formData.append("username", form.name);
  formData.append("bio", form.bio);
  if (form.password) formData.append("password", form.password);
  if (image) formData.append("profileImage", image);

  try {
    const res = await fetch(
      "https://binusiantalks-api-production.up.railway.app/api/user/profile",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Update failed:", data);
      alert("Failed to update profile");
      return;
    }

    if (data.updateUser?.profileImage) {
      setPreview(
        `https://binusiantalks-api-production.up.railway.app${data.updateUser.profileImage}?t=${Date.now()}`
      );
    }

    alert("Profile updated successfully");
    setIsEdit(false);
    setImage(null);
    setForm({ ...form, password: "" });

  } catch (err) {
    console.error("Save profile error:", err);
    alert("Something went wrong");
  }
};

  /* ================= UI ================= */
  return (
    <>
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
          {/* PROFILE IMAGE */}
          <ProfileAvatar
            preview={preview}
            isEdit={isEdit}
            onChange={handleImageChange}
          />

          <Form>
            <ProfileFields
              form={form}
              isEdit={isEdit}
              onChange={handleChange}
            />

            <ProfileActions
              isEdit={isEdit}
              onEdit={() => setIsEdit(true)}
              onSave={handleSave}
              onLogout={() => setShowLogoutModal(true)}
            />
            ;
          </Form>
        </div>
      </Container>

      <ConfirmLogoutModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default ProfileForm;
