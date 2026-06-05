import { useNavigate } from "react-router-dom";
import EditBar from "../Navigations/EditBar";
import "../Css/InvoicePage.css";

const NewInvoicePage = () => {
  const navigate = useNavigate();

  const handleSave = (newInvoice) => {
    console.log("New invoice created:", newInvoice);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="page">
      <EditBar invoice={{}} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default NewInvoicePage;
