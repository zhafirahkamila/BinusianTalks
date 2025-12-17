import { Button } from "react-bootstrap";

const ProfileActions = ({ isEdit, onEdit, onLogout }) => {
  return (
    <div className="d-flex justify-content-center gap-3 mt-4">
      {!isEdit ? (
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault(); // ⛔ stop form submit
            onEdit();
          }}
          style={{
            backgroundColor: "#FFB84F",
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

      <Button
        type="button"
        variant="danger"
        onClick={onLogout}
        style={{
          padding: "10px 40px",
          borderRadius: "25px",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default ProfileActions;
