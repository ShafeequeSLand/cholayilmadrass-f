import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { BarLoader } from "react-spinners";
import { useGetFeesUserMutation, useVerifyFeesMutation } from "../slices/usersApiSlice";

function FeesTable() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const [getFeesdata] = useGetFeesUserMutation();
  const [verifyFees] = useVerifyFeesMutation();

  const Verified = <img className="h-auto w-24" src="/verified.png" alt="Verified" />;
  const Pending = <img className="h-auto w-24 cursor-pointer" src="/pending.png" alt="Pending" />;

  useEffect(() => {
    const fetchFeesData = async () => {
      setLoading(true)
      if (!userInfo) return;

      try {
        const res = await getFeesdata(userInfo._id).unwrap();
        setEntries(res?.data?.feesData || []);
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch fees data:", error);
      }
    };

    fetchFeesData();
  }, [userInfo, getFeesdata]);

  const handleVerify = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to verify this fee?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, verify it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const response = await verifyFees({ id, userId: userInfo._id }).unwrap();
        Swal.fire('Verified!', 'The fee has been verified.', 'success');

        // Update local state to reflect verification
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry._id === id ? { ...entry, parentVerified: true } : entry
          )
        );
      } catch (error) {
        console.error("Verification failed:", error);
        Swal.fire('Error', 'Failed to verify the fee.', 'error');
      }
    }
  };

  return (
    <>
      {userInfo && <Header />}

      {loading ?(
        <div className="w-[100vw] h-[100vh] flex justify-center items-center  ">
          <BarLoader />
        </div>):(
    
      <div className="overflow-hidden flex items-start justify-center  min-h-[100vh]" style={{ background: "#edf2f7" }}>
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
                  <th className="border border-gray-300 px-1 py-1">Rec.No	</th>
                  <th className="border border-gray-300 px-1 py-1">Parent Verified</th>
                  <th className="border border-gray-300 px-1 py-1">Swadar Verified</th>
                </tr>
              </thead>
              <tbody>
                {entries.length > 0 ? (
                  entries.map((entry, index) => (
                    <tr key={entry._id || index} className="hover:bg-gray-100 text-center">
                      <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                      <td className="border border-gray-300 px-4 py-2">{entry.month}</td>
                      <td className="border border-gray-300 px-4 py-2">{entry.amount}</td>
                      <td className="border border-gray-300 px-4 py-2">{entry.receiptNo}</td>
                      <td className="border border-gray-300 text-center px-4 py-2">
                        {entry.parentVerified ? (
                          Verified
                        ) : (
                          <div className="" onClick={() => handleVerify(entry._id)}>{Pending}</div>
                        )}
                      </td>
                      <td className="border border-gray-300 text-center px-4 py-2">
                        {entry.swadarVerified ? Verified : Pending}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        )}
    </>
  );
}

export default FeesTable;
