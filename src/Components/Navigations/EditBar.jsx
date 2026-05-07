import {
  isRequired,
  isEmail,
  isPositiveNumber,
  MaxDate,
} from "../Functions/FormChecks";
import "../Css/EditBar.css";
import { NewItemMake } from "../Functions/FormFunctions";
import { showOptions } from "../Functions/FormFunctions";

const EditBar = () => {
  return (
    <>
      <form className="EditBar">
        <h2>
          Edit <span>#</span>XM9141
        </h2>
        <div className="Bill-info">
          <h4 className="h4">Bill From</h4>
          <div className="Street-AD">
            <label htmlFor="Street-adress">Street Address</label>
            <input type="text" id="Street-adress" onSubmit={isRequired} />
          </div>
          <div className="Three-row">
            <div>
              <label htmlFor="City" className="Label-Des1">
                City
              </label>
              <input type="text" id="City" onSubmit={isRequired} />
            </div>
            <div>
              <label htmlFor="Postal-Code" className="Label-Des1">
                Postal Code
              </label>
              <input type="text" id="Postal-Code" onSubmit={isRequired} />
            </div>
            <div>
              <label htmlFor="Country" className="Label-Des1">
                Country
              </label>
              <input type="text" id="Country" onSubmit={isRequired} />
            </div>
          </div>
        </div>
        <div className="Bill-to">
          <h4 className="h4">Bill To</h4>
          <div>
            <label htmlFor="Client-Name">Clients Name</label>
            <input type="text" id="Client-Name" onSubmit={isRequired} />
          </div>
          <div>
            <label htmlFor="Client-Email">Clients Email</label>
            <input
              type="email"
              id="Client-Email"
              placeholder="e.g email@example.com"
              onSubmit={isRequired}
            />
          </div>
          <div>
            <label htmlFor="Street-adress">Street Address</label>
            <input type="text" id="Street-adress" onSubmit={isRequired} />
          </div>
          <div className="Three-row">
            <div>
              <label htmlFor="City" className="Label-Des1">
                City
              </label>
              <input type="text" id="City" onSubmit={isRequired} />
            </div>
            <div>
              <label htmlFor="Postal-Code" className="Label-Des1">
                Postal Code
              </label>
              <input type="text" id="Postal-Code" onSubmit={isRequired} />
            </div>
            <div>
              <label htmlFor="Country" className="Label-Des1">
                Country
              </label>
              <input type="text" id="Country" onSubmit={isRequired} />
            </div>
          </div>
        </div>
        <div className="DateNTerms">
          <div className="Three-row" style={{ display: "flex" }}>
            <div>
              <label htmlFor="Invoice-Date">Invoice Date</label>
              <input
                type="date"
                id="Invoice-Date"
                min="2000-01-01"
                max={MaxDate}
                onSubmit={isRequired}
              />
            </div>
            <div>
              <label htmlFor="Payment-Terms">Payment Terms</label>
              <li
                name="Payment-Terms"
                id="Payment-Terms"
                defaultValue=""
                onSubmit={isRequired}
              >
                <div className="defaultOptionDiv">
                  <ul
                    className="defaultOption"
                    value=""
                    disabled
                    onClick={showOptions}
                  >
                    Net 30 Days
                  </ul>
                  <svg
                    width="10"
                    height="7"
                    viewBox="0 0 10 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="Open"
                  >
                    <path
                      d="M0.707092 0.707153L4.93499 4.93505L9.1629 0.707153"
                      stroke="#7C5DFA"
                      stroke-width="2"
                    />
                  </svg>
                </div>
                <div className="Option-bar">
                  <ul value="Net 1">Net 1 Days</ul>
                  <hr />
                  <ul value="Net 7">Net 7 Days</ul>
                  <hr />
                  <ul value="Net 14">Net 14 Days</ul>
                  <hr />
                  <ul value="Net 30">Net 30 Days</ul>
                </div>
              </li>
            </div>
          </div>
          <div>
            <label htmlFor="Project-Description">Project Description</label>
            <input
              type="text"
              id="Project-Description"
              placeholder="e.g Graphic Design Service"
              onSubmit={isRequired}
            />
          </div>
        </div>
        <div className="Item-list">
          <button className="Add-new" onClick={NewItemMake}>
            + Add New Item
          </button>
        </div>
        <button>Cancel</button>
        <button>Save Changes</button>
      </form>
    </>
  );
};

export default EditBar;
