'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    modelInterest: '',
    budgetRange: '',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');

  // Testimonial Slider State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerPage, setSlidesPerPage] = useState(3);

  const reviews = [
    {
      quote: "Saved over ₹40,000 on my ThinkPad for my computer science courses. The machine arrived in pristine condition, battery health was at 96%, and it boots in seconds!",
      name: "Rohan Sharma",
      role: "CS Student @ Delhi University",
      image: "/images/customer_1.png",
    },
    {
      quote: "As a remote software developer, I need extreme reliability. My Dell Latitude 7490 handles docker containers, IDEs, and multi-monitor setups flawlessly.",
      name: "Priya Patel",
      role: "Senior Software Engineer, Gurgaon",
      image: "/images/customer_2.png",
    },
    {
      quote: "Fast same-day delivery in Delhi NCR, crisp packaging, and the 1-year warranty gave me total peace of mind. Utkarsh Computers is now my default tech choice!",
      name: "Amitabh Verma",
      role: "Digital Consultant, Dwarka",
      image: "/images/customer_3.png",
    },
    {
      quote: "Purchased an HP EliteBook 840 G5 for my MBA financial modeling. Super sleek aluminum body, blazing fast SSD performance, and amazing value for money!",
      name: "Neha Gupta",
      role: "MBA Student @ FMS Delhi",
      image: "/images/customer_4.png",
    },
    {
      quote: "Utkarsh Computers supplied 15 refurbished Dell & ThinkPad laptops for our tech team and configured our Wi-Fi mesh network. Exceptional service!",
      name: "Vikramaditya Singh",
      role: "IT Manager, Noida Sector 62",
      image: "/images/customer_5.png",
    },
    {
      quote: "The Full HD display color accuracy on the Dell Latitude is incredible for Photoshop & Illustrator work. Plus, their 1-year warranty makes it 100% risk-free.",
      name: "Sanya Malhotra",
      role: "Graphic Designer, Saket",
      image: "/images/customer_6.png",
    },
    {
      quote: "Got my personal laptop's motherboard repaired and SSD upgraded at Utkarsh Computers in Sector 13 Dwarka. Friendly engineers, transparent pricing, and fixed quickly!",
      name: "Deepak Joshi",
      role: "College Lecturer, Janakpuri",
      image: "/images/customer_7.png",
    },
    {
      quote: "Top quality laptops at half the new retail price! Great customer support on WhatsApp, hassle-free warranty claim process, and 100% genuine hardware.",
      name: "Ananya Rao",
      role: "Content Creator, Dwarka",
      image: "/images/customer_8.png",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesPerPage(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesPerPage(2);
      } else {
        setSlidesPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - slidesPerPage);

  // Auto Slider Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 3500);
    return () => clearInterval(timer);
  }, [maxIndex]);

  const handleBuyNow = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) errors.fullName = true;
    if (!emailRegex.test(formData.email.trim())) errors.email = true;
    if (formData.phone.trim().length < 7) errors.phone = true;
    if (!formData.modelInterest) errors.modelInterest = true;
    if (!formData.budgetRange) errors.budgetRange = true;

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setQuoteReference(`#RT-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    }
  };

  return (
    <div>
      {/* HEADER & NAVBAR */}
      <header className="header">
        <div className="container nav-container">
          <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img src="/images/logo.png" alt="Utkarsh Computers Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                Utkarsh <span style={{ color: '#dc2626' }}>Computers</span>
              </span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.03em' }}>
                REFURBISHED LAPTOPS &amp; SERVICES
              </span>
            </div>
          </a>

          <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <a href="#home" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Products</a>
            <a href="#services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#benefits" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#quote" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a
              href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20a%20refurbished%20laptop."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm nav-btn-mobile"
            >
              Shop Now
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </a>
          </nav>

          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero" id="home">
          <div className="hero-bg-pattern"></div>
          <div className="container hero-grid">
            <div className="hero-text-content">
              <div className="hero-tag">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Rated #1 Refurbished Laptop Provider
              </div>

              <h1 className="hero-headline">
                Quality Refurbished Laptops at <span>Unbeatable Prices</span>.
              </h1>

              <p className="hero-subheadline">
                30-day money-back guarantee, 1-year warranty, and rigorously tested devices. Premium performance engineered for budget-conscious students &amp; remote professionals.
              </p>

              <div className="hero-cta-group">
                <a href="#products" className="btn btn-primary">
                  Browse Laptops
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>

                <a href="tel:+918700747243" className="btn btn-secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Call +91 87007 47243
                </a>

                <a
                  href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20am%20interested%20in%20refurbished%20laptops%2Fservices."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ backgroundColor: '#25d366', color: '#ffffff', border: 'none' }}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card-preview">
                <div className="hero-img-wrapper">
                  <img src="/images/dell_latitude.png" alt="Featured Refurbished Laptop Preview" />
                  <div className="hero-badge-overlay">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    40-Point Hardware Inspected
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Dell Latitude 7490</h3>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Intel i7 • 16GB RAM • 512GB SSD</p>
                  </div>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#38bdf8' }}>₹28,999</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BADGES ROW */}
        <section className="trust-badges-section">
          <div className="container">
            <div className="trust-badges-grid">
              <div className="trust-badge-item">
                <div className="trust-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div className="trust-text-box">
                  <h4>Certified Refurbished</h4>
                  <p>Multi-point diagnostic inspection</p>
                </div>
              </div>

              <div className="trust-badge-item">
                <div className="trust-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <div className="trust-text-box">
                  <h4>Free Shipping</h4>
                  <p>On all orders nationwide</p>
                </div>
              </div>

              <div className="trust-badge-item">
                <div className="trust-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                </div>
                <div className="trust-text-box">
                  <h4>24/7 Support</h4>
                  <p>Expert technical assistance</p>
                </div>
              </div>

              <div className="trust-badge-item">
                <div className="trust-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <div className="trust-text-box">
                  <h4>Secure Payment</h4>
                  <p>256-bit encrypted checkout</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="products-section section-padding" id="products">
          <div className="container">
            <h2 className="section-title">Featured Refurbished Laptops</h2>
            <p className="section-subtitle">
              Hand-inspected, enterprise-grade laptops tailored for speed, durability, and reliability.
            </p>

            <div className="products-grid">
              {/* Product 1 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">Save 61%</span>
                  <img src="/images/dell_latitude.png" alt="Dell Latitude 7490 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">Dell Latitude 7490</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                        <rect x="9" y="9" width="6" height="6"></rect>
                      </svg>
                      <span>Intel Core i7 (8th Gen) @ 1.90 GHz</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path>
                      </svg>
                      <span>16GB DDR4 High-Speed RAM</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="12" x2="2" y2="12"></line>
                        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                      </svg>
                      <span>512GB NVMe M.2 Solid State Drive</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <div className="price-box">
                      <span className="current-price">₹28,999</span>
                      <span className="original-price">₹74,999 Original</span>
                    </div>
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20Dell%20Latitude%207490%20(₹28,999)."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 2 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">Save 62%</span>
                  <img src="/images/lenovo_thinkpad.png" alt="Lenovo ThinkPad T480 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">Lenovo ThinkPad T480</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                        <rect x="9" y="9" width="6" height="6"></rect>
                      </svg>
                      <span>Intel Core i5 (8th Gen) @ 1.70 GHz</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path>
                      </svg>
                      <span>16GB DDR4 RAM</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="12" x2="2" y2="12"></line>
                        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                      </svg>
                      <span>256GB NVMe SSD</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <div className="price-box">
                      <span className="current-price">₹24,999</span>
                      <span className="original-price">₹65,999 Original</span>
                    </div>
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20Lenovo%20ThinkPad%20T480%20(₹24,999)."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 3 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">Save 63%</span>
                  <img src="/images/hp_elitebook.png" alt="HP EliteBook 840 G5 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">HP EliteBook 840 G5</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                        <rect x="9" y="9" width="6" height="6"></rect>
                      </svg>
                      <span>Intel Core i7 (8th Gen) @ 1.90 GHz</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path>
                      </svg>
                      <span>16GB DDR4 RAM</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="12" x2="2" y2="12"></line>
                        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                      </svg>
                      <span>512GB NVMe SSD</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <div className="price-box">
                      <span className="current-price">₹22,999</span>
                      <span className="original-price">₹61,999 Original</span>
                    </div>
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20HP%20EliteBook%20840%20G5%20(₹22,999)."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="services-section section-padding" id="services">
          <div className="container">
            <h2 className="section-title">Our Professional IT Services</h2>
            <p className="section-subtitle">
              Comprehensive hardware repair, software optimization, and networking solutions across Delhi NCR.
            </p>

            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon-box">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <h3 className="service-title">1. Laptop Repair</h3>
                <p className="service-description">
                  Fast, reliable hardware diagnosis &amp; component repair for all major laptop brands (Dell, Lenovo, HP, Asus, Acer, Apple).
                </p>
                <ul className="service-features">
                  <li className="service-feature-item">✓ Screen &amp; Display Replacements</li>
                  <li className="service-feature-item">✓ Battery &amp; Charging Port Repair</li>
                  <li className="service-feature-item">✓ Motherboard Chip-Level Servicing</li>
                  <li className="service-feature-item">✓ Keyboard &amp; Liquid Damage Fixes</li>
                </ul>
                <a href="#quote" className="btn btn-secondary btn-sm service-btn">Book Repair Quote</a>
              </div>

              <div className="service-card">
                <div className="service-icon-box">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <h3 className="service-title">2. Software Solutions</h3>
                <p className="service-description">
                  Complete OS setup, virus &amp; malware eradication, system performance tuning, and essential software installations.
                </p>
                <ul className="service-features">
                  <li className="service-feature-item">✓ Windows 11 / Linux Fresh OS Setup</li>
                  <li className="service-feature-item">✓ Virus, Malware &amp; Ransomware Cleanup</li>
                  <li className="service-feature-item">✓ Data Backup &amp; Hard Drive Recovery</li>
                  <li className="service-feature-item">✓ Office Suite &amp; Driver Optimization</li>
                </ul>
                <a href="#quote" className="btn btn-secondary btn-sm service-btn">Request Software Help</a>
              </div>

              <div className="service-card">
                <div className="service-icon-box">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="6" height="6" rx="1"></rect>
                    <rect x="16" y="2" width="6" height="6" rx="1"></rect>
                    <rect x="9" y="16" width="6" height="6" rx="1"></rect>
                  </svg>
                </div>
                <h3 className="service-title">3. Networking Services</h3>
                <p className="service-description">
                  End-to-end network deployment, Wi-Fi mesh configuration, router installation, and secure office Ethernet cabling.
                </p>
                <ul className="service-features">
                  <li className="service-feature-item">✓ Wi-Fi Router &amp; Mesh Setup</li>
                  <li className="service-feature-item">✓ Structured Ethernet LAN Cabling</li>
                  <li className="service-feature-item">✓ Network Security &amp; Firewall Config</li>
                  <li className="service-feature-item">✓ Office &amp; Home Network Troubleshooting</li>
                </ul>
                <a href="#quote" className="btn btn-secondary btn-sm service-btn">Setup Network Service</a>
              </div>
            </div>
          </div>
        </section>

        {/* CUSTOMER TESTIMONIALS SLIDER */}
        <section className="testimonials-section section-padding">
          <div className="container">
            <h2 className="section-title">Loved by 10,000+ Happy Customers</h2>
            <p className="section-subtitle">
              Real feedback from students, working professionals, and business owners across Delhi NCR and India.
            </p>

            <div className="testimonial-slider-container">
              <div
                className="testimonial-track"
                style={{
                  transform: `translateX(-${currentIndex * (100 / slidesPerPage)}%)`,
                }}
              >
                {reviews.map((rev, idx) => (
                  <div className="testimonial-card-slide" key={idx}>
                    <div className="testimonial-card">
                      <div>
                        <div className="star-rating">★★★★★</div>
                        <p className="testimonial-quote">"{rev.quote}"</p>
                      </div>
                      <div className="testimonial-author">
                        <div className="author-avatar">
                          <img src={rev.image} alt={rev.name} />
                        </div>
                        <div className="author-info">
                          <h4>{rev.name}</h4>
                          <p>{rev.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="slider-controls">
              <button
                className="slider-arrow-btn"
                onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))}
                aria-label="Previous Review"
              >
                ‹
              </button>
              <div className="slider-dots-container">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <div
                    key={i}
                    className={`slider-dot ${i === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(i)}
                  ></div>
                ))}
              </div>
              <button
                className="slider-arrow-btn"
                onClick={() => setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))}
                aria-label="Next Review"
              >
                ›
              </button>
            </div>
          </div>
        </section>

        {/* QUOTE FORM */}
        <section className="quote-section section-padding" id="quote">
          <div className="container quote-container">
            <div className="quote-box">
              {!submitted ? (
                <>
                  <div className="form-header">
                    <h3>Need a Custom Quote or Service?</h3>
                    <p>Fill out the form below and our team will get back to you within 2 business hours.</p>
                  </div>

                  <form className="quote-form" onSubmit={handleFormSubmit} noValidate>
                    <div className={`form-group ${formErrors.fullName ? 'invalid' : ''}`}>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Rohan Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                      <span className="error-msg">Please enter your full name.</span>
                    </div>

                    <div className={`form-group ${formErrors.email ? 'invalid' : ''}`}>
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="e.g. rohan@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <span className="error-msg">Please enter a valid email.</span>
                    </div>

                    <div className={`form-group ${formErrors.phone ? 'invalid' : ''}`}>
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="e.g. +91 87007 47243"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <span className="error-msg">Please enter a valid phone number.</span>
                    </div>

                    <div className={`form-group ${formErrors.modelInterest ? 'invalid' : ''}`}>
                      <label className="form-label">Model or Service of Interest *</label>
                      <select
                        className="form-select"
                        value={formData.modelInterest}
                        onChange={(e) => setFormData({ ...formData, modelInterest: e.target.value })}
                      >
                        <option value="" disabled>Select a product or service</option>
                        <optgroup label="Certified Laptops">
                          <option value="Dell Latitude 7490 (₹28,999)">Dell Latitude 7490 (₹28,999)</option>
                          <option value="Lenovo ThinkPad T480 (₹24,999)">Lenovo ThinkPad T480 (₹24,999)</option>
                          <option value="HP EliteBook 840 G5 (₹22,999)">HP EliteBook 840 G5 (₹22,999)</option>
                        </optgroup>
                        <optgroup label="IT Services">
                          <option value="Laptop Repair Service">Laptop Repair Service</option>
                          <option value="Software Solutions">Software Solutions</option>
                          <option value="Networking Services">Networking Services</option>
                        </optgroup>
                      </select>
                      <span className="error-msg">Please select a model/service.</span>
                    </div>

                    <div className={`form-group full-width ${formErrors.budgetRange ? 'invalid' : ''}`}>
                      <label className="form-label">Target Budget Range *</label>
                      <select
                        className="form-select"
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      >
                        <option value="" disabled>Select target budget</option>
                        <option value="Under ₹20,000">Under ₹20,000</option>
                        <option value="₹20,000 - ₹30,000">₹20,000 - ₹30,000</option>
                        <option value="₹30,000+">₹30,000+</option>
                      </select>
                      <span className="error-msg">Please select a budget range.</span>
                    </div>

                    <div className="form-group full-width">
                      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Request Free Quote
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="thank-you-box" style={{ display: 'block' }}>
                  <div className="thank-you-icon">✓</div>
                  <h3>Thank You, {formData.fullName}!</h3>
                  <p>Your quote request has been received. Our team will contact you shortly.</p>
                  <div className="quote-summary-card">
                    <strong>Quote Summary:</strong><br />
                    • <strong>Ref ID:</strong> {quoteReference}<br />
                    • <strong>Selected Item:</strong> {formData.modelInterest}<br />
                    • <strong>Budget:</strong> {formData.budgetRange}
                  </div>
                  <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
                    Submit Another Quote
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                <img src="/images/logo.png" alt="Utkarsh Computers Logo" style={{ height: '44px', width: 'auto' }} />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                    Utkarsh <span style={{ color: '#dc2626' }}>Computers</span>
                  </span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8' }}>
                    REFURBISHED LAPTOPS &amp; SERVICES
                  </span>
                </div>
              </a>
              <p>Your trusted partner for certified refurbished enterprise laptops, hardware repairs, software setup, and IT networking in Delhi NCR.</p>
            </div>

            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#quote">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Our Services</h4>
              <ul className="footer-links">
                <li><a href="#services">1. Laptop Repair</a></li>
                <li><a href="#services">2. Software Solutions</a></li>
                <li><a href="#services">3. Networking Services</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Contact Us</h4>
              <ul className="contact-list">
                <li className="contact-item">
                  📍 Plot No. 94, Co-Working Space, Sector 13, Dwarka, New Delhi 110078
                </li>
                <li className="contact-item">
                  📞 <a href="tel:+918700747243">+91 87007 47243</a>
                </li>
                <li className="contact-item">
                  ✉️ <a href="mailto:info@utkarshcomputers.com">info@utkarshcomputers.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Utkarsh Computers. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS */}
      <div className="floating-buttons-group">
        <a
          href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20inquire%20about%20refurbished%20laptops%2Fservices."
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn float-btn-whatsapp"
          aria-label="Chat on WhatsApp"
        >
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span className="float-tooltip">Chat on WhatsApp</span>
        </a>

        <a href="tel:+918700747243" className="float-btn float-btn-call" aria-label="Call Now">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span className="float-tooltip">Call +91 87007 47243</span>
        </a>
      </div>
    </div>
  );
}
