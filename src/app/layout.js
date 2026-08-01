import './globals.css';

export const metadata = {
  title: 'Utkarsh Computers - Quality Refurbished Laptops & IT Services',
  description: 'Certified refurbished laptops (Dell, Lenovo, HP) at unbeatable prices with 1-year warranty, 30-day money-back guarantee, and IT repair services in Dwarka, New Delhi.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
