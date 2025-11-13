import React, { useEffect, useState } from "react";
import AddItems from "./AddItems";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../FirebaseConfiguration";
import { GrNotes } from "react-icons/gr";

function AdvancedInvestoryManagement() {
  const [openingAddItemForm, setopeningAddItemForm] = useState(false);
  const [capturingRemarks, setcapturingRemarks] = useState("");
  const [openingRemarks, setopeningRemarks] = useState(false);

  const [gettingItems, setgettingItems] = useState([]);

  async function renderingItems() {
    const taskDetails = await getDocs(
      collection(database, "advanced_inventory_management_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingItems(multipleArray);
  }

  useEffect(() => {
    renderingItems();
  }, []);

  return (
    <div>
      <div className="flex items-center space-x-2 my-3 justify-between">
        <p className="text-lg text-[#003441] font-semibold ">Advanced Inventory Management</p>
     <div className="flex items-center space-x-3">
         <input
          placeholder="Search Items...."
          className="py-0.5 px-2  border border-gray-400"
        ></input>
        <button
          onClick={() => {
            setopeningAddItemForm(!openingAddItemForm);
          }}
          className="bg-[#003441] border-[#003441] text-sm text-white py-1 px-4"
        >
          + Add Item
        </button>
     </div>
      </div>

      {openingAddItemForm && (
        <AddItems
          renderingItems={renderingItems}
          setopeningAddItemForm={setopeningAddItemForm}
        />
      )}

      <div className="border border-gray-300 p-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 text-text-[#003441] border">
            <tr>
              <th className="py-1">Name</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Quantity</th>
              <th>Vendor</th>
              <th>Remarks</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {gettingItems.map((item) => (
              <tr className="border-b text-[#01B49C] border-gray-300">
                <td className="text-center py-1.5">{item.name}</td>
                <td className="text-center">{item.category}</td>
                <td className="text-center">{item.subCategory}</td>
                <td className="text-center">{item.quantity} pcs</td>
                <td className="text-center">{item.vendor}</td>
                <td>
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        setopeningRemarks(true);
                        setcapturingRemarks(item);
                      }}
                      className="border border-[#003441] text-[#003441] hover:bg-[#003441] hover:text-white px-1"
                    >
                      View
                    </button>
                  </div>
                </td>
                <td className="text-center">{item.purchaseDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      

      {openingRemarks && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 shadow-lg w-96">
            <div className="flex itesm-center justify-between mb-3">
              <div className="flex items-center space-x-1">
                <GrNotes size={18} className="text-[#1976D2]" />
                <p className="text-[#1976D2] font-semibold text-xl">
                 Remarks
                </p>
              </div>

              <button
                onClick={() => setopeningRemarks(false)}
                className="font-semibold text-red-500"
              >
                Close
              </button>
            </div>
            <p>{capturingRemarks.remarks}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdvancedInvestoryManagement;
