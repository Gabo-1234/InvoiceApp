import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNav from "./Components/Navigations/SideNavigation";
import "./index.css";
import "./Components/Css/SideNavigation.css"
import "./Components/Css/Invoices.css"
import Home from "./Components/Pages_/Home";

import { useState } from "react";

import EditBar from "./Components/Navigations/EditBar.jsx"
function App() {
  const [invoices, setInvoices] = useState([
    { id: 1, tag: "RT3080", condition: "paid", price: 489.00, author: "Jensen Huang", due: "19 Aug 2021" },
    { id: 2, tag: "XM9141", condition: "pending", price: 320.50, author: "Elon Musk", due: "21 Aug 2021" },
    { id: 3, tag: "AB1203", condition: "draft", price: 150.00, author: "Tim Cook", due: "25 Aug 2021" },
    { id: 4, tag: "PL4509", condition: "paid", price: 780.99, author: "Sundar Pichai", due: "30 Aug 2021" },
    { id: 5, tag: "QR7782", condition: "pending", price: 210.75, author: "Satya Nadella", due: "02 Sep 2021" },
    { id: 6, tag: "LK3321", condition: "draft", price: 95.20, author: "Mark Zuckerberg", due: "05 Sep 2021" }
  ]);

  return (
    <>
      <BrowserRouter>
        <SideNav />
        <Routes>
          <Route path="/" element={<Home invoicesObject={invoices} />} />
          <Route path="/" element={<EditBar />} />
          <Route path="/Invoice/:id" element={<h1>InvoicePage</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
