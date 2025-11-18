export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  if (storedUser && storedToken) {
    return {
      user: JSON.parse(storedUser),
      token: storedToken
    };
  }

  return false;
};
