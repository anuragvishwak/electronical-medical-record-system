import React from "react";
import { LuLogOut } from "react-icons/lu";

function AdminNavbar() {
  return (
    <div className="flex items-center border-b justify-between p-3">
      <div className="flex items-center space-x-3">
        <button>Home</button>
        <button>Patient</button>
        <button>Appointment</button>
        <button>Billing & Payment</button>
        <button>Insurance Coordination</button>
        <button>Staff Management</button>
        <button>Profile / Setting</button>
      </div>
      <div className="flex items-center space-x-2">
        <button>Notify</button>
        <button>
          <LuLogOut />
        </button>
      </div>
    </div>
  );
}

export default AdminNavbar;
