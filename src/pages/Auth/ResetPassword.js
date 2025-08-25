import { FormHeader, InputField, SubmitButton } from "../../components/Form.js";
const ResetPassword = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center px-14 py-10 w-[492px] h-[348px] bg-white border border-[#EEEEEE] rounded-[14px] shadow-sm">
        <FormHeader title="Reset Password" className="mt-2" />
        <InputField placeholder="name@Busteri.com" className="mt-4" />
        <SubmitButton text="Done" className="mt-7" />
      </div>
    </div>
  );
};

export default ResetPassword;
