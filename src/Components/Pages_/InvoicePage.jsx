import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import EditBar from "../Navigations/EditBar";
import "../../index.css";
import "../Css/invoicePage.css";

const InvoicePage = ({ invoices = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const invoice = invoices.find((inv) => inv.id === parseInt(id));

  if (!invoice) {
    return (
      <div className="invoice-page">
        <div className="invoice-container">
          <h2>Invoice not found</h2>
          <button className="back-button" onClick={() => navigate("/")}>
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="invoice-page">
      <div className="invoice-container">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Go back
        </button>
      </div>
      {isEditing ? (
        <EditBar invoice={invoice} onSave={() => setIsEditing(false)} />
      ) : (
        <div className="invoice-container">
          <div className="invoice-detail">
            <div className="invoice-header">
              <h1>
                <span>#</span>
                {invoice.tag}
              </h1>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
            <div className="invoice-info">
              <div className="bill-from">
                <h3>Bill From</h3>
                <p>{invoice.author}</p>
              </div>
              <div className="bill-to">
                <h3>Bill To</h3>
                <p>{invoice.author}</p>
              </div>
              <div className="invoice-status">
                <h3>Status</h3>
                <span className={`status ${invoice.condition}`}>
                  {invoice.condition}
                </span>
              </div>
              <div className="invoice-amount">
                <h2>£ {invoice.price.toFixed(2)}</h2>
                <p>Due {invoice.due}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;