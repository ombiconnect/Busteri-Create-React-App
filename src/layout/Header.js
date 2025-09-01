import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DropDown, HomeButton } from "../components/Common";
import { FormMessage } from "../components/Form";
import { LogoImg } from "../components/Images";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const Selected = location.pathname.split("/").pop();
  const isMastersActive = location.pathname.startsWith("/Masters");

  return (
    <div className="bg-black">
      <div className="flex justify-end pt-3 pb-3 pr-14 gap-5">
        <FormMessage
          message={"Terms and Policies"}
          className="cursor-pointer text-white"
        />
        <FormMessage
          message={"Logout"}
          className="cursor-pointer text-white"
          onClick={() => {
            navigate("/logout");
          }}
        />
      </div>
      <div className="flex items-center  pt-8 pb-8">
        <NavLink to="/">
          <LogoImg className="w-32 h-9 ml-12" />
        </NavLink>
        <div className="ml-60 flex gap-11">
          <NavLink to="/">
            {({ isActive }) => <HomeButton label="Home" active={isActive} />}
          </NavLink>
          <NavLink to="/SchoolSchedules">
            {({ isActive }) => (
              <HomeButton label="School Schedule" active={isActive} />
            )}
          </NavLink>
          <NavLink to="/UpcomingRides">
            {({ isActive }) => (
              <HomeButton label="Upcoming Rides" active={isActive} />
            )}
          </NavLink>
          <DropDown
            options={["Company", "Driver", "Vehicle", "Routes", "School"]}
            className="text-white bg-transparent "
            Selected={Selected}
            onChange={(e) => {
              navigate(`/Masters/${e.target.value}`);
              // navigate("/Masters", { state: { selected: "Company" } });
            }}
          />
          <NavLink to="/Contact">
            {({ isActive }) => (
              <HomeButton label="Contract" active={isActive} />
            )}
          </NavLink>
        </div>
        {/* <div className="relative bg-white w-10 h-10 flex justify-center items-center rounded-full ml-24">
          <div className="w-[20px] h-[20px] bg-red-700 text-white text-xs font-bold flex justify-center items-center rounded-full absolute -top-1 -right-1">
            4
          </div>
          <NotificationIcon className="w-4 h-4" />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
