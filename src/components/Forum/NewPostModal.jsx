const NewPostModal = ({ show, value, onChange, onClose, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Create New Talk</h3>

        <textarea
          className="modal-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          placeholder="What's on your mind?"
        />

        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-submit" onClick={onSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;