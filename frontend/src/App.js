import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Maps from "./Pages/Map/RouteMap";
import LoginPage from "./Pages/LoginPage/LoginPage";
import AddUser from "./Pages/AddUser/AddUser";

function App() {
  return (
    <>

      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/routeDetails" element={<Maps />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addUser" element={<AddUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
