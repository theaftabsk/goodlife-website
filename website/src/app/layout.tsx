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

interface SiteSettings {
  ga4MeasurementId?: string;
  gtmContainerId?: string;
  googleSearchConsoleVerification?: string;
}

async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await fetch("http://localhost:5000/api/v1/settings", {
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (_) {}
  return null;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const rawGsc = settings?.googleSearchConsoleVerification || process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "";
  let gscCode = rawGsc.trim();
  const match = gscCode.match(/content=["']([^"']+)["']/i);
  if (match) {
    gscCode = match[1];
  }

  return {
    metadataBase: new URL("https://goodlifesutra.com"),
    title: {
      default: "Good Life Sutra | Scale Ecommerce. Not Complexity.",
      template: "%s | Good Life Sutra",
    },
    description:
      "Good Life brings marketplace growth, D2C, pan-India fulfilment, demand planning, performance marketing, returns and revenue assurance together under one accountable operating model.",
    keywords: [
      "ecommerce operations India",
      "marketplace management Amazon Flipkart",
      "OEM brand launch India",
      "D2C ecommerce operations",
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
      title: "Good Life Sutra | Scale Ecommerce. Not Complexity.",
      description:
        "Good Life brings marketplace growth, D2C, pan-India fulfilment, demand planning, performance marketing, returns and revenue assurance together under one accountable operating model.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Good Life Sutra — Ecommerce Operating Partner",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Good Life Sutra | Scale Ecommerce. Not Complexity.",
      description:
        "Good Life brings marketplace growth, D2C, pan-India fulfilment, demand planning, performance marketing, returns and revenue assurance together under one accountable operating model.",
      images: ["/og-image.png"],
      creator: "@goodlifesutra",
    },
    alternates: {
      canonical: "https://goodlifesutra.com",
    },
    verification: gscCode
      ? {
          google: gscCode,
        }
      : undefined,
  };
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Good Life Sutra Pvt. Ltd.",
  url: "https://goodlifesutra.com",
  logo: "https://goodlifesutra.com/gl-logo.svg",
  description:
    "Good Life brings marketplace growth, D2C, pan-India fulfilment, demand planning, performance marketing, returns and revenue assurance together under one accountable operating model.",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const gtmId = (settings?.gtmContainerId || process.env.NEXT_PUBLIC_GTM_ID || "").trim();
  const ga4Id = (settings?.ga4MeasurementId || process.env.NEXT_PUBLIC_GA4_ID || "").trim();

  return (
    <html lang="en" className={openSans.variable}>
      <head>
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Google Tag Manager */}
        {gtmId && (
          <Script id="gtm-head" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
        {/* Google Analytics 4 */}
        {ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
      </head>
      <body>
        {/* GTM noscript fallback */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
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
