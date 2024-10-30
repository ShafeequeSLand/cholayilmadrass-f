
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config/config";
import Header from "../components/Header";
function ProflieScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo && <Header />}
      <div className="max-w-md mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg mt-16 bg-white shadow-xl rounded-lg text-gray-900">
      {/* Header Image */}
      <div className="rounded-t-lg h-36 overflow-hidden">
        <img
          className="object-cover object-top w-full h-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
        />
      </div>

      {/* Profile Image */}
      <div className="mx-auto w-24 h-24 relative -mt-12 border-4 border-white rounded-full overflow-hidden">
        <img
          className="object-cover object-center w-full h-full"
          src="/profile.jpg"
          alt="Profile"
        />
      </div>

      {/* User Info */}
      <div className="text-center mt-4 space-y-2">
        <h2 className="font-bold text-xl sm:text-2xl">{userInfo.name}</h2>
        <p className="text-gray-600 text-sm">{userInfo.username}</p>
        <div className="text-gray-500 space-y-1 text-sm sm:text-base">
          <p>{userInfo.standard}</p>
          <p>{userInfo.fatherName}</p>
          <p>{userInfo.phone}</p>
          <p>{userInfo.address}</p>
        </div>
      </div>

      {/* Button Section */}
      <div className="p-4 border-t mx-8 mt-4 text-center">
        <Link to="/feesdeatails">
          <button className="w-full sm:w-1/2 rounded-full bg-gray-900 hover:bg-gray-700 font-semibold text-white px-4 py-2">
            Fees Details
          </button>
        </Link>
      </div>
    </div>
    </>
  );
}

export default ProflieScreen;
