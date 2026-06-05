import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditBar from "../Navigations/EditBar";
import "../Css/InvoicePage.css";

const InvoicePage = ({ invoices, updateInvoice, deleteInvoice }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showEditBar, setShowEditBar] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const invoice = invoices?.find((item) => String(item.id) === id);

  useEffect(() => {
    document.body.style.overflow = showEditBar ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showEditBar]);

  if (!invoice) {
    return (
      <div className="page">
        <div className="status-bar">
          <span className="status-label">Invoice not found</span>
        </div>
        <div className="card">
          <p>No invoice matches the selected ID.</p>
          <Link to="/" className="btn btn-primary">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  const sender = invoice.sender ?? {
    street: "",
    city: "",
    postcode: "",
    country: "",
  };

  const client = invoice.client ?? {
    name: invoice.author || "",
    street: "",
    city: "",
    postcode: "",
    country: "",
    email: invoice.email || "",
  };

  const items = invoice.items ?? [
    {
      name: invoice.tag || "Invoice item",
      qty: 1,
      price: invoice.price || 0,
      total: invoice.price || 0,
    },
  ];

  const pageInvoice = {
    status: invoice.condition,
    condition: invoice.condition,
    id: invoice.id,
    type: invoice.tag,
    date: invoice.date || invoice.due || "",
    due: invoice.due || "",
    total: invoice.total ?? invoice.price ?? 0,
  };

  const handleSave = (updatedInvoice) => {
    updateInvoice({ ...invoice, ...updatedInvoice });
    setShowEditBar(false);
  };

  const handleMarkAsPaid = () => {
    if (invoice.condition !== "paid") {
      updateInvoice({ ...invoice, condition: "paid" });
    }
  };

  const handleDelete = () => {
    deleteInvoice?.(invoice.id);
    navigate("/");
  };

  const openDeleteConfirm = () => setShowConfirmDelete(true);
  const closeDeleteConfirm = () => setShowConfirmDelete(false);

  if (showEditBar) {
    return (
      <div className="page">
        <Link to="/" className="go-back">
          Go back
        </Link>
        <EditBar
          invoice={invoice}
          onSave={handleSave}
          onCancel={() => setShowEditBar(false)}
        />
      </div>
    );
  }

  return (
    <>
      {showConfirmDelete && (
        <div className="ConfirmOverlay" onClick={closeDeleteConfirm}>
          <div className="ConfirmBackdrop" />
          <div className="ConfirmModal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete invoice #{invoice.tag || invoice.id}? This action cannot be undone.
            </p>
            <div className="confirm-actions">
              <button className="btn btn-ghost" onClick={closeDeleteConfirm}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="page">
        <Link to="/" className="go-back">
          Go back
        </Link>

      <div className="status-bar">
        <span className="status-label">Status</span>
        <span className={`badge ${pageInvoice.condition}`}>
          {pageInvoice.status}
        </span>
        <div className="actions">
          <button className="btn btn-ghost" onClick={() => setShowEditBar(true)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={openDeleteConfirm}>
            Delete
          </button>
          {invoice.condition !== "paid" ? (
            <button className="btn btn-primary" onClick={handleMarkAsPaid}>
              Mark as Paid
            </button>
          ) : (
            <button className="btn btn-primary" disabled>
              Paid
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="invoice-id">
              <span>#</span>
              {pageInvoice.id}
            </div>
            <div className="invoice-type">{pageInvoice.type}</div>
          </div>
          <div className="sender-address">
            {sender.street}
            <br />
            {sender.city}
            <br />
            {sender.postcode}
            <br />
            {sender.country}
          </div>
        </div>

        <div className="meta-row">
          <div>
            <div className="meta-group">
              <span className="meta-key">Invoice Date</span>
              <span className="meta-value">{pageInvoice.date}</span>
            </div>
            <div className="meta-group" style={{ marginTop: 24 }}>
              <span className="meta-key">Payment Due</span>
              <span className="meta-value">{pageInvoice.due}</span>
            </div>
          </div>

          <div className="meta-group">
            <span className="meta-key">Bill To</span>
            <span className="meta-value">{client.name}</span>
            <span className="meta-sub">
              {client.street}
              <br />
              {client.city}
              <br />
              {client.postcode}
              <br />
              {client.country}
            </span>
          </div>

          <div className="meta-group">
            <span className="meta-key">Sent To</span>
            <span className="meta-value" style={{ fontSize: 14 }}>
              {client.email}
            </span>
          </div>
        </div>

        <table className="items-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>QTY.</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>£ {item.price}</td>
                <td>£ {item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="amount-footer">
          <span className="amount-label">Amount Due</span>
          <span className="amount-value">£ {pageInvoice.total}</span>
        </div>
      </div>
    </div>
  </>
  );
};

export default InvoicePage;
