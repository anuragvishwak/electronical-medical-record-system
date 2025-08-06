import React from "react";
import { LuLogOut } from "react-icons/lu";

function InsuranceStaffNavbar() {
  return (
    <div className="flex items-center border-b justify-between p-3">
      <div className="flex items-center space-x-3">
        <button>Home</button>
        <button>View Insurance Info</button>
        <button>Claim Status</button>
        <button>Profile / Setting</button>
      </div>
      <button>
        <LuLogOut />
      </button>
    </div>
  );
}

export default InsuranceStaffNavbar;
