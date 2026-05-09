import InvoicesHeader from "../InvoicesHeader";
import Arrow from "../logo/ArrowIcon";
import NoInvLogo from "../logo/NoInvLogo";
import { Link } from "react-router-dom"

function Home({ invoicesObject }) {
    return (
        <>  
            <div className="invoices-container">
                {
                    invoicesObject.length > 0 ? (
                        <>
                            <InvoicesHeader
                                invoiceTotal={`There are ${invoicesObject.length} total invoices`}
                            />

                            <div className="invoice-box__wrapper">
                                {
                                    invoicesObject.map(p => {
                                        let classContent =
                                            p.condition === "paid"
                                                ? "paid"
                                                : p.condition === "pending"
                                                    ? "pending"
                                                    : "draft"

                                        let colorContent =
                                            p.condition === "paid"
                                                ? "#33D69F"
                                                : p.condition === "pending"
                                                    ? "#FF8F00"
                                                    : "#373B53"
                                        let bgColor = colorContent + "1A";
                                        return (
                                            <Link to={`/invoice/${p.id}`} key={p.id} className="invoice__box">
                                                <div className="inv-wrapper2">
                                                    <p className="tag"><span className="diez">#</span>{p.tag}</p>
                                                    <p className="date">Due {p.due}</p>
                                                    <p className="author">{p.author}</p>

                                                </div>
                                                
                                                <div className="condition__wrapper">
                                                    <p className="inv__price">£ {p.price}</p>

                                                    <div className={`condition ${classContent}`}
                                                        style={{ backgroundColor: bgColor, color: colorContent }}
                                                    >
                                                        <svg width="8" height="8" viewBox="0 0 8 8">
                                                            <circle cx="4" cy="4" r="4" fill={colorContent} />
                                                        </svg>
                                                        {p.condition}
                                                    </div>
                                                    <Arrow />
                                                </div>

                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </>
                    ) : (
                        <>
                            <InvoicesHeader
                                invoiceTotal={"No invoices"}
                            />

                            <div className="page__noinvoices">
                                <NoInvLogo />
                                <div className="noinv__content">
                                    <h1 className="h-size-s">There is nothing here</h1>
                                    <p className="p-size-s">
                                        Create an invoice by clicking the New Invoice button and get started
                                    </p>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Home