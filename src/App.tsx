import { Route, Routes } from "react-router-dom";
import GuestDetails from "./components/guest-details";
import GuestForm from "./components/guest-form";
import RequireAuth from "./components/require-auth";
import GuestList from "./routes/guest-list";
import Home from "./routes/home";
import Profile from "./routes/profile";

function App() {
  // const { currentUser } = useContext(AuthContext);
  // const navigate = useNavigate();

  // // NOTE: console log for testing purposes
  // console.log("User:", !!currentUser);

  // // Check if currentUser exists on initial render
  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/profile");
  //   }
  //   // eslint-disable-next-line
  // }, [currentUser]);

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
      <Route
        path="guestdetails"
        element={
          <RequireAuth>
            <GuestDetails />
          </RequireAuth>
        }
      />
      <Route
        path="guestlist"
        element={
          <RequireAuth>
            <GuestList />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
