import { FaSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-white shadow-sm py-3 sticky-top">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        
        {/* Brand */}
        <Link className="navbar-brand mb-2 mb-md-0" to="/">
          <h4 className="fw-bold text-primary m-0">Jotter</h4>
        </Link>

        {/* Search Bar */}
        <form className="flex-grow-1 d-flex justify-content-center mb-2 mb-md-0">
          <div className="input-group input-group-sm rounded-pill overflow-hidden w-100 w-md-75 shadow-sm">
            <input
              className="form-control border-0"
              type="search"
              placeholder="Search notes..."
              aria-label="Search"
            />
            <button className="btn btn-primary px-3" type="submit">
              Search
            </button>
          </div>
        </form>

        {/* Add Notes Button */}
        <Link to="/add-notes" style={{ textDecoration: "none" }}>
          <button className="btn btn-primary btn-md d-flex align-items-center gap-2 shadow-sm">
            <FaSquarePlus /> Add Notes
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
