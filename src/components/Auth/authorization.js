export function authorization(
  isAdmin,
  checkAdminUser,
  checkRegularUser,
  isRegularAuth,
  setAuth
) {
  if (isRegularAuth) {
    // console.log("Regular auth success");
    setAuth(true);
  } else if (isAdmin && localStorage.getItem("token")) {
    // console.log("Admin auth attempt");
    checkAdminUser();
  } else if (localStorage.getItem("token")) {
    // console.log("Regular auth attempt");
    checkRegularUser();

  }
}
