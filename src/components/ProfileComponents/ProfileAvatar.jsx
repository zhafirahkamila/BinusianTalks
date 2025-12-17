import { Button } from "react-bootstrap";

const ProfileAvatar = ({ preview, isEdit, onChange }) => {
  return (
    <div className="text-center mb-5">
      <img
        src={preview}
        alt="User Avatar"
        width={150}
        height={150}
        className="rounded-circle border border-5 border-white object-fit-cover"
      />

      {isEdit && (
        <>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={onChange}
            hidden
          />
          <div className="image">
            <Button
              as="label"
              htmlFor="profileImage"
              size="sm"
              variant="light"
              className="fw-semibold mt-3"
            >
              Change Photo
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileAvatar;
