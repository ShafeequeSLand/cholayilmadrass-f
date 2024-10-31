import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Modal from "react-modal";
import { useAddFeesMutation, useGetFeesDataMutation } from "../../slices/adminApiSlice";
import { BarLoader } from "react-spinners";
// Custom styles for the modal
Modal.setAppElement("#root");

function AddFees() {
  const { state } = useLocation();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitloading, setSubmitLoading] = useState(false);
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
        setLoading(true)
        try {
          const res = await getFeesData(id).unwrap();
          setEntries(res.data.feesData);
          setNewFee((prev) => ({
            ...prev,
            id: id,
          }));
          setLoading(false)
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
    setSubmitLoading(true)
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
      setSubmitLoading(false)
    } catch (error) {
      console.error("Error adding new fee:", error);
    }
  };

  return (
    <>
      {userInfo && <Header />}
      {loading ?(
        <div className="w-[100vw] h-[100vh] flex justify-center items-center  ">
          <BarLoader />
        </div>):(
      <div className="overflow-hidden flex items-start justify-center min-h-[100vh]" style={{ background: "#edf2f7" }}>
        <div className="max-w-5xl w-full mt-10 mb-10 p-5 bg-white rounded-xl">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Records Table</h2>
          </div>
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full bg-white border mb-10 border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-1 py-1">Date</th>
                  <th className="border border-gray-300 px-1 py-1">Month</th>
                  <th className="border border-gray-300 px-1 py-1">Amount</th>
                  <th className="border border-gray-300 px-1 py-1">Rec.No</th>
                  <th className="border border-gray-300 px-1 py-1">Parent Verified</th>
                  <th className="border border-gray-300 px-1 py-1">Swadar Verified</th>
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
           <div className="flex justify-center">
           <button onClick={() => setModalIsOpen(true)} className="mt-4 p-2 bg-blue-500 text-white rounded">
              Add New Fee
            </button>
           </div>
          </div>
        </div>
      </div>
)}
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
        <select
          name="month"
          value={newFee.month}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
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
        type="number"
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
      {!submitloading ? (
        <button type="submit" className="mt-4 w-full p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      ) : (
        <div className="mt-4 w-full p-2 bg-blue-500 text-white rounded">
          Loading...
        </div>
      )}
    </div>
  </form>
</Modal>

    </>
  );
}

export default AddFees;
