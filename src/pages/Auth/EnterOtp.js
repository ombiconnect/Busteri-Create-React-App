import {
  FormHeader,
  FormMessage,
  InputField,
  PasswordField,
  SubmitButton,
} from "../../components/Form.js";
const EnterOtp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center px-14 py-10 w-[492px] h-[348px] bg-white border border-[#EEEEEE] rounded-[14px] shadow-sm">
        <FormHeader title="Enter OTP" className="mt-2" />
        <PasswordField placeholder="OTP" className="mt-4" />
        <FormMessage
          message={"OTP Will Expire In 01:30 Sec"}
          className="mt-2"
        />
        <SubmitButton text="Done" className="mt-7" />
        <FormMessage
          message={"Did not receive OPT? Resent OTP"}
          className="mt-4 flex justify-center cursor-pointer"
        />
      </div>
    </div>
  );
};

export default EnterOtp;
