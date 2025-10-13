import NavbarComp from "../components/Navbar";
import "../styles/customCss.css";

const FormRegist = () => {
  return (
    <>
      <NavbarComp />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <div className="form-container">
          <h2 className="mb-5">Registration Form</h2>
          <form action="">
            <div className="mb-4">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="phone"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="major" className="form-label">
                Program Study
              </label>
              <select className="form-select" id="major" required>
                <option value="" selected disabled>
                  Select your major
                </option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
                <option value="Mobile Application and Technology">
                  Mobile Application and Technology
                </option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Gender</label>
              <br />
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="Male"
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="Female"
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
            </div>

            <div class="mb-4">
              <label htmlFor="description" class="form-label">
                Why you want to join BinusianTalks?
              </label>
              <textarea
                class="form-control"
                id="description"
                rows="3"
                placeholder="Enter you answer here"
              ></textarea>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-5">
              <button type="submit" className="btn-submit px-4">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormRegist;
