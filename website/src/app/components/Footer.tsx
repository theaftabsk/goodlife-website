"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer({ hideTopBanner = false }: { hideTopBanner?: boolean } = {}) {
  const [settings, setSettings] = useState({
    companyName: "GOOD LIFE SUTRA PVT. LTD.",
    phone: "+91 88821 57074",
    email: "growth@goodlifesutra.com",
    address: "Plot 42, Udyog Vihar Phase IV, Sector 18, Gurugram, Haryana 122015, India",
    cinNumber: "U74999MH2021PTC368942",
    registeredCity: "Mumbai & Gurugram, India",
    preFooterTag: "READY TO SCALE?",
    preFooterHeading: "Grow your ecommerce business with us",
    preFooterSubtext: "Request our complimentary Commerce Diagnostic to identify leakage points and unlock new channel growth.",
    preFooterCta: "UNLOCK YOUR GROWTH →",
    copyrightText: "© 2026 Goodlife Sutra Pvt Ltd / Site & Operations by GoodLife",
    linkedinUrl: "https://linkedin.com/company/good-life-sutra",
    twitterUrl: "https://x.com/goodlifesutra",
    instagramUrl: "https://instagram.com/goodlifesutra",
    youtubeUrl: "https://youtube.com/@goodlifesutra"
  });

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://api.brandorbit.tech"}/api/v1/settings`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch settings");
      })
      .then((data) => {
        if (data && data.companyName) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://api.brandorbit.tech"}/api/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newsletterEmail,
          intent: "Newsletter Subscription",
          source: "Footer Newsletter"
        })
      });
    } catch (_) {}

    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setSubscribed(false);
    }, 4500);
  };

  return (
    <footer style={{
      width: "100%",
      backgroundColor: "#FFFFFF",
      color: "#0F172A",
      fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)",
      position: "relative",
      overflow: "hidden"
    }}>
      <style jsx global>{`
        /* ── LUXURY CURVED FOOTER STYLES ── */
        .gl-footer-wrapper {
          width: 100%;
          padding: 2.5rem 1.5rem 2rem;
          box-sizing: border-box;
          max-width: 1440px;
          margin: 0 auto;
        }

        .gl-curved-card {
          position: relative;
          background: linear-gradient(145deg, #1D4ED8 0%, #2563EB 50%, #1E40AF 100%);
          border-radius: 260px 40px 40px 260px;
          padding: 4.5rem 4rem 4.5rem 6.5rem;
          overflow: hidden;
          box-shadow: 0 24px 60px -12px rgba(29, 78, 216, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25);
          transition: all 0.3s ease;
        }

        /* Ambient subtle inner glow */
        .gl-curved-card::before {
          content: "";
          position: absolute;
          top: -20%;
          left: -10%;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.35) 0%, rgba(37, 99, 235, 0.1) 50%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
        }

        .gl-footer-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.4fr 0.9fr 0.9fr 1.3fr;
          gap: 2.5rem 3rem;
          align-items: start;
        }

        .gl-footer-col-title {
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: #DBEAFE;
          margin-bottom: 1.25rem;
          font-family: var(--font-sans, 'Plus Jakarta Sans', sans-serif);
        }

        .gl-footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .gl-footer-links-list a {
          color: #FFFFFF;
          font-size: 0.92rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-block;
          font-family: var(--font-sans, 'Plus Jakarta Sans', sans-serif);
        }

        .gl-footer-links-list a:hover {
          color: #BAE6FD;
          transform: translateX(4px);
        }

        /* Newsletter Input Pill */
        .gl-newsletter-pill {
          background: rgba(255, 255, 255, 0.12);
          border: 1.5px solid rgba(255, 255, 255, 0.38);
          border-radius: 999px;
          padding: 5px 6px 5px 20px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.25s ease;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.08);
        }

        .gl-newsletter-pill:focus-within {
          background: rgba(255, 255, 255, 0.2);
          border-color: #FFFFFF;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.18);
        }

        .gl-newsletter-input {
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-family: var(--font-sans, 'Plus Jakarta Sans', sans-serif);
          font-size: 0.92rem;
          font-weight: 500;
          flex: 1;
          min-width: 0;
        }

        .gl-newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.75);
          font-weight: 400;
        }

        .gl-newsletter-btn {
          background: #FFFFFF;
          color: #1D4ED8;
          border: none;
          outline: none;
          border-radius: 999px;
          padding: 0.65rem 1.6rem;
          font-size: 0.88rem;
          font-weight: 800;
          letter-spacing: 0.2px;
          cursor: pointer;
          font-family: var(--font-sans, 'Plus Jakarta Sans', sans-serif);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        .gl-newsletter-btn:hover {
          background: #EFF6FF;
          color: #1E40AF;
          transform: scale(1.03);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);
        }

        /* Circular Social Icon Buttons */
        .gl-social-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.16);
          border: 1px solid rgba(255, 255, 255, 0.32);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .gl-social-icon-btn:hover {
          background: #FFFFFF;
          color: #1D4ED8;
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        /* ── RESPONSIVE DESIGN (Full Mobile Friendly) ── */
        @media (max-width: 1024px) {
          .gl-curved-card {
            padding: 4rem 3.5rem 3.5rem 4.5rem;
            border-radius: 180px 36px 36px 180px;
          }
          .gl-footer-grid {
            grid-template-columns: 1.2fr 1fr 1fr;
            gap: 2.5rem 2rem;
          }
          .gl-col-newsletter {
            grid-column: span 3;
            max-width: 620px;
          }
        }

        @media (max-width: 768px) {
          .gl-footer-wrapper {
            padding: 1.5rem 1rem 2rem;
          }
          .gl-curved-card {
            border-radius: 44px 44px 28px 28px !important;
            padding: 3.2rem 1.8rem 2.8rem !important;
            text-align: left;
          }
          .gl-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2.5rem 1.5rem !important;
          }
          .gl-col-brand {
            grid-column: span 2 !important;
            padding-bottom: 0.5rem;
          }
          .gl-col-newsletter {
            grid-column: span 2 !important;
            margin-top: 0.5rem;
            padding-top: 1.8rem;
            border-top: 1px solid rgba(255, 255, 255, 0.18);
          }
        }

        @media (max-width: 520px) {
          .gl-footer-wrapper {
            padding: 1rem 0.65rem 1.5rem;
          }
          .gl-curved-card {
            border-radius: 32px 32px 22px 22px !important;
            padding: 2.6rem 1.25rem 2.2rem !important;
          }
          .gl-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem 1.2rem !important;
          }
          .gl-col-brand {
            grid-column: span 2 !important;
          }
          .gl-col-newsletter {
            grid-column: span 2 !important;
          }
          .gl-newsletter-pill {
            flex-direction: column;
            align-items: stretch;
            padding: 8px 10px;
            border-radius: 18px;
            gap: 0.65rem;
          }
          .gl-newsletter-input {
            padding: 0.4rem 0.6rem;
            font-size: 0.92rem;
          }
          .gl-newsletter-btn {
            width: 100%;
            padding: 0.72rem;
            font-size: 0.88rem;
          }
        }
      `}</style>

      {/* ── LUXURY CURVED BLUE & WHITE FOOTER CONTAINER ── */}
      <div className="gl-footer-wrapper">
        <div className="gl-curved-card">
          
          <div className="gl-footer-grid">

            {/* Column 1: Brand Mission & Legal Info */}
            <div className="gl-col-brand">
              <h3 style={{
                fontSize: "clamp(1.4rem, 2.2vw, 1.85rem)",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.25,
                marginBottom: "0.85rem",
                fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)",
                letterSpacing: "-0.02em"
              }}>
                Scale Ecommerce.<br />Not Complexity!
              </h3>
              
              <p style={{
                fontSize: "0.82rem",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: 1.6,
                marginBottom: "1.4rem",
                maxWidth: "340px",
                fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)"
              }}>
                {settings.copyrightText}
              </p>

              {/* Direct Reach Line */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                fontSize: "0.82rem",
                color: "rgba(255, 255, 255, 0.9)"
              }}>
                <div>
                  <span style={{ color: "#BAE6FD" }}>Direct Line: </span>
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: 700 }}>
                    {settings.phone}
                  </a>
                </div>
                <div>
                  <span style={{ color: "#BAE6FD" }}>Inquiry: </span>
                  <a href={`mailto:${settings.email}`} style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: 700 }}>
                    {settings.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Navigation (Solutions) */}
            <div>
              <div className="gl-footer-col-title">NAVIGATION</div>
              <ul className="gl-footer-links-list">
                <li><Link href="/solutions/launch-online">Launch Online</Link></li>
                <li><Link href="/solutions/fix-and-grow">Fix & Grow</Link></li>
                <li><Link href="/solutions/scale-pan-india">Scale Pan-India</Link></li>
                <li><Link href="/specialised/heavy-bulky-commerce">Heavy & Bulky</Link></li>
                <li><Link href="/specialised/fulfilment-network">Fulfilment Map</Link></li>
                <li><Link href="/specialised/agency-partner">Agency Partners</Link></li>
              </ul>
            </div>

            {/* Column 3: Support & Company */}
            <div>
              <div className="gl-footer-col-title">SUPPORT</div>
              <ul className="gl-footer-links-list">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/case-studies">Case Studies</Link></li>
                <li><Link href="/insights">Insights & News</Link></li>
                <li><Link href="/faqs">Verified FAQs</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Column 4: Newsletter & Social Follow */}
            <div className="gl-col-newsletter">
              <div className="gl-footer-col-title">GET THE LATEST FROM GOODLIFE.</div>
              
              <form onSubmit={handleSubscribe} style={{ marginBottom: "1.8rem" }}>
                <div className="gl-newsletter-pill">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="gl-newsletter-input"
                  />
                  <button type="submit" className="gl-newsletter-btn">
                    {subscribed ? "Subscribed! ✓" : "Subscribe"}
                  </button>
                </div>
                {subscribed && (
                  <div style={{ color: "#EFF6FF", fontSize: "0.82rem", marginTop: "0.5rem", fontWeight: 700 }}>
                    Thank you for subscribing to GoodLife updates!
                  </div>
                )}
              </form>

              {/* Social Media Circular Buttons */}
              <div className="gl-footer-col-title" style={{ marginBottom: "0.85rem" }}>FOLLOW US</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                
                {/* LinkedIn */}
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="gl-social-icon-btn"
                  title="LinkedIn"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href={settings.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="gl-social-icon-btn"
                  title="Twitter / X"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="gl-social-icon-btn"
                  title="Instagram"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="gl-social-icon-btn"
                  title="YouTube"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com/goodlifesutra"
                  target="_blank"
                  rel="noreferrer"
                  className="gl-social-icon-btn"
                  title="Facebook"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

              </div>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
