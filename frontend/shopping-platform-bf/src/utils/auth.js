export const requireAuth = (user, navigate) => {
  if (!user) {
    navigate("/login");
    return false;
  }
  return true;
};