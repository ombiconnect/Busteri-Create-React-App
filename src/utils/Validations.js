export const LoginValidation = (email, password) => {
  var checkEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  var checkPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );
  if (!checkEmail) {
    return "Invalid Email";
  }
  if (!checkPassword) {
    return "Password Invalid";
  }

  return true;
};
