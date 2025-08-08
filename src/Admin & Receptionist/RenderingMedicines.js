import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";

function RenderingMedicines() {
  const [gettingMedicines, setgettingMedicines] = useState([]);

  async function renderingMedicines() {
    const taskDetails = await getDocs(
      collection(database, "medicine_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingMedicines(multipleArray);
  }

  useEffect(() => {
    renderingMedicines();
  }, []);

  return (
    <div className="flex bg-white shadow m-3 border border-gray-300 rounded p-3 justify-center">
      <table className="table-auto w-full">
        <thead className="border border-gray-300 text-[#1976D2] bg-blue-50">
          <th className="py-1">Name</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Form</th>
          <th>Stock</th>
          <th>Expiry Date</th>
          <th>Addiitonal Details</th>
          <th>Actions</th>
        </thead>

        <tbody>
          {gettingMedicines.map((med) => (
            <tr className="text-gray-500 border-b">
              <td className="text-center py-2">{med.name}</td>
              <td className="text-center">{med.brand}</td>
              <td className="text-center">{med.category}</td>
              <td className="text-center">{med.Form}</td>
              <td className="text-center">{med.stock} units <span className="text-white py-0.5 text-sm px-1 rounded bg-black ">in stock</span></td>
              <td className="text-center">{med.expiry_date}</td>
              <td>
                <div className="flex justify-center">
                  <button className="border border-[#1976D2] text-[#1976D2] hover:bg-[#1976D2] hover:text-white py-0.5 px-2 rounded">View Details</button>
                </div>
              </td>
              <td>
                <div className="flex items-center space-x-3 justify-center">
                  <button className="text-green-500 bg-green-50 py-0.5 shadow px-2 rounded">
                    <div className="flex items-center space-x-1">
                      <FaEdit /> <p>Edit</p>
                    </div>
                  </button>

                  <button className="text-red-500 bg-red-50 py-0.5 shadow px-2 rounded">
                    <div className="flex items-center space-x-1">
                      <FaTrash />
                      <p>Delete</p>
                    </div>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RenderingMedicines;
