import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("AUTH-STATE");
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
