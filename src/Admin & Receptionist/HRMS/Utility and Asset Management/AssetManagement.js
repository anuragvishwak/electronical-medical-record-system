import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../../FirebaseConfiguration";
import { FaIndianRupeeSign } from "react-icons/fa6";

function AssetManagement() {
  const [openingAssetForm, setopeningAssetForm] = useState(false);
  const [assetType, setAssetType] = useState("");
  const [assetName, setAssetName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [vendor, setVendor] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [warrantyExpiry, setWarrantyExpiry] = useState("");
  const [value, setValue] = useState("");
  const [gettingAssetDetails, setGettingAssetDetails] = useState([]);

  function addingAsset() {
    try {
      addDoc(collection(database, "utility_asset_management_database"), {
        assetName: assetName,
        assetType: assetType,
        location: location,
        status: status,
        vendor: vendor,
        purchaseDate: purchaseDate,
        warrantyExpiry: warrantyExpiry,
        value: value,
        managementType: "asset_management"
      });
      console.log("Asset document added to Firestore.");
      setopeningAssetForm(false);
    } catch (error) {
      console.error("Error during asset add:", error.message);
      throw error;
    }
  }

  async function renderingAssets() {
    const taskDetails = await getDocs(
      collection(database, "utility_asset_management_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setGettingAssetDetails(multipleArray);
  }

  useEffect(() => {
    renderingAssets();
  }, []);

  return (
    <div className="">
      {openingAssetForm && (
        <div className="border border-gray-300 p-3 rounded">
          <div className="grid grid-cols-4 gap-3">
            {/* Asset Type */}
            <div>
              <label className="block font-medium">Asset Type</label>
              <select
                name="assetType"
                onChange={(e) => {
                  setAssetType(e.target.value);
                }}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Asset</option>
                <option value="Medical Equipment">Medical Equipment</option>
                <option value="IT Equipment">IT Equipment</option>
                <option value="Furniture">Furniture</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Asset Name */}
            <div>
              <label className="block font-medium">Asset Name / Identifier</label>
              <input
                type="text"
                name="assetName"
                onChange={(e) => {
                  setAssetName(e.target.value);
                }}
                className="w-full p-2 border rounded"
                placeholder="e.g., MRI Machine, Laptop A12"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                name="location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                className="w-full p-2 border rounded"
                placeholder="e.g., ICU, Ward 3, OT 2"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block font-medium">Status</label>
              <select
                name="status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Status</option>
                <option value="In Use">In Use</option>
                <option value="In Storage">In Storage</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Disposed">Disposed</option>
              </select>
            </div>

            {/* Vendor */}
            <div>
              <label className="block font-medium">Vendor / Supplier</label>
              <input
                type="text"
                name="vendor"
                onChange={(e) => {
                  setVendor(e.target.value);
                }}
                className="w-full p-2 border rounded"
                placeholder="e.g., Philips, Dell, Local Supplier"
              />
            </div>

            {/* Purchase Date */}
            <div>
              <label className="block font-medium">Purchase Date</label>
              <input
                type="date"
                name="purchaseDate"
                onChange={(e) => {
                  setPurchaseDate(e.target.value);
                }}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Warranty Expiry */}
            <div>
              <label className="block font-medium">Warranty Expiry</label>
              <input
                type="date"
                name="warrantyExpiry"
                onChange={(e) => {
                  setWarrantyExpiry(e.target.value);
                }}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Asset Value */}
            <div>
              <label className="block font-medium">Asset Value</label>
              <input
                type="text"
                name="value"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                className="w-full p-2 border rounded"
                placeholder="e.g., $10,000"
              />
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => {
                addingAsset();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Asset
            </button>
          </div>
        </div>
      )}

      <div className="flex space-x-2 justify-end">
        <input
          placeholder="Search Assets..."
          className="border rounded border-gray-300 w-60 p-1"
        ></input>
        <button
          onClick={() => {
            setopeningAssetForm(!openingAssetForm);
          }}
          className="bg-[#1976D2] flex  hover:bg-blue-800 py-1 px-3 rounded text-white"
        >
          Add Asset
        </button>
      </div>

      <div className="border border-gray-300 rounded p-3 mt-3">
        <table className="table-auto w-full">
          <thead className="bg-gray-100 border">
            <th className="py-1">Asset Name</th>
            <th>Asset Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Purchase Date</th>
            <th>Warranty Expiry</th>
            <th>Value</th>
            <th>Vendor</th>
          </thead>
          <tbody>
            {gettingAssetDetails.filter(asset => asset.managementType === "asset_management").map((asset) => (
              <tr className="border-b text-gray-500 border-gray-300" key={asset.id}>
                <td className="text-center py-1.5">{asset.assetName}</td>
                <td className="text-center">{asset.assetType}</td>
                <td className="text-center">{asset.location}</td>
                <td className="text-center">{asset.status}</td>
                <td className="text-center">{asset.purchaseDate}</td>
                <td className="text-center">{asset.warrantyExpiry}</td>
                <td className="text-center">
                    <div className="flex items-center justify-center">
                        <FaIndianRupeeSign />
                        <p>{asset.value}/-</p>
                    </div>
                </td>
                <td className="text-center">{asset.vendor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssetManagement;
