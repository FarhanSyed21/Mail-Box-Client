import LogIn from "./Components/Registration Form/LogIn";
import SignUp from "./Components/Registration Form/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inbox from "./Components/Home/Inbox";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ComposeMail from "./Components/Home/ComposeMail";
import MailDetails from "./Components/EmailDetailsPage/MailDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Inbox />} />
          <Route path='/compose' element={<ComposeMail />} />
          <Route path='/details' element={<MailDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
