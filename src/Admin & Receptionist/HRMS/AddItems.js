import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { database } from "../../FirebaseConfiguration";

function AddItems({ setopeningAddItemForm, renderingItems }) {
  const [selectedCategory, setselectedCategory] = useState("");
  const [selectedSubCategory, setselectedSubCategory] = useState("");
  const [name, setname] = useState("");
  const [quantity, setquantity] = useState("");
  const [vendor, setvendor] = useState("");
  const [purchaseDate, setpurchaseDate] = useState("");
  const [remarks, setremarks] = useState("");

  function AddItems() {
    try {
      addDoc(collection(database, "advanced_inventory_management_database"), {
        category: selectedCategory,
        subCategory: selectedSubCategory,
        name: name,
        quantity: quantity,
        vendor: vendor,
        purchaseDate: purchaseDate,
        remarks: remarks,
      });

      console.log("Medicine added to Firestore.");
      setopeningAddItemForm(false);
      renderingItems();
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  }

  const categories = [
    "Office Supplies",
    "Housekeeping Items",
    "Kitchen & Cafeteria Stock",
    "Laundry Supplies",
  ];

  const subcategories = {
    "Office Supplies": [
      "Stationery (Pens, Registers, Files)",
      "Documentation Paper (Forms, A4 Sheets)",
      "Printers & Cartridges",
    ],
    "Housekeeping Items": [
      "Cleaning Agents (Detergents, Disinfectants)",
      "Sanitizers & Surface Cleaners",
      "Gloves & Masks (Non-patient Supply)",
      "Waste Bags & Bins",
    ],
    "Kitchen & Cafeteria Stock": [
      "Food Grains & Vegetables",
      "Beverages (Tea, Coffee, Juice)",
      "Disposable Plates & Cutlery",
    ],
    "Laundry Supplies": [
      "Bedsheets & Pillow Covers",
      "Blankets & Towels",
      "Detergents & Washing Chemicals",
    ],
  };

  return (
    <div className="border border-gray-300 mt-5 p-4 rounded">
      <p className="text-[#003441] text-xl font-bold">Add Item</p>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="font-semibold text-[#01B49C]">Category</p>
          <select
            value={selectedCategory}
            onChange={(e) => setselectedCategory(e.target.value)}
            className="border rounded border-gray-300 w-full p-1.5"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="font-semibold text-[#01B49C]">Sub Category</p>
          <select
            onChange={(e) => {
              setselectedSubCategory(e.target.value);
            }}
            disabled={!selectedCategory}
            className="border rounded border-gray-300 w-full p-1.5"
          >
            <option className="" value="">
              -- Select Subcategory --
            </option>
            {selectedCategory &&
              subcategories[selectedCategory].map((sub, i) => (
                <option key={i} value={sub}>
                  {sub}
                </option>
              ))}
          </select>
        </div>

        <div>
          <p className="font-semibold text-[#01B49C]">Name</p>
          <input
            type="text"
            onChange={(e) => {
              setname(e.target.value);
            }}
            placeholder="Pens"
            className="border rounded border-gray-300 w-full p-1.5"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 my-3">
        <div>
          <p className="font-semibold text-[#01B49C]">Quantity</p>
          <input
            type="number"
            onChange={(e) => {
              setquantity(e.target.value);
            }}
            placeholder="100 pcs"
            className="border rounded border-gray-300 w-full p-1.5"
          />
        </div>

        <div>
          <p className="font-semibold text-[#01B49C]">Vendor</p>
          <input
            type="text"
            onChange={(e) => {
              setvendor(e.target.value);
            }}
            placeholder="Camblin"
            className="border rounded border-gray-300 w-full p-1.5"
          />
        </div>

        <div>
          <p className="font-semibold text-[#01B49C]">Purchase Date</p>
          <input
            type="date"
            onChange={(e) => {
              setpurchaseDate(e.target.value);
            }}
            className="border rounded border-gray-300 w-full p-1.5"
          />
        </div>
      </div>
      <div>
        <p className="font-semibold text-[#01B49C]">
          Remarks / Additional Notes
        </p>
        <textarea
          type="text"
          onChange={(e) => {
            setremarks(e.target.value);
          }}
          placeholder="Pen's quality are good!!!"
          className="border rounded h-32 border-gray-300 w-full p-1.5"
        />
      </div>

      <div className="flex justify-end mt-3">
        <button
          onClick={() => {
            AddItems();
          }}
          className="bg-[#003441] border hover:text-white hover:bg-[#003441] border-[#003441] text-white py-1 px-4 rounded"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
}

export default AddItems;
