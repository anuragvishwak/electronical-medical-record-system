import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { IoNotifications } from "react-icons/io5";
import OperationTheatreSchedulling from "./HRMS/Facility ad Infrastructure/OperationTheatreSchedulling";
import AddBillingPaymentForm from "./AddBillingPaymentForm";

function AdminBillingPayment() {


  return (
    <div className="bg-gray-100 h-screen">
      <AdminNavbar />
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl text-[#212a31] font-bold">Billing & Payment</p>
          <p className="text-[#196d8e]">
           Admin can add and manage <span className="text-[#212a31] font-semibold">Billing</span> and <span className="text-[#212a31] font-semibold">Payment</span> history.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Billing & Payment..."
            className="border border-gray-400 w-60 p-1 rounded"
          ></input>
          <button>
            <IoNotifications
              size={31}
              className="border border-gray-500 p-1 rounded text-gray-500"
            />
          </button>
        </div>
      </div>
      <div></div>


      
    </div>
  );
}

export default AdminBillingPayment;
