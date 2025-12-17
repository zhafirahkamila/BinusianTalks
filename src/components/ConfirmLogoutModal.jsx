import { Modal, Button } from "react-bootstrap";

const ConfirmLogoutModal = ({ show, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>

      <Modal.Body>Are you sure you want to log out?</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Log Out
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmLogoutModal;
