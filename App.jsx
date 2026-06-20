import "./App.css";
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    setDeleted(true);
    setShowModal(false);
  };

  if (deleted) {
    return (
      <div className="home">
        <h1>Home Page</h1>
      </div>
    );
  }

  return (
    <div className="app">

      {/* LEFT SIDEBAR */}
      <div className="sidebar">

        <div className="logo">
          <div className="logo-bottom"></div>
        </div>

        <div className="sidebar-bottom">

          <div className="moon">
            🌙
          </div>

          <div className="avatar">
            <img
              src="https://i.pravatar.cc/40"
              alt=""
            />
          </div>

        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        <div className="container">

          {/* BACK */}
          <div className="back">
            ← Go back
          </div>

          {/* STATUS */}
          <div className="status-bar">

            <div className="status-left">
              <span>Status</span>

              <div className="pending">
                <div className="dot"></div>
                Pending
              </div>
            </div>

            <div className="actions">

              <button className="edit-btn">
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => setShowModal(true)}
              >
                Delete
              </button>

              <button className="paid-btn">
                Mark as Paid
              </button>

            </div>
          </div>

          {/* CARD */}
          <div className="invoice-card">

            {/* TOP */}
            <div className="top">

              <div>
                <h2>
                  <span>#</span>XM9141
                </h2>

                <p>Graphic Design</p>
              </div>

              <div className="address">
                <p>19 Union Terrace</p>
                <p>London</p>
                <p>E1 3EZ</p>
                <p>United Kingdom</p>
              </div>

            </div>

            {/* DETAILS */}
            <div className="details">

              <div className="left-details">

                <div>
                  <small>Invoice Date</small>
                  <h4>21 Aug 2021</h4>

                  <small>Payment Due</small>
                  <h4>20 Sep 2021</h4>
                </div>

                <div>
                  <small>Bill To</small>
                  <h4>Jensen Huang</h4>

                  <p>19 Union Terrace</p>
                  <p>London</p>
                  <p>E1 3EZ</p>
                  <p>United Kingdom</p>
                </div>

              </div>

              <div>
                <small>Sent to</small>
                <h4>jensenhwang@digitalmail.com</h4>
              </div>

            </div>

            {/* TABLE */}
            <div className="table">

              <div className="table-content">

                <div className="table-head">
                  <p>Item Name</p>
                  <p>QTY.</p>
                  <p>Price</p>
                  <p>Total</p>
                </div>

                <div className="row">
                  <p>Banner Design</p>
                  <p>1</p>
                  <p>£ 156.00</p>
                  <p>£ 156.00</p>
                </div>

                <div className="row">
                  <p>Email Design</p>
                  <p>2</p>
                  <p>£ 200.00</p>
                  <p>£ 400.00</p>
                </div>

              </div>

              <div className="amount">
                <span>Amount Due</span>

                <h1>£ 556.00</h1>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="overlay">

          <div className="modal">

            <h2>Confirm Deletion</h2>

            <p>
              Are you sure you want to delete invoice
              #XM9141? This action cannot be undone.
            </p>

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;