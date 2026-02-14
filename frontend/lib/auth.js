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

export const getUserFromToken = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      userId: payload.userId,
      role: payload.role,
      username: payload.username,
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
