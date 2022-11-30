import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Cars from "./pages/Cars";
import Details from "./pages/Details";

import AdminHome from "./pages/admin/Home";
import AdminRentals from "./pages/admin/Rentals";
import AdminReturns from "./pages/admin/Returns";
import AdminCars from "./pages/admin/Cars";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} />
        <Route path="cars" element={<Cars/>} />
        <Route path="details" element={<Details/>}/>
        <Route path="admin/" element={<AdminHome/>}/>
        <Route path="admin/rentals" element={<AdminRentals/>}/>
        <Route path="admin/returns" element={<AdminReturns/>}/>
        <Route path="admin/cars" element={<AdminCars/>}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
