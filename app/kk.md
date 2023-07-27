React.useEffect(() => {
  // checks if the user is authenticated
  authContext.isUserAuthenticated()
  ? router.push("/dashboard")
  : router.push("/");
}, []);