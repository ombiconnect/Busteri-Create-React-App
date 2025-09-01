import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ResetPassword from "./pages/Auth/ResetPassword";
import EnterOtp from "./pages/Auth/EnterOtp";
import Home from "./pages/Home/Home";
import { useState, useEffect } from "react";
import PrivateLayout from "./layout/PrivateLayout";
import Contact from "./pages/Contact/Contact";
import UpcomingRides from "./pages/UpcomingRides/UpcomingRides";
import Masters from "./pages/Masters/Masters";
import Vehicle from "./pages/Masters/Vehicle";
import Company from "./pages/Masters/Company/Company";
import Driver from "./pages/Masters/Driver";
import Schools from "./pages/Masters/Schools";
import RoutesComponent from "./pages/Masters/Routes";
import SchoolSchedules from "./pages/SchoolSchedules/SchoolSchedules";
import AddCompany from "./pages/Masters/Company/AddCompany.js";

function App() {
  const [isTokenAvailable, setIsTokenAvailable] = useState(
    !!localStorage.getItem("AUTH-STATE")
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "AUTH-STATE") {
        setIsTokenAvailable(!!event.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "AUTH-STATE") {
        setIsTokenAvailable(!!value);
      }
    };

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {isTokenAvailable ? (
            <>
              <Route element={<PrivateLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/*" element={<Navigate replace to="/" />} />
                <Route path="/Masters" element={<Masters />}>
                  <Route path="*" element={<Company />} />
                  <Route path="Driver" element={<Driver />} />
                  <Route path="Vehicle" element={<Vehicle />} />
                  <Route path="Routes" element={<RoutesComponent />} />
                  <Route path="School" element={<Schools />} />
                </Route>
                <Route path="/Contact" element={<Contact />} />
                <Route path="/UpcomingRides" element={<UpcomingRides />} />
                <Route path="/SchoolSchedules" element={<SchoolSchedules />} />
                <Route path="/AddCompany" element={<AddCompany />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/*" element={<Navigate replace to="/login" />} />
            </>
          )}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/enter-otp" element={<EnterOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
