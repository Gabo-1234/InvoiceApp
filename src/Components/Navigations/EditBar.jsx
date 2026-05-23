import { useState } from "react";
import {
  isRequired,
  isEmail,
  isPositiveNumber,
  MaxDate,
  validateInvoiceForm,
} from "../Functions/FormChecks";
import "../Css/EditBar.css";

const EditBar = ({ invoice = {}, onSave = () => {}, onCancel = () => {} }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: invoice.tag || "",
    billFromStreet: "",
    billFromCity: "",
    billFromPostal: "",
    billFromCountry: "",
    billToName: invoice.author || "",
    billToEmail: "",
    billToStreet: "",
    billToCity: "",
    billToPostal: "",
    billToCountry: "",
    invoiceDate: "",
    paymentTerms: "Net 30 Days",
    projectDescription: "",
    items: [],
  });

  const [showOptions, setShowOptions] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  const handlePaymentTermsSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      paymentTerms: value,
    }));
    setShowOptions(false);
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, unitPrice: 0 }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
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

    onSave(formData);
  };

  return (
    <>
      <form className="EditBar" onSubmit={handleSubmit}>
        <h2>
          Edit <span>#</span>
          {formData.invoiceNumber}
        </h2>
        
        <div className="Bill-info">
          <h4 className="h4">Bill From</h4>
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

        <div className="Bill-to">
          <h4 className="h4">Bill To</h4>
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
              <div className="defaultOptionDiv" onClick={() => setShowOptions(!showOptions)}>
                <div className="defaultOption">
                  {formData.paymentTerms}
                </div>
                <svg
                  width="10"
                  height="7"
                  viewBox="0 0 10 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  id="arrow"
                  style={{
                    transform: showOptions ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <path
                    d="M0.707092 0.707153L4.93499 4.93505L9.1629 0.707153"
                    stroke="#7C5DFA"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              {showOptions && (
                <div className="Option-bar">
                  <ul onClick={() => handlePaymentTermsSelect("Net 1 Days")}>
                    Net 1 Days
                  </ul>
                  <hr />
                  <ul onClick={() => handlePaymentTermsSelect("Net 7 Days")}>
                    Net 7 Days
                  </ul>
                  <hr />
                  <ul onClick={() => handlePaymentTermsSelect("Net 14 Days")}>
                    Net 14 Days
                  </ul>
                  <hr />
                  <ul onClick={() => handlePaymentTermsSelect("Net 30 Days")}>
                    Net 30 Days
                  </ul>
                </div>
              )}
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

        <div className="Item-list">
          <button type="button" className="Add-new" onClick={handleAddItem}>
            + Add New Item
          </button>
        </div>

        <div className="CancelNSave">
          <button type="button" className="Cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="Save">
            Save Changes
          </button>
        </div>
      </form>
      <div className="Black-Bg"></div>
    </>
  );
};

export default EditBar;
