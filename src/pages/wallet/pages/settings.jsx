import React, { useState } from "react";
import "../../../style/wallet/pages/settings.css";

const D = {
    surface: "#141720",
    surface2: "#1A1D2E",
    surface3: "#20243A",
    border: "#272B40",
    text: "#E8E9F5",
    muted: "#5A5F80",
    accent: "#FF5252",
    red: "#F04444",
    green: "#22D47A",
    cardGrad: "#7B68F0",
};

const Settings = () => {
    const [profEdit, setProfEdit] = useState(false);
    const [profName, setProfName] = useState("Anita Rose");
    const [profEmail, setProfEmail] = useState("anita.rose@email.com");

    return (
        <div className="settings-container">
            <div className="settings-main">
                <div className="settings-card">
                    <div className="settings-header">Profile & Settings</div>

                    <div className="profile-section">
                        <div className="profile-avatar">A</div>
                        <div className="profile-info">
                            <div className="profile-name">{profName}</div>
                            <div className="profile-email">{profEmail}</div>
                        </div>
                        <button
                            className="btn-primary"
                            onClick={() => setProfEdit(!profEdit)}
                        >
                            {profEdit ? "Save" : "Edit"}
                        </button>
                    </div>

                    {profEdit && (
                        <div className="profile-edit">
                            <label>Full Name</label>
                            <input
                                value={profName}
                                onChange={(e) => setProfName(e.target.value)}
                            />
                            <label>Email</label>
                            <input
                                value={profEmail}
                                onChange={(e) => setProfEmail(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="section-title">Security</div>
                    {[
                        ["Change Password", "Last changed 30 days ago"],
                        ["Two-Factor Auth", "Enabled via SMS"],
                        ["Biometric Login", "Active on this device"],
                    ].map(([t, sub]) => (
                        <div key={t} className="security-row">
                            <div>
                                <div className="security-title">{t}</div>
                                <div className="security-sub">{sub}</div>
                            </div>
                            <button className="btn-outline">Manage</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="settings-sidebar">
                <div className="sidebar-title">Preferences</div>
                {[
                    ["Currency", "USD ($)"],
                    ["Language", "English"],
                    ["Timezone", "UTC-5 (EST)"],
                    ["Theme", "Dark Mode"],
                ].map(([pref, val]) => (
                    <div key={pref} className="preference-row">
                        <span className="pref-label">{pref}</span>
                        <span className="pref-value">{val} ›</span>
                    </div>
                ))}
                <button className="btn-outline signout">Sign Out</button>
            </div>
        </div>
    );
};

export default Settings;