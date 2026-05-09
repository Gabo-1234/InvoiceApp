import FilterButton from "./FilterButton";
import NewInvoice from "./NewInvoice";


export default function InvoicesHeader({ invoiceTotal }) {
    return (
        <>
            <div className="header-invoices">
                <div className="inv__wrapper1">
                    <h1 className={"h-size-m inv-header"}>Invoices</h1>
                    <p className={"p-size-s p-total"}>{invoiceTotal}</p>
                </div>

                <div className="filter__new-wrapper">
                    <FilterButton />
                    <NewInvoice />
                </div>

            </div>
        </>
    )
}