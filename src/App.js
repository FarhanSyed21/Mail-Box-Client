import LogIn from "./Components/Registration Form/LogIn";
import SignUp from "./Components/Registration Form/SignUp";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Inbox from "./Components/Home/Inbox";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ComposeMail from "./Components/Home/ComposeMail";
import MailDetails from "./Components/EmailDetailsPage/MailDetails";
import { useSelector } from "react-redux";
import Sent from "./Components/Home/Sent";

function App() {
  const userIsLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!userIsLoggedIn && <LogIn />} />
        <Route path="/signup" element={!userIsLoggedIn && <SignUp />} />
        <Route path="/home" element={userIsLoggedIn && <Inbox />} />
        <Route path="/sent" element={userIsLoggedIn && <Sent />} />
        <Route path="/compose" element={userIsLoggedIn && <ComposeMail />} />
        <Route path="/details" element={userIsLoggedIn && <MailDetails />} />

        <Route path="*" element={userIsLoggedIn &&<Navigate to="/home" replace />} />
        <Route
          path="*"
          element={!userIsLoggedIn && <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
