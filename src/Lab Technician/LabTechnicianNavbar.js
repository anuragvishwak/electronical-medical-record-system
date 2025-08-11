import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function LabTechnicianNavbar() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center border-b justify-between p-3">
      <div className="flex items-center space-x-3">
        <button>Home</button>
        <button>Assigned Lab Orders</button>
        <button>Upload Test Results</button>
        <button>Profile / Setting</button>
      </div>
      <div className="flex items-center space-x-2">
        <button>Notify</button>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          <LuLogOut />
        </button>
      </div>
    </div>
  );
}

export default LabTechnicianNavbar;
