import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DropDown, HomeButton } from "../components/Common";
import { FormMessage } from "../components/Form";
import { LogoImg, NotificationIcon } from "../components/Images";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const Selected = location.pathname.split("/").pop();

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
        <LogoImg className="w-32 h-9 ml-12" />
        <div className="ml-60 flex gap-11">
          <Link to="/">
            <HomeButton label={"Home"} active />
          </Link>
          <HomeButton label={"School Schedule"} />
          <HomeButton label={"Upcoming Rides"} />
          <DropDown
            options={["Company", "Driver", "Vehicle", "Routes", "School"]}
            Selected={Selected}
            onChange={(e) => {
              // navigate(`/Masters/${e.target.value}`);
              navigate("/Masters", { state: { selected: "Company" } });
            }}
          />
          <Link to="/Contact">
            <HomeButton label={"Contact"} />
          </Link>
        </div>
        <div className="relative bg-white w-10 h-10 flex justify-center items-center rounded-full ml-24">
          <div className="w-[20px] h-[20px] bg-red-700 text-white text-xs font-bold flex justify-center items-center rounded-full absolute -top-1 -right-1">
            4
          </div>
          <NotificationIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Header;
