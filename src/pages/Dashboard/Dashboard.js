import { useEffect, useState } from "react";
import { UserDetails } from "../../utils/Auth";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = localStorage.getItem("ID");
        if (!id) {
          navigate("/login");
        }
        const response = await UserDetails(id);
        setUser(response);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="bg-black ">
      <div className="ml-20 mt-16 inline-block w-[340px]  mb-[107px]">
        <div className="flex flex-col">
          <span className="text-[#00B3D1] font-semibold text-5xl">
            Welcome Back,
          </span>
          <span className="font-semibold text-4xl text-white">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </span>
          <div className="mt-3">
            <span className="size-3 text-white ">
              Get daily activity overview quickly with Busteri and navigate your
              day with ease.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
