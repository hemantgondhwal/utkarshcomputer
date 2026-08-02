import './globals.css';

export const metadata = {
  title: 'Utkarsh Computers - Quality Refurbished Laptops & IT Services',
  description: 'Certified refurbished laptops (Dell, Lenovo, HP) with 30-Day Replacement Support, 6-Month Manufacturer Warranty, and Quality-Tested Devices in Dwarka, New Delhi.',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/favicon.ico',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
