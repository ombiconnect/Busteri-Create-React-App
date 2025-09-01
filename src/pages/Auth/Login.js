import { useRef, useState } from "react";
import {
  FormHeader,
  InputField,
  PasswordField,
  CheckboxField,
  SubmitButton,
  FormMessage,
} from "../../components/Form.js";
import { LogoImg } from "../../components/Images.js";
import { LoginValidation } from "../../utils/Validations.js";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../utils/Auth.js";

const Login = () => {
  const [error, setError] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [InputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (fieldName, value) => {
    setInputData((prev) => ({ ...prev, [fieldName]: value }));
  };
  const handleLogin = async () => {
    const isValid = LoginValidation(InputData.email, InputData.password);
    if (isValid != true) {
      setError(isValid);
      return;
    }
    const response = await userLogin({
      email: InputData.email,
      password: InputData.password,
    });
    if (response?.status == 200 || response?.status == 201) {
      localStorage.setItem("AUTH-STATE", response.data.token);
      localStorage.setItem("ID", response.data.id);
      navigate("/");
    } else {
      if (response?.response?.data?.errors["Password|Email"]) {
        setError(response?.response?.data?.errors["Password|Email"][0]);
      } else {
        setError("Something went wrong..!!");
      }
    }
  };

  return (
    <div className="flex ">
      <div className="w-6/12 h-screen bg-img">
        <div className="flex flex-col items-center justify-end text-center text-white mx-28 pb-28 h-full">
          <h1 className="text-3xl font-semibold">
            Making school transport smoother, safer, and smarter
          </h1>
          <span className="text-xs mt-3 font-light">
            Copyright © 2023 Busteri. All rights reserved.
          </span>
        </div>
      </div>

      <div className="w-6/12">
        <div className="flex flex-col mx-40 mt-40">
          <LogoImg className="h-10 w-32 mt-3" />
          <FormHeader title="Login" className="mt-2" />
          <InputField
            // ref={emailRef}
            value={InputData.email}
            placeholder="name@Busteri.com"
            className="mt-4"
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <PasswordField
            placeholder="Password"
            ref={passwordRef}
            className="mt-4"
            value={InputData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <FormMessage
            message={error}
            className="cursor-pointer text-red-600"
          />
          <div className="flex justify-between mt-4">
            <CheckboxField label="Remember me" />
            {/* <Link to="/reset-password"> */}
            <FormMessage
              message={"Forgot password?"}
              className="cursor-pointer"
            />
            {/* </Link> */}
          </div>
          <SubmitButton text="Login" className="mt-7" onClick={handleLogin} />

          <FormMessage
            message={"Customer support: Customersupport@busteri.com"}
            className="mt-7"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
