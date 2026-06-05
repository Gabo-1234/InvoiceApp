import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SideNav from "./Components/Navigations/SideNavigation";
import "./index.css";
import "./Components/Css/SideNavigation.css"
import "./Components/Css/Invoices.css"
import Home from "./Components/Pages_/Home";
import InvoicePage from "./Components/Pages_/InvoicePage";
import NewInvoicePage from "./Components/Pages_/NewInvoicePage";

const App = () => {
  const initialInvoices = [
    {
      id: 1,
      tag: "RT3080",
      condition: "paid",
      price: 489.0,
      author: "Jensen Huang",
      due: "19 Aug 2021",
      date: "01 Aug 2021",
      sender: {
        street: "19 Union Terrace",
        city: "London",
        postcode: "E1 3EZ",
        country: "United Kingdom",
      },
      client: {
        name: "Alex Grim",
        email: "alexgrim@mail.com",
        street: "84 Church Way",
        city: "Bradford",
        postcode: "BD1 9PB",
        country: "United Kingdom",
      },
      paymentTerms: "Net 30 Days",
      projectDescription: "Graphic Design Service",
      items: [
        { description: "Banner Design", quantity: 1, unitPrice: 395 },
      ],
    },
    {
      id: 2,
      tag: "XM9141",
      condition: "pending",
      price: 320.5,
      author: "Elon Musk",
      due: "21 Aug 2021",
      date: "22 Jul 2021",
      sender: {
        street: "34 Cherry Tree Lane",
        city: "Bristol",
        postcode: "BS1 4ET",
        country: "United Kingdom",
      },
      client: {
        name: "Sophie Lee",
        email: "sophie.lee@mail.com",
        street: "12 Meadow Street",
        city: "Liverpool",
        postcode: "L1 5TA",
        country: "United Kingdom",
      },
      paymentTerms: "Net 14 Days",
      projectDescription: "Website Redesign",
      items: [
        { description: "Landing page", quantity: 1, unitPrice: 320.5 },
      ],
    },
    {
      id: 3,
      tag: "AB1203",
      condition: "draft",
      price: 150.0,
      author: "Tim Cook",
      due: "25 Aug 2021",
      date: "10 Aug 2021",
      sender: {
        street: "7 King Street",
        city: "Manchester",
        postcode: "M1 2AB",
        country: "United Kingdom",
      },
      client: {
        name: "Mia Chen",
        email: "mia.chen@mail.com",
        street: "23 Ocean Road",
        city: "Leeds",
        postcode: "LS1 4AB",
        country: "United Kingdom",
      },
      paymentTerms: "Net 7 Days",
      projectDescription: "Logo Creation",
      items: [
        { description: "Logo design", quantity: 1, unitPrice: 150 },
      ],
    },
    {
      id: 4,
      tag: "PL4509",
      condition: "paid",
      price: 780.99,
      author: "Sundar Pichai",
      due: "30 Aug 2021",
      date: "15 Aug 2021",
      sender: {
        street: "88 High Street",
        city: "Oxford",
        postcode: "OX1 4AB",
        country: "United Kingdom",
      },
      client: {
        name: "Emma Watson",
        email: "emma.watson@mail.com",
        street: "44 Elm Park",
        city: "Cambridge",
        postcode: "CB2 1AB",
        country: "United Kingdom",
      },
      paymentTerms: "Net 30 Days",
      projectDescription: "App Consultation",
      items: [
        { description: "Consulting", quantity: 1, unitPrice: 780.99 },
      ],
    },
    {
      id: 5,
      tag: "QR7782",
      condition: "pending",
      price: 210.75,
      author: "Satya Nadella",
      due: "02 Sep 2021",
      date: "18 Aug 2021",
      sender: {
        street: "50 Station Road",
        city: "Leicester",
        postcode: "LE1 7AB",
        country: "United Kingdom",
      },
      client: {
        name: "Olivia Brown",
        email: "olivia.brown@mail.com",
        street: "33 River Avenue",
        city: "Nottingham",
        postcode: "NG1 5AB",
        country: "United Kingdom",
      },
      paymentTerms: "Net 30 Days",
      projectDescription: "Marketing Campaign",
      items: [
        { description: "Campaign planning", quantity: 1, unitPrice: 210.75 },
      ],
    },
    {
      id: 6,
      tag: "LK3321",
      condition: "draft",
      price: 95.2,
      author: "Mark Zuckerberg",
      due: "05 Sep 2021",
      date: "20 Aug 2021",
      sender: {
        street: "12 Oak Street",
        city: "Birmingham",
        postcode: "B1 2AB",
        country: "United Kingdom",
      },
      client: {
        name: "Noah Smith",
        email: "noah.smith@mail.com",
        street: "11 Pine Close",
        city: "Sheffield",
        postcode: "S1 1AB",
        country: "United Kingdom",
      },
      paymentTerms: "Net 7 Days",
      projectDescription: "Business Card Design",
      items: [
        { description: "Design service", quantity: 1, unitPrice: 95.2 },
      ],
    }
  ];

  const [invoices, setInvoices] = useState(initialInvoices);

  const handleAddInvoice = (newInvoice) => {
    setInvoices((prev) => [newInvoice, ...prev]);
  };

  const handleUpdateInvoice = (updatedInvoice) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === updatedInvoice.id ? { ...invoice, ...updatedInvoice } : invoice
      )
    );
  };

  const handleDeleteInvoice = (invoiceId) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== invoiceId));
  };

  return (
    <BrowserRouter>
      <SideNav />
      <Routes>
        <Route path="/" element={<Home invoicesObject={invoices} addInvoice={handleAddInvoice} />} />
        <Route path="/new" element={<NewInvoicePage />} />
        <Route path="/invoice/:id" element={<InvoicePage invoices={invoices} updateInvoice={handleUpdateInvoice} deleteInvoice={handleDeleteInvoice} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
