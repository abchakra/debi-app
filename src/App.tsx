import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import GuestForm from "./components/guest-form";
import RequireAuth from "./components/require-auth";
import { AuthContext } from "./context/auth-context";
import Home from "./routes/home";
import Profile from "./routes/profile";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // NOTE: console log for testing purposes
  console.log("User:", !!currentUser);

  // Check if currentUser exists on initial render
  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="addguest"
        element={
          <RequireAuth>
            <GuestForm />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
