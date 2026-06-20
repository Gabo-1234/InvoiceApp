import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SideNav from "./Components/Navigations/SideNavigation";
import "./index.css";
import "./Components/Css/SideNavigation.css";
import "./Components/Css/Invoices.css";
import Home from "./Components/Pages_/Home";
import InvoicePage from "./Components/Pages_/InvoicePage";
import NewInvoicePage from "./Components/Pages_/NewInvoicePage";

const API_URL = 'http://localhost:5000/api/invoices';

const App = () => {
  const [invoices, setInvoices] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load invoices: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setInvoices(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error fetching invoices:", err);
          setFetchError(err.message);
        }
      });

    return () => controller.abort();
  }, []);

  const handleAddInvoice = (newInvoice) => {
    setInvoices((prev) => [newInvoice, ...prev]);
  };

  const handleUpdateInvoice = (updatedInvoice) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === updatedInvoice.id
          ? { ...invoice, ...updatedInvoice }
          : invoice,
      ),
    );
  };

  const handleDeleteInvoice = (invoiceId) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== invoiceId));
  };

  return (
    <BrowserRouter>
      <SideNav />
      <Routes>
        <Route
          path="/"
          element={
            <Home invoicesObject={invoices} addInvoice={handleAddInvoice} />
          }
        />
        <Route path="/new" element={<NewInvoicePage />} />
        <Route
          path="/invoice/:id"
          element={
            <InvoicePage
              invoices={invoices}
              updateInvoice={handleUpdateInvoice}
              deleteInvoice={handleDeleteInvoice}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
