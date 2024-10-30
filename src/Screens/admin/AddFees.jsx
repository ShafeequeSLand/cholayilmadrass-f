import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Modal from "react-modal";
import { useAddFeesMutation, useGetFeesDataMutation } from "../../slices/adminApiSlice";

// Custom styles for the modal
Modal.setAppElement("#root");

function AddFees() {
  const { state } = useLocation();
  const [entries, setEntries] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [id, setId] = useState(state?.item || ''); // Set initial value from state
  const [newFee, setNewFee] = useState({
    id: id,
    date: "",
    month: "",
    amount: "",
    receiptNo: "",
    parentVerified: false,
    swadarVerified: false
  });
  const [errors, setErrors] = useState({});
  const { userInfo } = useSelector((state) => state.auth);

  const Verified = <img className="h-auto w-24" src="/verified.png" alt="" />;
  const Pending = <img className="h-auto w-24" src="/pending.png" alt="" />;

  // Initialize mutation hooks
  const [addFees] = useAddFeesMutation();
  const [getFeesData] = useGetFeesDataMutation();

  useEffect(() => {
    setId(state?.item);
    if (id) {
      async function getFees() {
        try {
          const res = await getFeesData(id).unwrap();
          setEntries(res.data.feesData);
          setNewFee((prev) => ({
            ...prev,
            id: id,
          }));
        } catch (error) {
          console.error("Error fetching fees data:", error);
        }
      }
      getFees();
    }
  }, [id, getFeesData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewFee((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!newFee.date) errors.date = "Date is required";
    if (!newFee.month) errors.month = "Month is required";
    if (!newFee.amount || newFee.amount <= 0) errors.amount = "Amount should be greater than 0";
    if (!newFee.receiptNo) errors.receiptNo = "Receipt number is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Only proceed if validation passes
    try {
      const response = await addFees(newFee).unwrap();
      console.log("New Fee Added:", response);
      setEntries((prev) => [...prev, newFee]);
      setModalIsOpen(false);
      setNewFee({
        date: "",
        month: "",
        amount: "",
        receiptNo: "",
        parentVerified: false,
        swadarVerified: false
      });
    } catch (error) {
      console.error("Error adding new fee:", error);
    }
  };

  return (
    <>
      {userInfo && <Header />}
      <div className="overflow-hidden flex items-start justify-center h-[100vh]" style={{ background: "#edf2f7" }}>
        <div className="max-w-5xl w-full mt-10 mb-10 p-5 bg-white rounded-xl">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Records Table</h2>
          </div>
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full bg-white border mb-10 border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Month</th>
                  <th className="border border-gray-300 px-4 py-2">Amount</th>
                  <th className="border border-gray-300 px-4 py-2">Rec.No</th>
                  <th className="border border-gray-300 px-4 py-2">Parent Verified</th>
                  <th className="border border-gray-300 px-4 py-2">Swadar Verified</th>
                </tr>
              </thead>
              <tbody>
                {entries.length > 0 ? (
                  entries.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-100 text-center">
                      <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                      <td className="border border-gray-300 px-4 py-2">{entry.month}</td>
                      <td className="border border-gray-300 px-4 py-2">{entry.amount}</td>
                      <td className="border border-gray-300 px-4 py-2">{entry.receiptNo}</td>
                      <td className="border border-gray-300 text-center px-4 py-2">{entry.parentVerified ? Verified : Pending}</td>
                      <td className="border border-gray-300 text-center px-4 py-2">{entry.swadarVerified ? Verified : Pending}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button onClick={() => setModalIsOpen(true)} className="mt-4 p-2 bg-blue-500 text-white rounded">
              Add New Fee
            </button>
          </div>
        </div>
      </div>

      {/* Modal for adding new fee */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="relative w-full max-w-md border mt-20 mx-auto bg-white rounded-lg shadow-lg p-6 md:max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Add New Fee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Date:</label>
              <input
                type="date"
                name="date"
                value={newFee.date}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Month:</label>
              <input
                type="text"
                name="month"
                value={newFee.month}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.month && <span className="text-red-500 text-sm">{errors.month}</span>}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Amount:</label>
            <input
              type="number"
              name="amount"
              value={newFee.amount}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.amount && <span className="text-red-500 text-sm">{errors.amount}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Receipt No:</label>
            <input
              type="text"
              name="receiptNo"
              value={newFee.receiptNo || ""}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.receiptNo && <span className="text-red-500 text-sm">{errors.receiptNo}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="parentVerified" className="text-sm font-medium text-gray-600">Parent Verified:</label>
              <input
                type="checkbox"
                name="parentVerified"
                checked={newFee.parentVerified}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
              />
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor="swadarVerified" className="text-sm font-medium text-gray-600">Swadar Verified:</label>
              <input
                type="checkbox"
                name="swadarVerified"
                checked={newFee.swadarVerified}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="mt-4 w-full p-2 bg-blue-500 text-white rounded">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddFees;
