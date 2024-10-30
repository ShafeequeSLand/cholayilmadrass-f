import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import PrivateRoute from "./components/PrivateRoute.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import "./index.css";
import LoginScreen from "./Screens/LoginScreen.jsx";
import RegisterScreen from "./Screens/RegisterScreen.jsx";
import ProflieScreen from "./Screens/ProflieScreen.jsx";
import Header from "./components/Header.jsx";
//admin
import LoginScreeAdmin from "./Screens/admin/LoginScreeAdmin.jsx";
import Dashboard from "./Screens/admin/Dashboard.jsx";
import RegisterScreenAdmin from "./Screens/admin/RegisterScreenAdmin.jsx";
import UpdateScreenAdmin from "./Screens/admin/UpdateScreenAdmin.jsx";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin.jsx";
import FeesTable from "./Screens/FeesTable.jsx";
import AddFees from "./Screens/admin/AddFees.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route element={<PrivateRoute />}>
          <Route index={true} path="/" element={<ProflieScreen />} />
          <Route index={true} path="/feesdeatails" element={<FeesTable />} />
        </Route>
        <Route index={true} path="/login" element={<LoginScreen />} />
        <Route index={true} path="/signup" element={<RegisterScreen />} />
      </Route>
      <Route path="/admin" element={<App />}>
        <Route element={<PrivateRouteAdmin />}>
          <Route
            index={true}
            path="/admin/edituser"
            element={<UpdateScreenAdmin />}
          />
              <Route
            index={true}
            path="/admin/addfees"
            element={<AddFees />}
          />

          <Route index={true} path="/admin/dashboard" element={<Dashboard />} />
        </Route>

        <Route
          index={true}
          path="/admin/adduser"
          element={<RegisterScreenAdmin />}
        />
        <Route index={true} path="/admin/login" element={<LoginScreeAdmin />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
