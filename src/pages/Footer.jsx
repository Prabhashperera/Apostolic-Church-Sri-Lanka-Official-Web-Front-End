import React, { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import logoImg from "../assets/images/logoorg.jpg";


/* -------------------------------------------------------
   Icons
------------------------------------------------------- */

function YoutubeIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M14 8.5h-1.5c-1 0-1.5.5-1.5 1.5v2h3l-.4 2.5h-2.6V21" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

/* -------------------------------------------------------
   Data
------------------------------------------------------- */

const logoSrc = logoImg;

const contact = {
  phone: "+94 71 234 5678",
  email: "info@apostolicchurch.org",
};

const location = {
  lines: ["28/6 Peiris Avenue", "Colombo", "Moratuwa."],
};

const navLinks = ["Home", "About Us", "Events", "Contact Us"];

/* -------------------------------------------------------
   Footer
------------------------------------------------------- */

function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const node = footerRef.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`ac-footer ${isVisible ? "is-visible" : ""}`}
    >
      <style>{`

        /* =================================================
           FOOTER BASE
        ================================================= */

        .ac-footer {
          --bg: #0c0d0c;
          --paper: #ffffff;
          --muted: rgba(255, 255, 255, 0.72);
          --accent: #3b82f6;
          --accent-soft: #7fb1ff;
          --accent-deep: #1d4ed8;
          --line: rgba(255, 255, 255, 0.12);

          /* Poppins applied to entire footer */
          font-family: "Poppins", sans-serif;

          position: relative;
          overflow: hidden;
          background: var(--bg);
          border-radius: 2.25rem 2.25rem 0 0;
          padding: 3.5rem 1.5rem 2rem;

          color: var(--paper);

          box-sizing: border-box;
        }

        .ac-footer *,
        .ac-footer *::before,
        .ac-footer *::after {
          box-sizing: border-box;
        }

        @media (min-width: 640px) {
          .ac-footer {
            padding: 4.5rem 2.5rem 2rem;
          }
        }

        @media (min-width: 1024px) {
          .ac-footer {
            padding: 5rem 4.5rem 2.25rem;
          }
        }


        /* =================================================
           TOP GLOW / RIM
        ================================================= */

        .ac-rim {
          position: absolute;
          top: 0;
          left: 8%;
          right: 8%;
          height: 3px;

          background: linear-gradient(
            90deg,
            transparent,
            var(--accent) 30%,
            var(--accent-soft) 50%,
            var(--accent) 70%,
            transparent
          );

          filter: blur(0.5px);
        }

        .ac-rim-glow {
          position: absolute;
          top: -20px;
          left: 15%;
          right: 15%;
          height: 60px;

          background: radial-gradient(
            ellipse at center,
            rgba(59, 130, 246, 0.35),
            transparent 70%
          );

          pointer-events: none;
        }


        /* =================================================
           INNER CONTAINER
        ================================================= */

        .ac-inner {
          position: relative;
          max-width: 78rem;
          margin: 0 auto;
        }


        /* =================================================
           REVEAL ANIMATION
        ================================================= */

        .ac-reveal {
          opacity: 0;
          transform: translateY(16px);

          transition:
            opacity 0.7s ease,
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .is-visible .ac-reveal {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .ac-reveal {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }


        /* =================================================
           FOOTER TOP GRID
        ================================================= */

        .ac-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.75rem;
          padding-bottom: 3rem;
        }

        @media (min-width: 900px) {
          .ac-top {
            grid-template-columns:
              1fr
              1fr
              1fr
              1.15fr;

            align-items: start;
            gap: 2rem;
          }
        }


        /* =================================================
           LOGO
        ================================================= */

        .ac-logo-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .ac-logo-mark {
          position: relative;

          width: 52px;
          height: 52px;

          flex-shrink: 0;

          border-radius: 0.85rem;

          border: 1.5px dashed rgba(245, 243, 238, 0.28);

          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (prefers-reduced-motion: no-preference) {
          .ac-logo-mark {
            animation: acBreathe 3.4s ease-in-out infinite;
          }
        }

        @keyframes acBreathe {
          0%,
          100% {
            border-color: rgba(245, 243, 238, 0.28);
          }

          50% {
            border-color: rgba(59, 130, 246, 0.55);
          }
        }

        .ac-logo-mark span {
          font-family: "Poppins", sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.03em;
          color: var(--muted);
        }

        .ac-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 0.85rem;
        }

        .ac-brand-name {
          font-family: "Poppins", sans-serif;
          font-weight: 600;
          font-size: 1.15rem;
          line-height: 1.25;
          margin: 0;
        }

        .ac-brand-name small {
          display: block;
          font-family: "Poppins", sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--muted);
          margin-top: 0.15rem;
        }


        /* =================================================
           HEADINGS
        ================================================= */

        .ac-heading {
          font-family: "Poppins", sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--paper);
          margin-bottom: 1rem;
        }


        /* =================================================
           CONTACT
        ================================================= */

        .ac-contact-line,
        .ac-location p {
          display: flex;
          align-items: center;
          gap: 0.55rem;

          font-family: "Poppins", sans-serif;
          font-size: 0.92rem;
          font-weight: 500;

          color: var(--muted);

          margin-bottom: 0.65rem;
        }

        .ac-location p {
          align-items: flex-start;
          margin-bottom: 0.2rem;
        }

        .ac-contact-line svg,
        .ac-location svg {
          color: var(--accent);
          flex-shrink: 0;
        }

        .ac-contact-line a {
          color: inherit;
          text-decoration: none;

          transition: color 0.2s ease;
        }

        .ac-contact-line a:hover {
          color: var(--paper);
        }


        /* =================================================
           SOCIAL ICONS
        ================================================= */

        .ac-social {
          display: flex;
          gap: 0.6rem;
          margin-top: 1.1rem;
        }

        .ac-social a {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          width: 2.15rem;
          height: 2.15rem;

          border-radius: 999px;

          border: 1px solid var(--line);

          color: var(--paper);

          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            color 0.25s ease,
            background 0.25s ease;
        }

        .ac-social a:hover {
          transform: translateY(-2px);

          border-color: var(--accent);
          color: var(--accent);

          background: rgba(59, 130, 246, 0.08);
        }

        .ac-social a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }


        /* =================================================
           HEADLINE
        ================================================= */

        .ac-headline {
          font-family: "Poppins", sans-serif;
          font-weight: 700;
          font-size: 1.7rem;
          line-height: 1.35;
          letter-spacing: -0.01em;
          margin: 0;
        }

        @media (min-width: 900px) {
          .ac-headline {
            font-size: 1.9rem;
            text-align: right;
          }
        }

        .ac-headline em {
          font-family: "Poppins", sans-serif;
          font-style: italic;
          font-weight: 700;
        }


        /* =================================================
           DIVIDER
        ================================================= */

        .ac-divider {
          border-top: 1px solid var(--line);
        }


        /* =================================================
           NAVIGATION
        ================================================= */

        .ac-nav {
          display: flex;
          flex-wrap: wrap;

          justify-content: center;

          gap: 2rem;

          padding: 2rem 0 1.25rem;
        }

        .ac-nav a {
          position: relative;

          font-family: "Poppins", sans-serif;
          font-size: 0.88rem;
          font-weight: 500;

          color: var(--muted);

          text-decoration: none;

          padding-bottom: 3px;

          transition: color 0.2s ease;
        }

        .ac-nav a::after {
          content: "";

          position: absolute;

          left: 0;
          bottom: 0;

          width: 100%;
          height: 1px;

          background: var(--accent);

          transform: scaleX(0);
          transform-origin: left;

          transition: transform 0.35s ease;
        }

        .ac-nav a:hover {
          color: var(--paper);
        }

        .ac-nav a:hover::after {
          transform: scaleX(1);
        }

        .ac-nav a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }


        /* =================================================
           COPYRIGHT
        ================================================= */

        .ac-copyright {
          text-align: center;

          font-family: "Poppins", sans-serif;
          font-size: 0.78rem;
          font-weight: 500;

          color: var(--muted);

          opacity: 0.8;

          margin: 0;
        }

      `}</style>

      {/* Decorative elements */}
      <div className="ac-rim-glow" />
      <div className="ac-rim" />

      <div className="ac-inner">

        {/* =================================================
            TOP SECTION
        ================================================= */}

        <div className="ac-top">

          {/* Brand */}
          <div
            className="ac-reveal"
            style={{ transitionDelay: "0ms" }}
          >
            <div className="ac-logo-row">

              <div className="ac-logo-mark">
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt="Apostolic Church logo"
                    className="ac-logo-img"
                  />
                ) : (
                  <span>LOGO</span>
                )}
              </div>

              <p className="ac-brand-name">
                Apostolic Church
                <small>Ministries</small>
              </p>

            </div>
          </div>


          {/* Contact */}
          <div
            className="ac-reveal"
            style={{ transitionDelay: "80ms" }}
          >
            <p className="ac-heading">
              Contact
            </p>

            <p className="ac-contact-line">
              <Phone size={15} />

              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              >
                {contact.phone}
              </a>
            </p>

            <p className="ac-contact-line">
              <Mail size={15} />

              <a href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>

            <div className="ac-social">

              <a
                href="#"
                aria-label="YouTube"
              >
                <YoutubeIcon size={16} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>

              <a
                href="#"
                aria-label="X"
              >
                <XIcon size={16} />
              </a>

              <a
                href="#"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>

            </div>
          </div>


          {/* Location */}
          <div
            className="ac-reveal"
            style={{ transitionDelay: "160ms" }}
          >
            <p className="ac-heading">
              Head Office
            </p>

            <div className="ac-location">

              <p>
                <MapPin size={15} />

                <span>
                  {location.lines.map((line, i) => (
                    <span
                      key={i}
                      style={{ display: "block" }}
                    >
                      {line}
                    </span>
                  ))}
                </span>

              </p>

            </div>
          </div>


          {/* Statement */}
          <div
            className="ac-reveal"
            style={{ transitionDelay: "240ms" }}
          >
            <p className="ac-headline">
              Established in the Word,
              <br />
              <em>sent</em> to the Nations.
            </p>
          </div>

        </div>


        {/* =================================================
            BOTTOM SECTION
        ================================================= */}

        <div className="ac-divider">

          <nav className="ac-nav">

            {navLinks.map((link) => (
              <a
                href="#"
                key={link}
              >
                {link}
              </a>
            ))}

          </nav>

          <p className="ac-copyright">
            Copyright © {year} Apostolic Church.
            All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;