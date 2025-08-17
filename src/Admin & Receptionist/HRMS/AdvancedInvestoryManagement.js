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
      <div className="flex items-center space-x-2 my-3 justify-end">
        <input
          placeholder="Search Items...."
          className="p-0.5 border border-gray-400 rounded"
        ></input>
        <button
          onClick={() => {
            setopeningAddItemForm(!openingAddItemForm);
          }}
          className="bg-[#1976D2] border hover:text-white hover:bg-[#1976D2] border-[#1976D2] text-sm text-white py-1 px-4 rounded"
        >
          + Add Item
        </button>
      </div>

      <div className="border border-gray-300 rounded p-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border">
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
              <tr className="border-b text-gray-500 border-gray-300">
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
                      className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-1 rounded"
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

      {openingAddItemForm && (
        <AddItems
          renderingItems={renderingItems}
          setopeningAddItemForm={setopeningAddItemForm}
        />
      )}

      {openingRemarks && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg w-96">
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
