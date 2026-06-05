import { useState } from "react";
import InvoicesHeader from "../InvoicesHeader";
import Arrow from "../logo/ArrowIcon";
import NoInvLogo from "../logo/NoInvLogo";
import EditBar from "../Navigations/EditBar";
import { Link } from "react-router-dom";

const Home = ({ invoicesObject, addInvoice }) => {
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);

  const handleOpenNewInvoice = () => setShowNewInvoiceModal(true);
  const handleCloseNewInvoice = () => setShowNewInvoiceModal(false);
  const handleSaveNewInvoice = (formData, meta = {}) => {
    const condition = meta.status || formData.condition || "draft";
    const newInvoice = {
      id: Date.now(),
      tag: formData.invoiceNumber || `RT${Math.floor(Math.random() * 9000 + 1000)}`,
      condition,
      price: formData.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
      author: formData.billToName,
      due: formData.invoiceDate || "",
      date: formData.invoiceDate || "",
      sender: {
        street: formData.billFromStreet,
        city: formData.billFromCity,
        postcode: formData.billFromPostal,
        country: formData.billFromCountry,
      },
      client: {
        name: formData.billToName,
        email: formData.billToEmail,
        street: formData.billToStreet,
        city: formData.billToCity,
        postcode: formData.billToPostal,
        country: formData.billToCountry,
      },
      paymentTerms: formData.paymentTerms,
      projectDescription: formData.projectDescription,
      items: formData.items,
    };

    addInvoice(newInvoice);
    setShowNewInvoiceModal(false);
  };

  return (
    <>
      {showNewInvoiceModal && (
        <EditBar
          invoice={{}}
          onSave={handleSaveNewInvoice}
          onCancel={handleCloseNewInvoice}
        />
      )}
      <div className="invoices-container">
        {invoicesObject.length > 0 ? (
          <>
            <InvoicesHeader
              invoiceTotal={`There are ${invoicesObject.length} total invoices`}
              onNewInvoice={handleOpenNewInvoice}
            />

            <div className="invoice-box__wrapper">
              {invoicesObject.map((p) => {
                let classContent =
                  p.condition === "paid"
                    ? "paid"
                    : p.condition === "pending"
                      ? "pending"
                      : "draft";

                let colorContent =
                  p.condition === "paid"
                    ? "#33D69F"
                    : p.condition === "pending"
                      ? "#FF8F00"
                      : "#373B53";
                let bgColor = colorContent + "1A";
                return (
                  <Link
                    to={`/invoice/${p.id}`}
                    key={p.id}
                    className="invoice__box"
                  >
                    <div className="inv-wrapper2">
                      <p className="tag">
                        <span className="diez">#</span>
                        {p.tag}
                      </p>
                      <p className="date">Due {p.due}</p>
                      <p className="author">{p.author}</p>
                    </div>

                    <div className="condition__wrapper">
                      <p className="inv__price">£ {p.price}</p>

                      <div
                        className={`condition ${classContent}`}
                        style={{
                          backgroundColor: bgColor,
                          color: colorContent,
                        }}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="4" fill={colorContent} />
                        </svg>
                        {p.condition}
                      </div>
                      <Arrow />
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <InvoicesHeader invoiceTotal={"No invoices"} />

            <div className="page__noinvoices">
              <NoInvLogo />
              <div className="noinv__content">
                <h1 className="h-size-s">There is nothing here</h1>
                <p className="p-size-s">
                  Create an invoice by clicking the New Invoice button and get
                  started
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
