import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "";

export const metadata: Metadata = {
  metadataBase: new URL("https://goodlifesutra.com"),
  title: {
    default: "Good Life Sutra | India's Premier Commerce Operating Partner",
    template: "%s | Good Life Sutra",
  },
  description:
    "Good Life Sutra is India's integrated commerce operating partner for marketplace growth, OEM brand incubation, D2C operations, B2B/institutional commerce, multi-state warehousing, and revenue assurance.",
  keywords: [
    "ecommerce operations India",
    "marketplace management Amazon Flipkart",
    "OEM brand launch India",
    "D2C commerce operations",
    "B2B institutional commerce",
    "warehousing fulfilment India",
    "revenue assurance marketplace",
    "Good Life Sutra",
  ],
  authors: [{ name: "Good Life Sutra Pvt. Ltd." }],
  creator: "Good Life Sutra Pvt. Ltd.",
  publisher: "Good Life Sutra Pvt. Ltd.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://goodlifesutra.com",
    siteName: "Good Life Sutra",
    title: "Good Life Sutra | India's Premier Commerce Operating Partner",
    description:
      "From OEM to brand, marketplace to D2C, regional warehousing to B2B fulfilment — Good Life Sutra is your single-point commerce operator.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Good Life Sutra — Commerce Operating Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Good Life Sutra | India's Premier Commerce Operating Partner",
    description:
      "India's integrated commerce operating partner. Marketplace growth, OEM brand incubation, D2C ops, B2B fulfilment, 12-state warehousing.",
    images: ["/og-image.png"],
    creator: "@goodlifesutra",
  },
  alternates: {
    canonical: "https://goodlifesutra.com",
  },
  verification: {
    google: "your-google-search-console-verification-code",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Good Life Sutra Pvt. Ltd.",
  url: "https://goodlifesutra.com",
  logo: "https://goodlifesutra.com/gl-logo.svg",
  description:
    "India's integrated commerce operating partner for marketplace growth, OEM brand incubation, D2C operations, B2B/institutional commerce and multi-state warehousing.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Business Enquiry",
    email: "contact@goodlifesutra.com",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/goodlifesutra",
    "https://twitter.com/goodlifesutra",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.variable}>
      <head>
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script id="gtm-head" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {/* Google Analytics 4 */}
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
      </head>
      <body>
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
