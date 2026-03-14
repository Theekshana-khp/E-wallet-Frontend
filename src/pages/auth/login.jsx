import React from 'react';
import '../../style/auth/Login.css';
import logoImage from '../../assets/images/logo/logo.png';

function Login() {
    return (
        <div>
            <div className="bg-scene"></div>

            <div className="particles" id="particles"></div>

            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>

            <div className="shell">
                <div className="card-login">

                    {/* Logo */}
                    <div className="logo-wrap">
                        <div className="logo-icon"><img src={logoImage}/></div>
                        <div className="logo-text">
                            <div className="brand">VaultX</div>
                            <div className="tagline">Secure E-Wallet</div>
                        </div>
                    </div>

                    {/* Live status pill */}


                    {/* Heading */}
                    <div className="heading-block">
                        <h1>
                            Access Your Wallet
                        </h1>
                        <div className="balance-pill">
                            <div className="balance-dot"></div>
                            <span className="balance-text">Sign in to manage your funds &amp; transactions</span>
                        </div>
                    </div>

                    {/* Fields */}
                    <div className="field-group">
                        <div className="field">
                            <input type="email" id="email" placeholder="Email Address" autoComplete="off" />
                            <span className="field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7L13.03 12.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
                        </div>
                        <div className="field">
                            <input type="password" id="password" placeholder="Password" />
                            <span className="field-icon" id="togglePwd">
                <svg id="eyeIcon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
                        </div>
                    </div>

                    {/* Meta row */}
                    <div className="meta-row">
                        <label className="check-label">
                            <input type="checkbox" id="remember" />
                            <span className="checkmark">✓</span>
                            Remember this session
                        </label>
                    </div>

                    {/* CTA */}
                    <button className="btn-cta" id="loginBtn">Initialize Connection</button>

                </div>
            </div>
        </div>
    );
}

export default Login;