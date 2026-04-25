 import {
  isRequired,
  isEmail,
  isPositiveNumber,
  MaxDate,
} from "../Functions/FormChecks";
import "../Css/EditBar.css";
import { NewItemMake } from "../Functions/FormFunctions";

const EditBar = () => {
  return (
    <>
      <form className="EditBar">
        <h2>Edit #XM9141</h2>
        <div className="Bill-info">
          <label htmlFor="Street-adress">Street Address</label>
          <input type="text" id="Street-adress" onSubmit={isRequired} />
          <div className="Three-row">
            <label htmlFor="City" className="Label-Des1">
              City
            </label>
            <input type="text" id="City" onSubmit={isRequired} />
            <label htmlFor="Postal-Code" className="Label-Des1">
              Postal Code
            </label>
            <input type="text" id="Postal-Code" onSubmit={isRequired} />
            <label htmlFor="Country" className="Label-Des1">
              Country
            </label>
            <input type="text" id="Country" onSubmit={isRequired} />
          </div>
        </div>
        <div className="Bill-to">
          <label htmlFor="Client-Name">Clients Name</label>
          <input type="text" id="Client-Name" onSubmit={isRequired} />
          <label htmlFor="Client-Email">Clients Email</label>
          <input
            type="email"
            id="Client-Email"
            placeholder="e.g email@example.com"
            onSubmit={isRequired}
          />
          <label htmlFor="Bill-to">Bill To</label>
          <input type="text" id="Bill-to" onSubmit={isRequired} />
          <div className="row">
            <label htmlFor="City" className="Label-Des1">
              City
            </label>
            <input type="text" id="City" onSubmit={isRequired} />
            <label htmlFor="Postal-Code" className="Label-Des1">
              Postal Code
            </label>
            <input type="text" id="Postal-Code" onSubmit={isRequired} />
            <label htmlFor="Country" className="Label-Des1">
              Country
            </label>
            <input type="text" id="Country" onSubmit={isRequired} />
          </div>
        </div>
        <div className="Date&Terms">
          <div className="row">
            <label htmlFor="Invoice-Date">Invoice Date</label>
            <input
              type="date"
              id="Invoice-Date"
              min="2000-01-01"
              max={MaxDate}
              onSubmit={isRequired}
            />
            <label htmlFor="Payment-Terms">Payment Terms</label>
            <select
              name="Payment-Terms"
              id="Payment-Terms"
              defaultValue=""
              onSubmit={isRequired}
            >
              <option value="" disabled>
                Select Payment Terms
              </option>
              <option value="Net 1">Net 1 Days</option>
              <option value="Net 7">Net 7 Days</option>
              <option value="Net 14">Net 14 Days</option>
              <option value="Net 30">Net 30 Days</option>
            </select>
          </div>
          <label htmlFor="Project-Description">Project Description</label>
          <input
            type="text"
            id="Project-Description"
            placeholder="e.g Graphic Design Service"
            onSubmit={isRequired}
          />
        </div>
        <div className="Item-list">
          <button className="Add-new" onClick={NewItemMake}>
            +Add New Item
          </button>
        </div>
        <button>Cancel</button>
        <button>Save Changes</button>
      </form>
    </>
  );
};

export default EditBar;