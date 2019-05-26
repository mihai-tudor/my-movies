export const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const isValidPassword = (pass) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,20}$/;
  return re.test(pass);
};

export const isValidUsername = (user) => {
  const re = /^[a-z][a-z0-9._-]{3,16}$/i;
  return re.test(user);
};
