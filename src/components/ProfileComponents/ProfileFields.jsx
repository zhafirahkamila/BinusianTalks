import { Row, Col, Form } from "react-bootstrap";

const ProfileFields = ({ form, isEdit, onChange }) => {
  return (
    <>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Label style={{ color: "white" }}>Username</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={onChange}
            disabled={!isEdit}
            className="mb-4"
          />
        </Col>

        <Col md={6}>
          <Form.Label style={{ color: "white" }}>E-mail</Form.Label>
          <Form.Control value={form.email} disabled />
        </Col>
      </Row>

      <Form.Label style={{ color: "white" }}>Bio</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        name="bio"
        value={form.bio}
        onChange={onChange}
        disabled={!isEdit}
        className="mb-5"
      />
    </>
  );
};

export default ProfileFields;
