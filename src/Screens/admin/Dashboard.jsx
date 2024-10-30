import React, { useEffect, useState } from "react";
AdminHeader;
import {
  useGetUsersMutation,
  useDeleteUserMutation,
} from "../../slices/adminApiSlice";
import {
  setSearchResult,
  setUpdatedUser,
  setPage,
  setSearchKey,
} from "../../slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config/config";

import Swal from "sweetalert2";

import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
function Dashboard() {
  const { page, lastPage, result, searchKey } = useSelector(
    (state) => state.searchUsers
  );
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const [deleteUser] = useDeleteUserMutation();
  const [getUsers, { isLoading }] = useGetUsersMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const res = await getUsers({ page: page, key: searchKey }).unwrap();

        dispatch(setSearchResult({ ...res }));
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
        console.log(err?.data?.message || err?.error);
      }
    };
    getUsersData();
  }, [page, searchKey, isLoading]);

  const handleDelete = async (id) => {
    const responce = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (responce.isConfirmed) {
      try {
        const res = await deleteUser({ id });
        const newUsers = result.filter((item) => item._id != id);
        dispatch(setUpdatedUser([...newUsers]));
        console.log(newUsers, id);
        toast.success("User deleted successfully");
      } catch (error) {
        console.error(error);
        console.error(error);
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <>
      {adminInfo && <AdminHeader />}
      <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <header className="px-5 py-4 border-b justify-items-center border-gray-100 flex justify-between">
                <div>
                  <h2 className="font-semibold text-gray-800">Customers</h2>
                </div>
                <div>
                  <Link
                    to={"/admin/adduser"}
                    className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
                  >
                    Add User
                  </Link>
                </div>
              </header>
              <div className="p-5">
                {/* Search Bar */}
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="border border-gray-200 rounded-md px-3 py-2 w-full"
                  value={searchKey}
                  onChange={(e) => dispatch(setSearchKey(e.target.value))}
                />
              </div>
            </div>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Stantard</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Father Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Fess Add</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Delete</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">edit</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {result.map((item, index) => (
                      
                      <tr key={index}>
                        
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            {/* <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <img
                                className="rounded-full"
                                src={item.image}
                                width="40"
                                height="40"
                                style={{ maxWidth: "40px", maxHeight: "40px" }}
                                alt={item.image}
                              />
                            </div> */}
                            <div className="font-medium text-gray-800">
                              {item.name}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item.standard}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item.fatherName}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">
                        <a
                          onClick={() =>
                            navigate("/admin/addfees", {
                              state: { item: item._id },
                            })
                          }
                          className="px-5 py-2.5 font-medium bg-green-75 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
                        >
                          Add Fees
                        </a>
                      </div>

                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center">
                            <a
                              onClick={() => handleDelete(item._id)}
                              href="#_"
                              className="px-5 py-2.5 font-medium bg-red-75 hover:bg-red-100 hover:text-red-600 text-red-500 rounded-lg text-sm"
                            >
                              Delete User
                            </a>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center">
                            <a
                              onClick={() =>
                                navigate("/admin/edituser", {
                                  state: { item: item },
                                })
                              }
                              className="px-5 py-2.5 font-medium bg-green-75 hover:bg-blue-100 hover:text-green-600 text-green-500 rounded-lg text-sm"
                            >
                              Edit User
                            </a>
                          </div>
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div class="flex items-center justify-center gap-4">
                <button
                  disabled={page == 1}
                  onClick={() => dispatch(setPage(Number(page) - 1))}
                  class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    ></path>
                  </svg>
                  Previous
                </button>
                <div class="flex items-center gap-2"></div>
                <button
                  disabled={page == lastPage}
                  onClick={() => dispatch(setPage(1 + Number(page)))}
                  className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
