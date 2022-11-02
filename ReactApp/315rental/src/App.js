import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Cars from "./pages/Cars";
import AddCars from "./pages/admin/AddCars";
import RentCar from "./pages/admin/RentCar";
import UpdateClient from "./pages/admin/UpdateClient";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} />
        <Route path="cars" element={<Cars/>} />
        <Route path="admin/addcars" element={<AddCars/>} />
        <Route path="admin/rentcar" element={<RentCar/>} />
        <Route path="admin/updateclients" element={<UpdateClient/>} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
