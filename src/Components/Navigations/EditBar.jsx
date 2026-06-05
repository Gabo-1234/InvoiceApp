import { useEffect, useState } from "react";
import {
  isRequired,
  isEmail,
  MaxDate,
} from "../Functions/FormChecks";
import "../Css/EditBar.css";

const createInitialFormData = (invoice) => ({
  invoiceNumber: invoice.tag || "",
  billFromStreet: invoice.sender?.street || "",
  billFromCity: invoice.sender?.city || "",
  billFromPostal: invoice.sender?.postcode || "",
  billFromCountry: invoice.sender?.country || "",
  billToName: invoice.client?.name || invoice.author || "",
  billToEmail: invoice.client?.email || invoice.email || "",
  billToStreet: invoice.client?.street || "",
  billToCity: invoice.client?.city || "",
  billToPostal: invoice.client?.postcode || "",
  billToCountry: invoice.client?.country || "",
  invoiceDate: invoice.date || "",
  paymentTerms: invoice.paymentTerms || "Net 30 Days",
  projectDescription: invoice.projectDescription || "",
  items: invoice.items?.length ? invoice.items : [],
});

const EditBar = ({ invoice = {}, onSave = () => {}, onCancel = () => {} }) => {
  const isNewInvoice = !invoice.id && !invoice.tag;
  const [formData, setFormData] = useState(() => createInitialFormData(invoice));

  useEffect(() => {
    setFormData(createInitialFormData(invoice));
  }, [invoice]);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, unitPrice: 0 }],
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => {
      const nextItems = [...prev.items];
      nextItems[index] = {
        ...nextItems[index],
        [field]: field === "description" ? value : Number(value),
      };
      return {
        ...prev,
        items: nextItems,
      };
    });
  };

  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!isRequired(formData.invoiceNumber)) {
      newErrors.invoiceNumber = "Invoice number is required";
    }
    if (!isRequired(formData.billToName)) {
      newErrors.billToName = "Client name is required";
    }
    if (!isRequired(formData.billToEmail)) {
      newErrors.billToEmail = "Client email is required";
    } else if (!isEmail(formData.billToEmail)) {
      newErrors.billToEmail = "Invalid email format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData, { status: "pending" });
  };

  const handleSaveDraft = () => {
    onSave(formData, { status: "draft" });
  };

  return (
    <div className="EditBarOverlay" onClick={onCancel}>
      <div className="EditBarBackdrop" />
      <form className="EditBar" onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()}>
        <h2>
          {isNewInvoice ? (
          "New Invoice"
        ) : (
          <>
            Edit <span>#</span>
            {formData.invoiceNumber}
          </>
        )}
      </h2>
        
        <section className="details-group">
          <div className="details-summary">Bill From</div>
          <div className="Bill-info">
            <div className="Street-AD">
              <label htmlFor="billFromStreet">Street Address</label>
              <input
                type="text"
                id="billFromStreet"
                value={formData.billFromStreet}
                onChange={handleInputChange}
              />
            </div>
            <div className="Three-row">
              <div>
                <label htmlFor="billFromCity" className="Label-Des1">
                  City
                </label>
                <input
                  type="text"
                  id="billFromCity"
                  value={formData.billFromCity}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="billFromPostal" className="Label-Des1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="billFromPostal"
                  value={formData.billFromPostal}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="billFromCountry" className="Label-Des1">
                  Country
                </label>
                <input
                  type="text"
                  id="billFromCountry"
                  value={formData.billFromCountry}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="details-group">
          <div className="details-summary">Bill To</div>
          <div className="Bill-to">
            <div>
              <label htmlFor="billToName">Clients Name</label>
              <input
                type="text"
                id="billToName"
                value={formData.billToName}
                onChange={handleInputChange}
              />
              {errors.billToName && <span className="error">{errors.billToName}</span>}
            </div>
            <div>
              <label htmlFor="billToEmail">Clients Email</label>
              <input
                type="email"
                id="billToEmail"
                placeholder="e.g email@example.com"
                value={formData.billToEmail}
                onChange={handleInputChange}
              />
              {errors.billToEmail && <span className="error">{errors.billToEmail}</span>}
            </div>
            <div>
              <label htmlFor="billToStreet">Street Address</label>
              <input
                type="text"
                id="billToStreet"
                value={formData.billToStreet}
                onChange={handleInputChange}
              />
            </div>
            <div className="Three-row">
              <div>
                <label htmlFor="billToCity" className="Label-Des1">
                  City
                </label>
                <input
                  type="text"
                  id="billToCity"
                  value={formData.billToCity}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="billToPostal" className="Label-Des1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="billToPostal"
                  value={formData.billToPostal}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="billToCountry" className="Label-Des1">
                  Country
                </label>
                <input
                  type="text"
                  id="billToCountry"
                  value={formData.billToCountry}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="details-group">
          <div className="details-summary">Invoice Details</div>
          <div className="DateNTerms">
          <div className="Date-Term" style={{ display: "flex" }}>
            <div className="Date">
              <label htmlFor="invoiceDate">Invoice Date</label>
              <input
                className="Invoice-Date"
                type="date"
                id="invoiceDate"
                min="2000-01-01"
                max={MaxDate}
                value={formData.invoiceDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="paymentTerms">Payment Terms</label>
              <select
                id="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleInputChange}
              >
                <option value="Net 1 Days">Net 1 Days</option>
                <option value="Net 7 Days">Net 7 Days</option>
                <option value="Net 14 Days">Net 14 Days</option>
                <option value="Net 30 Days">Net 30 Days</option>
              </select>
            </div>
          </div>
          <div className="Project-des">
            <label htmlFor="projectDescription">Project Description</label>
            <input
              type="text"
              id="projectDescription"
              placeholder="e.g Graphic Design Service"
              value={formData.projectDescription}
              onChange={handleInputChange}
            />
          </div>
          </div>
        </section>

        <section className="details-group">
          <div className="details-summary">Invoice Items</div>
          <div className="Item-list">
            <div className="item-list__header">
              <span>Item Name</span>
              <span>Qty.</span>
              <span>Price</span>
              <span>Total</span>
              <span />
            </div>
            {formData.items.map((item, index) => (
              <div className="item-row" key={index}>
                <div className="item-row__desc">
                  <input
                    type="text"
                    value={item.description}
                    placeholder="Item name"
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                  />
                </div>
                <div className="item-row__qty">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  />
                </div>
                <div className="item-row__price">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                  />
                </div>
                <div className="item-row__total">
                  £ {Number(item.quantity * item.unitPrice).toFixed(2)}
                </div>
                <button
                  type="button"
                  className="item-row__remove"
                  onClick={() => handleRemoveItem(index)}
                  aria-label="Remove item"
                >
                  🗑
                </button>
              </div>
            ))}
            <button type="button" className="Add-new" onClick={handleAddItem}>
              + Add New Item
            </button>
          </div>
        </section>

        <div className="CancelNSave">
          <button type="button" className="Cancel" onClick={onCancel}>
            {isNewInvoice ? "Discard" : "Cancel"}
          </button>
          {isNewInvoice ? (
            <>
              <button type="button" className="Draft" onClick={handleSaveDraft}>
                Save as Draft
              </button>
              <button type="submit" className="Send">
                Save & Send
              </button>
            </>
          ) : (
            <button type="submit" className="Save">
              Save Changes
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditBar;
