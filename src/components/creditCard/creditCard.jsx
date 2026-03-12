import React from "react";
import "../../style/wallet/components/creditCard.css";

const CreditCard = ({ gradient, last4, holder, expiry, brand = "VISA", shrink = false }) => {
    return (
        <div
            className={`credit-card ${shrink ? "shrink" : "full"}`}
            style={{ background: gradient }}
        >
            <div className="circle-top-right" />
            <div className="circle-bottom-left" />

            <div className="top-row">
                <div className="dots">
                    <div className="dot1" />
                    <div className="dot2" />
                </div>
                <span className="brand">{brand}</span>
            </div>

            <div className={`card-number ${shrink ? "shrink" : "full"}`}>
                •••• •••• •••• {last4}
            </div>

            <div className="bottom-row">
                <div>
                    <div className="label">Card Holder</div>
                    <div className="value">{holder}</div>
                </div>
                <div>
                    <div className="label">Valid Thru</div>
                    <div className="value">{expiry}</div>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;