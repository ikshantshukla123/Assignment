export const saveToken = (token) => {
  localStorage.setItem("token", token);
document.cookie = `token=${token}; path=/`;
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  document.cookie = "token=; path=/; max-age=0";
};
