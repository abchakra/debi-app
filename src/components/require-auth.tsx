import { Navigate, useLocation } from "react-router-dom";
import { useFirebase } from "../context/firebase-context";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useFirebase();
  let location = useLocation();

  if (!user) {
    // Redirect the user to the home page.
    // Please! Close the mustache {{}}
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
