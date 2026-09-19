import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for Good Life Enterprise...');

  // 1. SEED PLATFORM LOGOS
  const platforms = [
    {
      name: 'Amazon',
      slug: 'amazon',
      orderIndex: 1,
      websiteUrl: 'https://www.amazon.in',
      svgCode: `<svg viewBox="0 0 155 44" width="183" height="52" fill="none"><text x="2" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="30" fill="#131921" letter-spacing="-0.8px">amazon</text><path d="M 6 35 C 40 48, 80 47, 108 35" stroke="#FF9900" stroke-width="3.8" stroke-linecap="round" fill="none" /><polygon points="103,29 114,35 105,42 107,35" fill="#FF9900" /></svg>`,
    },
    {
      name: 'Flipkart',
      slug: 'flipkart',
      orderIndex: 2,
      websiteUrl: 'https://www.flipkart.com',
      svgCode: `<svg viewBox="0 0 160 44" width="189" height="52" fill="none"><text x="4" y="31" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="30" font-style="italic" fill="#2874F0">Flipkart</text><polygon points="126,8 142,8 138,20 122,20" fill="#FFE500" /></svg>`,
    },
    {
      name: 'IndiaMART',
      slug: 'indiamart',
      orderIndex: 3,
      websiteUrl: 'https://www.indiamart.com',
      svgCode: `<svg viewBox="0 0 170 44" width="200" height="52" fill="none"><rect x="2" y="6" width="32" height="32" rx="6" fill="#0A5EB0"/><path d="M8 26 L14 14 L20 22 L26 14 L26 26" stroke="#FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><text x="40" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" fill="#0A5EB0" letter-spacing="-0.3px">indiamart</text></svg>`,
    },
    {
      name: 'Tradeindia',
      slug: 'tradeindia',
      orderIndex: 4,
      websiteUrl: 'https://www.tradeindia.com',
      svgCode: `<svg viewBox="0 0 170 44" width="200" height="52" fill="none"><circle cx="18" cy="22" r="15" fill="#E62E2D"/><text x="12" y="27" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#FFF">ti</text><text x="40" y="30" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="25" fill="#1E293B" letter-spacing="-0.2px">tradeindia</text></svg>`,
    },
    {
      name: 'Industrybuying',
      slug: 'industrybuying',
      orderIndex: 5,
      websiteUrl: 'https://www.industrybuying.com',
      svgCode: `<svg viewBox="0 0 195 44" width="230" height="52" fill="none"><rect x="2" y="6" width="32" height="32" rx="7" fill="#F36F21"/><text x="8" y="29" font-family="system-ui, sans-serif" font-weight="900" font-size="20" fill="#FFF">IB</text><text x="42" y="28" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" fill="#231F20" letter-spacing="-0.2px">industrybuying</text></svg>`,
    },
    {
      name: 'Meesho',
      slug: 'meesho',
      orderIndex: 6,
      websiteUrl: 'https://www.meesho.com',
      svgCode: `<svg viewBox="0 0 145 44" width="171" height="52" fill="none"><text x="2" y="31" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="31" fill="#F43397" letter-spacing="-0.6px">meesho</text></svg>`,
    },
    {
      name: 'Myntra',
      slug: 'myntra',
      orderIndex: 7,
      websiteUrl: 'https://www.myntra.com',
      svgCode: `<svg viewBox="0 0 170 44" width="201" height="52" fill="none"><path d="M 3 33 L 13 10 L 21 25 L 30 10 L 40 33" stroke="#FF3F6C" stroke-width="5.8" stroke-linecap="round" stroke-linejoin="round" fill="none" /><text x="50" y="30" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="28" fill="#282C3F" letter-spacing="0.2px">myntra</text></svg>`,
    },
    {
      name: 'Blinkit',
      slug: 'blinkit',
      orderIndex: 8,
      websiteUrl: 'https://www.blinkit.com',
      svgCode: `<svg viewBox="0 0 165 44" width="195" height="52" fill="none"><rect x="2" y="6" width="32" height="32" rx="9" fill="#F8CB46" /><text x="10" y="30" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="26" fill="#0C831F">b</text><text x="44" y="30" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#0C831F" letter-spacing="-0.4px">blinkit</text></svg>`,
    },
    {
      name: 'JioMart',
      slug: 'jiomart',
      orderIndex: 9,
      websiteUrl: 'https://www.jiomart.com',
      svgCode: `<svg viewBox="0 0 175 44" width="207" height="52" fill="none"><circle cx="18" cy="22" r="16" fill="#E11900" /><text x="8" y="28" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#FFF">Jio</text><text x="44" y="30" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="29" fill="#008ECC">Mart</text></svg>`,
    },
    {
      name: 'Nykaa',
      slug: 'nykaa',
      orderIndex: 10,
      websiteUrl: 'https://www.nykaa.com',
      svgCode: `<svg viewBox="0 0 140 44" width="165" height="52" fill="none"><text x="2" y="31" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-style="italic" font-size="31" fill="#FC2779" letter-spacing="1px">NYKAA</text></svg>`,
    },
    {
      name: 'Zepto',
      slug: 'zepto',
      orderIndex: 11,
      websiteUrl: 'https://www.zepto.com',
      svgCode: `<svg viewBox="0 0 130 44" width="154" height="52" fill="none"><text x="2" y="31" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="31"><tspan fill="#3E0067">z</tspan><tspan fill="#FF3269">epto</tspan></text></svg>`,
    },
    {
      name: 'Moglix',
      slug: 'moglix',
      orderIndex: 12,
      websiteUrl: 'https://www.moglix.com',
      svgCode: `<svg viewBox="0 0 165 44" width="195" height="52" fill="none"><rect x="2" y="6" width="32" height="32" rx="7" fill="#E02A26" /><path d="M 8 28 V 13 L 18 22 L 28 13 V 28" stroke="#FFF" stroke-width="3.4" stroke-linecap="round" fill="none" /><text x="44" y="30" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="27" fill="#1E293B">moglix</text></svg>`,
    },
    {
      name: 'Shopify',
      slug: 'shopify',
      orderIndex: 13,
      websiteUrl: 'https://www.shopify.com',
      svgCode: `<svg viewBox="0 0 170 44" width="201" height="52" fill="none"><path d="M 17 6 L 5 15 L 11 38 L 33 38 L 39 15 Z" fill="#95BF47" /><text x="46" y="30" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="27" fill="#212326">shopify</text></svg>`,
    },
    {
      name: 'AJIO',
      slug: 'ajio',
      orderIndex: 14,
      websiteUrl: 'https://www.ajio.com',
      svgCode: `<svg viewBox="0 0 135 44" width="160" height="52" fill="none"><text x="2" y="31" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="30" fill="#1E293B" letter-spacing="2.2px">AJIO</text><circle cx="74" cy="11" r="3.6" fill="#00A8B5" /></svg>`,
    },
    {
      name: 'Snapmint',
      slug: 'snapmint',
      orderIndex: 15,
      websiteUrl: 'https://www.snapmint.com',
      svgCode: `<svg viewBox="0 0 175 44" width="207" height="52" fill="none"><circle cx="17" cy="22" r="16" fill="#00C29F" /><text x="10" y="29" font-family="system-ui, sans-serif" font-weight="900" font-size="20" fill="#FFF">S</text><text x="42" y="30" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="26" fill="#00C29F">snapmint</text></svg>`,
    },
  ];

  for (const plat of platforms) {
    await prisma.platformLogo.upsert({
      where: { slug: plat.slug },
      update: plat,
      create: plat,
    });
  }
  console.log(`✅ Upserted ${platforms.length} platform logos.`);

  // 2. SEED BRAND LOGOS (All user requested brands)
  const brands = [
    { name: 'Crompton', slug: 'crompton', category: 'Seasonal Category', orderIndex: 1, svgCode: `<svg viewBox="0 0 165 42" width="165" height="42" fill="none"><text x="4" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" letter-spacing="0.5px" fill="#004B87">Crompton</text></svg>` },
    { name: 'USHA', slug: 'usha', category: 'Sewing Machine', orderIndex: 2, svgCode: `<svg viewBox="0 0 130 42" width="130" height="42" fill="none"><text x="4" y="30" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" letter-spacing="2px" fill="#ED1C24">USHA</text></svg>` },
    { name: 'Havells', slug: 'havells', category: 'Home & Kitchen Appliances', orderIndex: 3, svgCode: `<svg viewBox="0 0 155 42" width="155" height="42" fill="none"><circle cx="15" cy="21" r="10" fill="#E31E24"/><path d="M12 18 L18 24 M18 18 L12 24" stroke="#FFF" stroke-width="2.5"/><text x="32" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="23" fill="#E31E24" letter-spacing="0.5px">HAVELLS</text></svg>` },
    { name: 'Hindware', slug: 'hindware', category: 'Chimney', orderIndex: 4, svgCode: `<svg viewBox="0 0 165 42" width="165" height="42" fill="none"><text x="4" y="29" font-family="Georgia, serif" font-weight="900" font-size="24" letter-spacing="1px" fill="#D32F2F">hindware</text></svg>` },
    { name: 'Kenstar', slug: 'kenstar', category: 'Seasonal Category', orderIndex: 5, svgCode: `<svg viewBox="0 0 150 42" width="150" height="42" fill="none"><text x="4" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" letter-spacing="1.2px" fill="#0072CE">KENSTAR</text></svg>` },
    { name: 'Bajaj', slug: 'bajaj', category: 'Home & Kitchen Appliances', orderIndex: 6, svgCode: `<svg viewBox="0 0 140 42" width="140" height="42" fill="none"><polygon points="12,10 24,21 12,32 6,26 14,21 6,16" fill="#004A97"/><text x="30" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" fill="#004A97" letter-spacing="1px">BAJAJ</text></svg>` },
    { name: 'Livpure', slug: 'livpure', category: 'Home & Kitchen Appliances', orderIndex: 7, svgCode: `<svg viewBox="0 0 150 42" width="150" height="42" fill="none"><text x="4" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="25" fill="#00A3E0">Livpure</text><circle cx="106" cy="14" r="3" fill="#84BD00"/></svg>` },
    { name: 'Luminus', slug: 'luminus', category: 'Invertors & Battery', orderIndex: 8, svgCode: `<svg viewBox="0 0 155 42" width="155" height="42" fill="none"><text x="4" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" letter-spacing="1.5px" fill="#002D72">LUMINOUS</text></svg>` },
    { name: 'Exide', slug: 'exide', category: 'Invertors & Battery', orderIndex: 9, svgCode: `<svg viewBox="0 0 140 42" width="140" height="42" fill="none"><text x="4" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="26" letter-spacing="1.5px" fill="#E4002B">EXIDE</text></svg>` },
    { name: 'Bhaburly', slug: 'bhaburly', category: 'Home & Kitchen Appliances', orderIndex: 10, svgCode: `<svg viewBox="0 0 155 42" width="155" height="42" fill="none"><text x="4" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="22" letter-spacing="1px" fill="#1E293B">BHABURLY</text></svg>` },
    { name: 'Amplesta', slug: 'amplesta', category: 'Home & Kitchen Appliances', orderIndex: 11, svgCode: `<svg viewBox="0 0 160 42" width="160" height="42" fill="none"><text x="4" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="23" letter-spacing="1.5px" fill="#2563EB">AMPLESTA</text></svg>` },
    { name: 'CG', slug: 'cg', category: 'Seasonal Category', orderIndex: 12, svgCode: `<svg viewBox="0 0 110 42" width="110" height="42" fill="none"><rect x="4" y="7" width="30" height="28" rx="5" fill="#00529B"/><text x="11" y="28" font-family="system-ui, sans-serif" font-weight="900" font-size="18" fill="#FFF">CG</text><text x="40" y="29" font-family="system-ui, sans-serif" font-weight="900" font-size="22" fill="#00529B">Power</text></svg>` },
    { name: 'VW', slug: 'vw', category: 'TV', orderIndex: 13, svgCode: `<svg viewBox="0 0 130 42" width="130" height="42" fill="none"><rect x="4" y="6" width="32" height="30" rx="4" fill="#0F172A"/><text x="8" y="28" font-family="system-ui, sans-serif" font-weight="900" font-size="18" fill="#38BDF8">VW</text><text x="42" y="28" font-family="system-ui, sans-serif" font-weight="800" font-size="20" fill="#0F172A">Vision</text></svg>` },
    { name: 'IVAS', slug: 'ivas', category: 'Home & Kitchen Appliances', orderIndex: 14, svgCode: `<svg viewBox="0 0 130 42" width="130" height="42" fill="none"><text x="4" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="26" letter-spacing="2px" fill="#E65100">IVAS</text></svg>` },
    { name: 'Faber', slug: 'faber', category: 'Chimney', orderIndex: 15, svgCode: `<svg viewBox="0 0 140 42" width="140" height="42" fill="none"><text x="4" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="26" font-style="italic" fill="#E10A17" letter-spacing="1px">FABER</text></svg>` },
    { name: 'IKEA', slug: 'ikea', category: 'Home & Kitchen Appliances', orderIndex: 16, svgCode: `<svg viewBox="0 0 135 42" width="135" height="42" fill="none"><rect x="2" y="7" width="80" height="28" rx="4" fill="#0058A3"/><ellipse cx="42" cy="21" rx="38" ry="13" fill="#FFDA1A"/><text x="14" y="29" font-family="system-ui, sans-serif" font-weight="900" font-size="22" fill="#0058A3" letter-spacing="2px">IKEA</text></svg>` },
    { name: 'Reo', slug: 'reo', category: 'Home & Kitchen Appliances', orderIndex: 17, svgCode: `<svg viewBox="0 0 120 42" width="120" height="42" fill="none"><text x="4" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="26" fill="#0284C7" letter-spacing="2px">REO</text><text x="70" y="29" font-family="system-ui, sans-serif" font-size="11" fill="#64748B" font-weight="700">by Havells</text></svg>` },
    { name: 'Activa', slug: 'activa', category: 'Seasonal Category', orderIndex: 18, svgCode: `<svg viewBox="0 0 145 42" width="145" height="42" fill="none"><text x="4" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" font-style="italic" fill="#DC2626" letter-spacing="1px">ACTIVA</text></svg>` },
    { name: 'Summercool', slug: 'summercool', category: 'Seasonal Category', orderIndex: 19, svgCode: `<svg viewBox="0 0 175 42" width="175" height="42" fill="none"><circle cx="16" cy="21" r="10" fill="#0284C7"/><text x="32" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="21" fill="#0369A1" letter-spacing="0.5px">SUMMERCOOL</text></svg>` },
    { name: 'Thermocool', slug: 'thermocool', category: 'Seasonal Category', orderIndex: 20, svgCode: `<svg viewBox="0 0 175 42" width="175" height="42" fill="none"><text x="4" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="21" fill="#EA580C" letter-spacing="0.5px">THERMOCOOL</text></svg>` },
    { name: 'Power Guard', slug: 'power-guard', category: 'Invertors & Battery', orderIndex: 21, svgCode: `<svg viewBox="0 0 185 42" width="185" height="42" fill="none"><path d="M12 9 L24 21 L12 33 Z" fill="#16A34A"/><text x="30" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" fill="#15803D" letter-spacing="0.5px">POWER GUARD</text></svg>` },
    { name: 'Sujata', slug: 'sujata', category: 'Home & Kitchen Appliances', orderIndex: 22, svgCode: `<svg viewBox="0 0 140 42" width="140" height="42" fill="none"><text x="4" y="29" font-family="Georgia, serif" font-weight="900" font-size="25" fill="#B91C1C" letter-spacing="1px">SUJATA</text></svg>` },
    { name: 'Orient', slug: 'orient', category: 'Seasonal Category', orderIndex: 23, svgCode: `<svg viewBox="0 0 145 42" width="145" height="42" fill="none"><circle cx="14" cy="21" r="10" fill="#E11D48"/><text x="30" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" fill="#1E293B" letter-spacing="1px">orient</text></svg>` },
  ];

  for (const b of brands) {
    await prisma.brandLogo.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
  }
  console.log(`✅ Upserted ${brands.length} brand logos.`);

  // 3. SEED PRODUCT CATEGORIES
  const categories = [
    {
      name: 'Home & Kitchen Appliances',
      slug: 'home-kitchen-appliances',
      description: 'Mixer grinders, induction cooktops, blenders, kettles, and smart kitchen electronics.',
      subcategories: ['Mixer Grinder', 'Induction Cooktop', 'Electric Kettle', 'Air Fryer', 'Toaster'],
      icon: 'kitchen',
      orderIndex: 1,
    },
    {
      name: 'TV',
      slug: 'tv',
      description: 'Smart LED, QLED, OLED 4K displays and home entertainment systems.',
      subcategories: ['Smart TV', '4K UHD', 'QLED Display', 'Android TV', 'Soundbars'],
      icon: 'tv',
      orderIndex: 2,
    },
    {
      name: 'Washing Machine',
      slug: 'washing-machine',
      description: 'Front load, top load fully automatic and semi-automatic laundry solutions.',
      subcategories: ['Front Load', 'Top Load', 'Semi-Automatic', 'Dryers'],
      icon: 'washing',
      orderIndex: 3,
    },
    {
      name: 'Seasonal Category (Fans, Aircooler, Water Heater Room Heater)',
      slug: 'seasonal-category',
      description: 'Summer & winter climate appliances with regional multi-warehouse placement.',
      subcategories: ['Fans', 'Air Coolers', 'Water Heaters', 'Room Heaters'],
      icon: 'climate',
      orderIndex: 4,
    },
    {
      name: 'Sewing Machine',
      slug: 'sewing-machine',
      description: 'Domestic, industrial, and computerized automatic embroidery sewing machines.',
      subcategories: ['Domestic Sewing', 'Electronic Stitching', 'Industrial Heavy-Duty', 'Embroidery'],
      icon: 'sewing',
      orderIndex: 5,
    },
    {
      name: 'Chimney',
      slug: 'chimney',
      description: 'Auto-clean filterless kitchen chimneys, hobs, and exhaust hoods.',
      subcategories: ['Auto-Clean Chimney', 'Filterless Suction', 'Kitchen Hobs', 'Island Chimney'],
      icon: 'chimney',
      orderIndex: 6,
    },
    {
      name: 'Invertors & Battery',
      slug: 'invertors-battery',
      description: 'Pure sine wave inverters, tubular solar batteries, and high-capacity backup systems.',
      subcategories: ['Pure Sine Wave Inverters', 'Tubular Batteries', 'Solar Hybrid Systems', 'Voltage Stabilizers'],
      icon: 'battery',
      orderIndex: 7,
    },
  ];

  for (const c of categories) {
    await prisma.productCategory.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }
  console.log(`✅ Upserted ${categories.length} product categories.`);

  // 4. SEED AUTHORS & SYSTEM USERS
  const authorsData = [
    {
      name: 'Rajeev Nair',
      email: 'rajeev.nair@goodlife.in',
      password: 'author_pass_2026',
      roleType: 'Super Admin',
      title: 'Head of Marketplace Operations',
      bio: 'Ex-Amazon executive, 14+ years scaling tier-1 appliances and consumer electronics across marketplaces.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      linkedin: 'https://linkedin.com/in/rajeev-nair-goodlife',
      status: 'Active',
    },
    {
      name: 'Pooja Verma',
      email: 'pooja.verma@goodlife.in',
      password: 'author_pass_2026',
      roleType: 'Content Director',
      title: 'VP Supply Chain & Warehousing',
      bio: 'Leading multi-state fulfillment centers, transit damage mitigation, and same-day logistics SLAs.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      linkedin: 'https://linkedin.com/in/pooja-verma-goodlife',
      status: 'Active',
    },
    {
      name: 'Amitava Sen',
      email: 'amitava.sen@goodlife.in',
      password: 'author_pass_2026',
      roleType: 'Senior Editor',
      title: 'Lead Reconciliation & Settlement Cell',
      bio: 'Specialist in marketplace escrow audit, payment dispute recovery, and commission leak plug-in.',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      linkedin: 'https://linkedin.com/in/amitava-sen-goodlife',
      status: 'Active',
    },
  ];

  for (const a of authorsData) {
    await prisma.author.upsert({
      where: { email: a.email },
      update: a,
      create: a,
    });
  }
  console.log(`✅ Upserted ${authorsData.length} authors.`);

  // 5. SEED CASE STUDIES
  const caseStudiesData = [
    {
      slug: 'oem-appliances-marketplace-scale',
      clientName: 'Havells / Surya Contract OEM Partner',
      title: 'From Contract Manufacturer to ₹18 Cr/yr Direct Marketplace Brand',
      industry: 'Small Domestic Appliances',
      location: 'New Delhi / Pan-India',
      timeframe: '9 Months',
      stats: '830% GMV Surge · 99.4% SLA Adherence',
      description: 'Scaled from zero to ₹1.5+ Cr monthly GMV within 9 months, maintaining 18.2% operating profit margin after all marketplace fees and logistics costs.',
      challenge: 'A 25-year-old appliance manufacturer with zero direct-to-consumer presence was losing margins to traditional distributors and wanted to launch ceiling fans and induction cooktops directly on Amazon and Flipkart without alienating offline dealers.',
      solution: 'Designed an exclusive online D2C sub-brand with unique model numbers, drop-tested master packaging, and 6 regional Good Life warehouses securing Prime/Fast delivery badges.',
      actionTaken: [
        'End-to-end cataloging & A+ content creation for 42 SKUs',
        'Direct FBA & Flipkart FBF onboarding across 6 state GST registrations',
        'Automated order ingest and dual-carrier allocation reducing late-dispatch rate to < 0.1%',
        'Daily price monitoring & Buy Box protection algorithms'
      ],
      capabilities: ['Marketplace Management', 'Fulfillment & Logistics', 'Catalog & Brand Store', 'Payment Reconciliation'],
      metrics: [
        { val: '+830%', lbl: 'GMV Surge in 9 Months' },
        { val: '99.4%', lbl: 'On-Time Dispatch SLA' },
        { val: '₹18.4 Cr', lbl: 'Annualized Run-Rate' },
        { val: '13.8%', lbl: 'Blended TACOS Efficiency' }
      ],
      testimonialQuote: 'Good Life transformed us from an invisible contract factory into one of the top 3 selling ceiling fan brands on Amazon within three quarters.',
      testimonialAuthor: 'Rajesh Kulkarni',
      testimonialRole: 'Managing Director',
      testimonialCompany: 'Apex Appliances Ltd.',
      result: 'Scaled to ₹18.4 Cr annual run-rate with 13.8% blended TACOS and top 3 category BSR rank.',
      coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80',
      isFeatured: true,
      isPublished: true,
      seoTitle: 'Appliances OEM Marketplace Scale Case Study | GoodLife',
      seoDesc: 'Learn how a contract manufacturer scaled to ₹18 Cr run-rate across Amazon and Flipkart with GoodLife operating infrastructure.'
    },
    {
      slug: 'kitchen-chimney-transit-breakage-reduction',
      clientName: 'Premium Kitchen Chimney & Cooktop Brand',
      title: 'Eliminating Transit Damage & Slashing Return Freight from 18% to 2.8%',
      industry: 'Large Appliances & Chimneys',
      location: 'Pune & Bengaluru Hubs',
      timeframe: '4 Months',
      stats: '-82% Transit Breakage · 48h Delivery SLA',
      description: 'Transit damage collapsed from 14.2% to under 0.4%. Customer return rate decreased from 18% to 2.8%, saving over ₹42 Lakh in quarterly freight penalties.',
      challenge: 'High in-transit glass canopy breakage on kitchen chimneys (exceeding 14% damage rates) was eroding seller ratings and generating astronomical two-way freight debit notes from courier partners.',
      solution: 'Engineered customized wooden crating and reinforced high-density edge buffer boards. Rerouted movements away from rough conveyor sorting into dedicated palletized surface networks.',
      actionTaken: [
        'Engineered ISTA-certified drop-resistant corner guards and dual-honeycomb packaging',
        'Shifted fragile movements from conveyor express to dedicated palletized linehaul',
        'Implemented photo verification at packing stations and delivery threshold inspections'
      ],
      capabilities: ['Fulfillment & Logistics', 'Packaging Engineering', 'Returns Mitigation'],
      metrics: [
        { val: '-82%', lbl: 'Transit Breakage Reduction' },
        { val: '2.8%', lbl: 'Return Rate (down from 18%)' },
        { val: '₹42L+', lbl: 'Quarterly Freight Savings' },
        { val: '4.4 ★', lbl: 'Product Review Average' }
      ],
      testimonialQuote: 'Glass breakage was killing our online viability. GoodLife fixed our packaging physics and logistics network, cutting our returns to an all-time low.',
      testimonialAuthor: 'Vikas Singhal',
      testimonialRole: 'Chief Operating Officer',
      testimonialCompany: 'AeroVent Home Systems',
      result: 'Saved ₹42 Lakhs in freight claims and achieved 48-hour delivery SLAs across 8 regional hubs.',
      coverImage: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&auto=format&fit=crop&q=80',
      isFeatured: true,
      isPublished: true,
      seoTitle: 'Kitchen Chimney Transit Damage Reduction Case Study | GoodLife',
      seoDesc: 'How GoodLife reduced heavy appliances transit damage by 82% and saved ₹42 Lakhs in return logistics.'
    },
    {
      slug: 'heavy-bulky-inverter-battery-logistics',
      clientName: 'National Inverter & Tubular Battery OEM',
      title: 'Zero-Transit-Damage Fulfillment for 45kg Heavy Goods Across Tier 2/3 India',
      industry: 'Power & Energy Storage',
      location: '12 State Hubs',
      timeframe: '6 Months',
      stats: '94% Less Freight Damage · 12 State Hubs',
      description: 'Pure sine wave inverters and tubular solar batteries fulfilled safely across 19,000+ PIN codes with multi-state GST compliance.',
      challenge: '45kg heavy-duty tubular solar batteries faced acid leakage risks and carrier dimension re-measurement penalties during interstate transit.',
      solution: 'Good Life deployed palletized linehaul freight, pre-registered APOB hubs in 12 states, and daily dimension scan verification.',
      actionTaken: [
        'Established 12 compliant APOB registrations for interstate input tax credit pass-through',
        'Deploy heavy-grade palletized trucks with tail-lift equipment for safe unloading',
        'Automated dead-weight vs volumetric dispute reconciliation against courier weight audit files'
      ],
      capabilities: ['Fulfillment & Logistics', 'Tax & Compliance', 'Reconciliation & Recovery'],
      metrics: [
        { val: '94%', lbl: 'Fewer Carrier Disputes' },
        { val: '19K+', lbl: 'PIN Codes Covered' },
        { val: '99.1%', lbl: 'On-Time Delivery SLA' },
        { val: '100%', lbl: 'Weight Overcharge Recovery' }
      ],
      testimonialQuote: 'Shipping 45kg batteries across India without spills or overcharge disputes was deemed impossible until GoodLife deployed their regional logistics grid.',
      testimonialAuthor: 'Sunil Rao',
      testimonialRole: 'VP Operations',
      testimonialCompany: 'PowerCore Dynamics',
      result: 'Maintained 99.1% on-time dispatch and recovered 100% of carrier weight overcharge disputes.',
      coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
      isFeatured: true,
      isPublished: true,
      seoTitle: 'Heavy Goods Fulfillment Case Study | GoodLife',
      seoDesc: 'Explore how GoodLife manages 45kg heavy-duty power backup fulfillment with multi-state GST compliance.'
    }
  ];

  for (const cs of caseStudiesData) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: cs,
      create: cs,
    });
  }
  console.log(`✅ Upserted ${caseStudiesData.length} case studies.`);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
