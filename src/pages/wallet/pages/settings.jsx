import React, { useState } from "react";
import "../../../style/wallet/pages/settings.css";

const PREFS = [
    { key: "currency", label: "Currency",  value: "LKR (Rs)" },
    { key: "language", label: "Language",  value: "English"   },
    { key: "timezone", label: "Timezone",  value: "UTC+5:30"  },
    { key: "theme",    label: "Theme",     value: "Dark Mode" },
];

const Settings = () => {
    const [profEdit, setProfEdit]   = useState(false);
    const [form, setForm]           = useState({ name: "Pasindu Lakmal", email: "pasindu@example.com" });
    const [draft, setDraft]         = useState({ ...form });
    const [twoFA, setTwoFA]         = useState(true);
    const [biometric, setBiometric] = useState(false);
    const [notifs, setNotifs]       = useState(true);
    const [reports, setReports]     = useState(true);

    const save   = () => { setForm({ ...draft }); setProfEdit(false); };
    const cancel = () => { setDraft({ ...form }); setProfEdit(false); };

    return (
        <div className="st-content">
            <div className="st-panel">

                <div className="st-hero">
                    <div className="st-avatar">{form.name.charAt(0)}</div>
                    <div className="st-hero-info">
                        <div className="st-name">{form.name}</div>
                        <div className="st-email">{form.email}</div>
                        <span className="st-verified">
                            <i className="ti ti-circle-check" aria-hidden="true" /> Verified
                        </span>
                    </div>
                    {!profEdit && (
                        <button className="st-edit-btn" onClick={() => setProfEdit(true)}>
                            <i className="ti ti-pencil" aria-hidden="true" /> Edit
                        </button>
                    )}
                </div>

                {profEdit && (
                    <>
                        <div className="st-form-grid">
                            <div className="st-form-group">
                                <label>Full name</label>
                                <input className="st-input" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} />
                            </div>
                            <div className="st-form-group">
                                <label>Email address</label>
                                <input className="st-input" type="email" value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })} />
                            </div>
                        </div>
                        <div className="st-actions">
                            <button className="st-save-btn" onClick={save}>Save changes</button>
                            <button className="st-cancel-btn" onClick={cancel}>Cancel</button>
                        </div>
                    </>
                )}

                <div className="st-divider" />
                <p className="st-sec-title">Security</p>

                {[
                    { label: "Two-factor authentication", sub: "Enabled via SMS",         state: twoFA,     toggle: () => setTwoFA(!twoFA)         },
                    { label: "Biometric login",           sub: "Fingerprint / Face ID",    state: biometric, toggle: () => setBiometric(!biometric) },
                    { label: "Transfer notifications",    sub: "Alert on every transfer",  state: notifs,    toggle: () => setNotifs(!notifs)       },
                    { label: "Monthly reports",           sub: "Summary sent every month", state: reports,   toggle: () => setReports(!reports)     },
                ].map(({ label, sub, state, toggle }) => (
                    <div className="st-setting-row" key={label}>
                        <div>
                            <div className="st-setting-label">{label}</div>
                            <div className="st-setting-sub">{sub}</div>
                        </div>
                        <div className={`st-toggle ${state ? "on" : ""}`} onClick={toggle}>
                            <div className="st-handle" />
                        </div>
                    </div>
                ))}

                <div className="st-divider" />
                <p className="st-sec-title">Account actions</p>

                <div className="st-btn-row">
                    <button className="st-outline-btn">
                        <i className="ti ti-lock" aria-hidden="true" /> Change password
                    </button>
                    <button className="st-outline-btn">
                        <i className="ti ti-download" aria-hidden="true" /> Export my data
                    </button>
                </div>
                <button className="st-outline-btn st-danger" style={{ marginTop: 8 }}>
                    <i className="ti ti-trash" aria-hidden="true" /> Delete account
                </button>
            </div>

            <div className="st-right">
                <p className="st-sec-title">Preferences</p>

                {PREFS.map(({ key, label, value }) => (
                    <div className="st-pref-row" key={key}>
                        <span className="st-pref-label">{label}</span>
                        <span className="st-pref-val">{value} <i className="ti ti-chevron-right" style={{ fontSize: 11, verticalAlign: -1 }} /></span>
                    </div>
                ))}

                <div className="st-divider" />
                <p className="st-sec-title">Quick links</p>

                {[
                    { icon: "ti-user",         label: "Profile",             sub: "View & edit profile"   },
                    { icon: "ti-bell",         label: "Notifications",       sub: "Manage alert settings" },
                    { icon: "ti-help-circle",  label: "Help & Support",      sub: "FAQs and contact"      },
                ].map(({ icon, label, sub }) => (
                    <div className="st-link-row" key={label}>
                        <div className="st-link-ico"><i className={`ti ${icon}`} aria-hidden="true" /></div>
                        <div>
                            <div className="st-link-label">{label}</div>
                            <div className="st-link-sub">{sub}</div>
                        </div>
                        <i className="ti ti-chevron-right st-link-arrow" aria-hidden="true" />
                    </div>
                ))}

                <div className="st-divider" />
                <button className="st-outline-btn st-logout">
                    <i className="ti ti-logout" aria-hidden="true" /> Sign out
                </button>
            </div>
        </div>
    );
};

export default Settings;
