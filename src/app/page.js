'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceProduct: '',
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
    if (formData.phone.trim().length < 7) errors.phone = true;
    if (!emailRegex.test(formData.email.trim())) errors.email = true;
    if (!formData.serviceProduct.trim()) errors.serviceProduct = true;

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const refId = `#RT-${Math.floor(100000 + Math.random() * 900000)}`;
      setQuoteReference(refId);
      setSubmitted(true);

      // Dispatch email notification to Utkarshcomputers2011@gmail.com
      const emailData = new FormData();
      emailData.append('Name', formData.fullName);
      emailData.append('Phone Number', formData.phone);
      emailData.append('Email ID', formData.email);
      emailData.append('Service or Product Wanted', formData.serviceProduct);
      emailData.append('Reference ID', refId);
      emailData.append('_subject', `New Lead from ${formData.fullName} (${formData.phone}) - Utkarsh Computers`);
      emailData.append('_captcha', 'false');
      emailData.append('_template', 'table');

      fetch('https://formsubmit.co/ajax/Utkarshcomputers2011@gmail.com', {
        method: 'POST',
        body: emailData
      }).then(res => res.json())
        .then(data => console.log('Email sent successfully:', data))
        .catch(err => console.error('Email dispatch error:', err));
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
                30-Day Replacement Support • 6-Month Manufacturer Warranty • Quality-Tested Devices. Reliable performance for students, professionals, and everyday use—all at a budget-friendly price.
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
              {/* Product 1: Dell Precision 5550 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">Workstation • 4GB GPU</span>
                  <img src="/images/dell_precision.png" alt="Dell Precision 5550 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">Dell Precision 5550</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect></svg>
                      <span>Intel Core i7 (10th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>8GB RAM | 256GB NVMe SSD</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                      <span>4GB Dedicated Graphics Card</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20Dell%20Precision%205550%20i7%2F10th%2F8GB%2F256GB%204GB%20GPU."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 2: Dell Latitude 5430 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">12th Gen • 16GB / 512GB</span>
                  <img src="/images/dell_latitude.png" alt="Dell Latitude 5430 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">Dell Latitude 5430</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i7 (12th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>16GB DDR4 RAM</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
                      <span>512GB NVMe SSD</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20Dell%20Latitude%205430%20i7%2F12th%2F16GB%2F512GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 3: Dell Latitude 5420 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">11th Gen • i5</span>
                  <img src="/images/dell_latitude.png" alt="Dell Latitude 5420 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">Dell Latitude 5420</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i5 (11th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>8GB DDR4 RAM</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
                      <span>256GB NVMe SSD</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20Dell%20Latitude%205420%20i5%2F11th%2F8GB%2F256GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 4: Dell Latitude 5410 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">10th Gen • i5</span>
                  <img src="/images/dell_latitude.png" alt="Dell Latitude 5410 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">Dell Latitude 5410</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i5 (10th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>8GB DDR4 RAM</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
                      <span>256GB NVMe SSD</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20Dell%20Latitude%205410%20i5%2F10th%2F8GB%2F256GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 5: Dell Latitude 7490 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">Touch / Non-Touch Option</span>
                  <img src="/images/dell_latitude.png" alt="Dell Latitude 7490 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">Dell Latitude 7490</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i5 (8th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>8GB RAM | 256GB SSD</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      <span>Touchscreen / Non-Touch Options</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20Dell%20Latitude%207490%20i5%2F8th%2F8GB%2F256GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 6: Dell Latitude 5400 Touch */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">Touch Screen</span>
                  <img src="/images/dell_latitude.png" alt="Dell Latitude 5400 Touch Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">Dell Latitude 5400 Touch</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i5 (8th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>8GB RAM | 256GB SSD</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"></rect></svg>
                      <span>FHD Touchscreen Display</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20Dell%20Latitude%205400%20Touch%20i5%2F8th%2F8GB%2F256GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 7: Dell Latitude 5480 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">Budget i7</span>
                  <img src="/images/dell_latitude.png" alt="Dell Latitude 5480 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">Dell Latitude 5480</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i7 (6th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>8GB RAM | 256GB SSD</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      <span>Durable Enterprise Chassis</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20Dell%20Latitude%205480%20i7%2F6th%2F8GB%2F256GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 8: Dell Latitude 3420 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">11th Gen • Modern Design</span>
                  <img src="/images/dell_latitude.png" alt="Dell Latitude 3420 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">Dell Latitude 3420</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i5 (11th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>8GB RAM | 256GB NVMe SSD</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"></rect></svg>
                      <span>HD Anti-Glare Display</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20Dell%20Latitude%203420%20i5%2F11th%2F8GB%2F256GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 9: HP EliteBook 840 G7 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">10th Gen • Premium Aluminum</span>
                  <img src="/images/hp_elitebook.png" alt="HP EliteBook 840 G7 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">HP EliteBook 840 G7</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i5 (10th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>8GB RAM | 256GB NVMe SSD</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      <span>Bang & Olufsen Premium Audio</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20HP%20EliteBook%20840%20G7%20i5%2F10th%2F8GB%2F256GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 10: HP EliteBook 830 G7 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">10th Gen • 16GB RAM</span>
                  <img src="/images/hp_elitebook.png" alt="HP EliteBook 830 G7 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">HP EliteBook 830 G7</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i5 (10th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>16GB High-Speed RAM</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
                      <span>256GB NVMe SSD</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20HP%20EliteBook%20830%20G7%20i5%2F10th%2F16GB%2F256GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 11: HP ProBook 640 G8 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">11th Gen i7 • 16GB / 512GB</span>
                  <img src="/images/hp_elitebook.png" alt="HP ProBook 640 G8 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">HP ProBook 640 G8</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i7 (11th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>16GB DDR4 RAM</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
                      <span>512GB NVMe SSD</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20HP%20ProBook%20640%20G8%20i7%2F11th%2F16GB%2F512GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 12: HP ProBook 440 G3 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">Super Budget Choice</span>
                  <img src="/images/hp_elitebook.png" alt="HP ProBook 440 G3 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">HP ProBook 440 G3</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i5 (6th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>8GB RAM | 256GB SSD</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      <span>Student Budget Friendly</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20HP%20ProBook%20440%20G3%20i5%2F6th%2F8GB%2F256GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 13: HP ProBook 640 G5 */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">8th Gen • Reliable Performance</span>
                  <img src="/images/hp_elitebook.png" alt="HP ProBook 640 G5 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">HP ProBook 640 G5</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i5 (8th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>8GB RAM | 256GB SSD</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      <span>Full HD Display</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20HP%20ProBook%20640%20G5%20i5%2F8th%2F8GB%2F256GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 14: Lenovo ThinkPad T490s (i7) */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">Ultra Slim • i7 / 16GB</span>
                  <img src="/images/lenovo_thinkpad.png" alt="Lenovo ThinkPad T490s i7 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">Lenovo ThinkPad T490s (i7)</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i7 (8th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>16GB RAM | 256GB NVMe SSD</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      <span>Military-Grade Durability</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20Lenovo%20ThinkPad%20T490s%20i7%2F8th%2F16GB%2F256GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 15: Lenovo ThinkPad T490s (i5) */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">Ultra Slim • i5</span>
                  <img src="/images/lenovo_thinkpad.png" alt="Lenovo ThinkPad T490s i5 Laptop" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">Lenovo ThinkPad T490s (i5)</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                      <span>Intel Core i5 (8th Gen)</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5M2 8h20v8H2z"></path></svg>
                      <span>8GB RAM | 256GB SSD</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      <span>Ergonomic Keyboard & TrackPoint</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20Lenovo%20ThinkPad%20T490s%20i5%2F8th%2F8GB%2F256GB."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </article>

              {/* Product 16: Dell 24-inch IPS Monitor */}
              <article className="product-card">
                <div className="product-img-box">
                  <span className="savings-tag">Full HD IPS Display</span>
                  <img src="/images/dell_monitor.png" alt="Dell 24 inch IPS Monitor" />
                </div>
                <div className="product-content">
                  <h3 className="product-title">Dell 24" IPS Full HD Monitor</h3>
                  <div className="product-specs">
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                      <span>24-Inch Full HD (1920x1080) IPS Panel</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      <span>Ultra-Slim Bezel & Wide Viewing Angle</span>
                    </div>
                    <div className="spec-item">
                      <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                      <span>HDMI & DisplayPort Connectivity</span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a
                      href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20buy%20Dell%2024%20inch%20IPS%20Monitor."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm add-to-cart-btn"
                      style={{ width: '100%', textAlign: 'center' }}
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
                <a
                  href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20inquire%20about%20Laptop%20Repair%20Services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm service-btn"
                  onClick={handleBuyNow}
                >
                  Book Repair Quote
                </a>
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
                <a
                  href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20inquire%20about%20Software%20Solutions%20%26%20Setup."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm service-btn"
                  onClick={handleBuyNow}
                >
                  Request Software Help
                </a>
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
                <a
                  href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20inquire%20about%20Networking%20Services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm service-btn"
                  onClick={handleBuyNow}
                >
                  Get Networking Quote
                </a>
              </div>

              <div className="service-card">
                <div className="service-icon-box">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3 className="service-title">4. PC or Desktop Repair</h3>
                <p className="service-description">
                  Custom PC building, desktop motherboard &amp; power supply (SMPS) servicing, graphic card upgrades, and hardware repair for office &amp; gaming desktops.
                </p>
                <ul className="service-features">
                  <li className="service-feature-item">✓ Custom PC &amp; Gaming Rig Assembly</li>
                  <li className="service-feature-item">✓ SMPS Power Supply &amp; Motherboard Repair</li>
                  <li className="service-feature-item">✓ GPU &amp; CPU Thermal Pasting / Upgrades</li>
                  <li className="service-feature-item">✓ Cabinet Cleaning &amp; Cooling Fan Servicing</li>
                </ul>
                <a
                  href="https://wa.me/918700747243?text=Hello%20Utkarsh%20Computers%2C%20I%20want%20to%20inquire%20about%20PC%20or%20Desktop%20Repair%20Services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm service-btn"
                  onClick={handleBuyNow}
                >
                  Book Desktop Repair
                </a>
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
                      <label className="form-label">Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Rohan Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                      <span className="error-msg">Please enter your name.</span>
                    </div>

                    <div className={`form-group ${formErrors.phone ? 'invalid' : ''}`}>
                      <label className="form-label">Phone No. *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="e.g. +91 87007 47243"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <span className="error-msg">Please enter a valid phone number.</span>
                    </div>

                    <div className={`form-group ${formErrors.email ? 'invalid' : ''}`}>
                      <label className="form-label">Email ID *</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="e.g. Utkarshcomputers2011@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <span className="error-msg">Please enter a valid email.</span>
                    </div>

                    <div className={`form-group ${formErrors.serviceProduct ? 'invalid' : ''}`}>
                      <label className="form-label">Service or Product you want *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Dell Latitude 7490 or Laptop Repair"
                        value={formData.serviceProduct}
                        onChange={(e) => setFormData({ ...formData, serviceProduct: e.target.value })}
                      />
                      <span className="error-msg">Please type the service or product you want.</span>
                    </div>

                    <div className="form-group full-width" style={{ marginTop: '0.5rem' }}>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.05rem', padding: '1rem' }}>
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="thank-you-box" style={{ display: 'block' }}>
                  <div className="thank-you-icon">✓</div>
                  <h3>Thank You, {formData.fullName}!</h3>
                  <p>Your request has been received. Our team will contact you shortly.</p>
                  <div className="quote-summary-card">
                    <strong>Submission Details:</strong><br />
                    • <strong>Name:</strong> {formData.fullName}<br />
                    • <strong>Phone No.:</strong> {formData.phone}<br />
                    • <strong>Email ID:</strong> {formData.email}<br />
                    • <strong>Service / Product:</strong> {formData.serviceProduct}<br />
                    • <strong>Ref ID:</strong> {quoteReference}
                  </div>
                  <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
                    Submit Another Request
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
                  ✉️ <a href="mailto:Utkarshcomputers2011@gmail.com">Utkarshcomputers2011@gmail.com</a>
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
