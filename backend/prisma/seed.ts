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
      id: 'auth-1',
      name: 'Rajeev Nair',
      email: 'rajeev.nair@goodlifesutra.com',
      password: 'gl_admin_2026',
      roleType: 'Super Admin',
      role: 'Head of Marketplace Operations',
      bio: 'Ex-Amazon executive, 14+ years scaling tier-1 appliances and consumer electronics across marketplaces.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      linkedin: 'https://linkedin.com/in/rajeev-nair-goodlife',
      articlesCount: 5,
      status: 'Active',
      lastLogin: 'Today, 04:35 PM',
    },
    {
      id: 'auth-2',
      name: 'Pooja Verma',
      email: 'pooja.verma@goodlifesutra.com',
      password: 'supply_chain_26',
      roleType: 'Author & Editor',
      role: 'VP Supply Chain & Warehousing',
      bio: 'Leading multi-state fulfillment centers, transit damage mitigation, and same-day logistics SLAs.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      linkedin: 'https://linkedin.com/in/pooja-verma-goodlife',
      articlesCount: 3,
      status: 'Active',
      lastLogin: 'Yesterday, 11:20 AM',
    },
    {
      id: 'auth-3',
      name: 'Amitava Sen',
      email: 'amitava.sen@goodlifesutra.com',
      password: 'settle_audit_26',
      roleType: 'Author & Editor',
      role: 'Lead Reconciliation & Settlement Cell',
      bio: 'Specialist in marketplace escrow audit, payment dispute recovery, and commission leak plug-in.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      linkedin: 'https://linkedin.com/in/amitava-sen-goodlife',
      articlesCount: 2,
      status: 'Active',
      lastLogin: '18 Sep, 02:15 PM',
    },
  ];

  for (const a of authorsData) {
    await prisma.author.upsert({
      where: { id: a.id },
      update: a,
      create: a,
    });
  }
  console.log(`✅ Upserted ${authorsData.length} authors in PostgreSQL.`);

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

  // 6. SEED ARTICLES / INSIGHTS
  const articlesData = [
    {
      title: "How Brands Can Scale Marketplace Operations Profitably in 2026",
      slug: "how-brands-can-scale-marketplace-operations",
      excerpt: "Discover how contract manufacturers and consumer brands scale Amazon & Flipkart GMV while protecting distributor margins and eliminating price wars.",
      content: `### Executive Summary\n\nContract manufacturers across Rajkot, Pune, and Coimbatore are transitioning from thin OEM contract margins to direct digital brand ownership. However, expanding without an integrated commerce operating partner frequently leads to channel conflict, listing price wars, and high return penalties.\n\n### 1. The Multi-Channel Expansion Framework\n\nSelling simultaneously on Amazon, Flipkart, AJIO, and Quick-Commerce requires distinct catalog segmentation:\n\n* **Digital-Exclusive SKUs:** Launch separate model numbers online to protect offline wholesale networks and prevent dealer margin complaints.\n* **Algorithmic Buybox Protection:** Monitor 24/7 seller price suppression and automated repricing bots to keep organic Buybox win rates above 88%.\n* **SLA Compliance:** Marketplace delivery algorithms heavily reward 24-hour dispatch. Regional fulfillment hubs are essential to maintain seller tiering.\n\n### 2. Safeguarding Operating Margins\n\nTrue marketplace profitability isn't GMV—it's net bank realization after deducting platform fees, reverse shipping, and advertising:\n\n1. Calculate net contribution margin per unit after all fee slabs.\n2. Automate daily unboxing video logging for damaged customer returns.\n3. Integrate real-time payment reconciliation to claim uncredited returns within the 30-day SAFE-T window.\n\n### Conclusion\n\nScaling across 15+ marketplaces demands enterprise operational rigor. Good Life Sutra partners with leading OEM brands to manage end-to-end cataloging, ads, warehousing, and revenue assurance under a shared success model.`,
      featuredImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Modern automated fulfillment warehouse for multi-channel marketplace commerce",
      category: "Marketplace Growth & Advertising",
      status: "Published",
      author: "Rajeev Nair",
      authorRole: "Head of Marketplace Operations",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      tags: ["Marketplace", "Growth", "Amazon", "Flipkart"],
      date: "19 Sep 2026",
      publishedAt: new Date("2026-09-19T09:00:00.000Z"),
      seoTitle: "How Brands Can Scale Marketplace Operations Profitably | Good Life Sutra",
      seoDesc: "Learn how consumer brands and OEM manufacturers scale Amazon, Flipkart, and Quick-Commerce while protecting dealer margins and recovering fee leakages.",
      canonicalUrl: "/insights/how-brands-can-scale-marketplace-operations",
      ogImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
      readTime: "6 min read"
    },
    {
      title: "12-State Distributed Inventory Planning: Winning Prime & Assured Badges",
      slug: "12-state-distributed-inventory-planning",
      excerpt: "Why a single national warehouse kills your marketplace Buybox win rate, and how algorithmic 12-state stock splitting delivers same-day customer dispatch.",
      content: `### Why Single-Warehouse Fulfillment Is Dead\n\nMarketplace algorithms on Amazon and Flipkart strictly prioritize local delivery speed. When a customer in Chennai or Kolkata searches for an appliance, a seller fulfilling from a single Delhi NCR warehouse is pushed down by regional sellers who offer 1-day delivery.\n\n### Key Benefits of 12-State Inventory Splitting:\n\n* **Buybox Win Rate Surge:** Up to 42% higher Buybox share due to expedited delivery promise badges.\n* **40% Lower Freight Costs:** Local zone logistics fees cost significantly less than national long-haul shipping.\n* **Reduced In-Transit Breakage:** Less handling transfers reduce transit damage from 12% down to 0.4%.\n\n### Overcoming Regulatory & Tax Roadblocks\n\nSetting up 12 state hubs traditionally required months of APOB (Additional Place of Business) GST registrations. Good Life Sutra deploys pre-registered, GST-compliant warehouse nodes across all commercial zones—enabling national fulfillment in under 30 days.`,
      featuredImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "High-tech palletized inventory storage in regional logistics center",
      category: "Inventory & Stock Planning",
      status: "Published",
      author: "Pooja Verma",
      authorRole: "VP Supply Chain & Warehousing",
      authorPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      tags: ["Inventory", "Fulfilment", "Buybox", "Amazon"],
      date: "14 Sep 2026",
      publishedAt: new Date("2026-09-14T11:30:00.000Z"),
      seoTitle: "12-State Distributed Inventory Planning for Marketplaces | Good Life Sutra",
      seoDesc: "Strategic guide to multi-state inventory allocation across India to unlock Amazon Prime and Flipkart Assured badges with 40% lower shipping expenses.",
      canonicalUrl: "/insights/12-state-distributed-inventory-planning",
      ogImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80",
      readTime: "7 min read"
    },
    {
      title: "The Silent Profit Killer: Auditing ₹1Cr+ in Uncredited Marketplace Deductions",
      slug: "auditing-uncredited-marketplace-deductions",
      excerpt: "Forensic audit of 500,000+ settlement line items reveals that brands leak 1.8% of GMV to volumetric weight errors, return fraud, and phantom fee charges.",
      content: `### The Anatomy of Marketplace Financial Leakage\n\nEvery month, high-volume consumer goods brands lose lakhs of rupees to automated marketplace billing discrepancies. Without line-item reconciliation, these losses compound quietly on balance sheets.\n\n### Top Leakage Categories Recovered:\n\n1. **Volumetric Weight Overcharges (44%):** Carrier optical scanners erroneously record oversized dimensions on master cartons, billing heavy bulky freight rates on standard parcels.\n2. **Customer Return Non-Receipt (31%):** Platform refunds issued to buyers where the returned inventory never arrives back at the seller warehouse.\n3. **Closing Fee Mismatches & Duplicate Commission Deductions (25%):** Systemic calculation bugs during high-traffic festival flash sales.\n\n### How Good Life Sutra Recovers Your Capital\n\nOur proprietary audit engine scans every single order transaction against bank remittances, carrier manifests, and return inspection proof. We automatically assemble and submit substantiated dispute claims to recover lost capital within official settlement windows.`,
      featuredImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Financial audit and reconciliation dashboard showing recovered revenue",
      category: "Revenue Assurance & Reconciliation",
      status: "Published",
      author: "Amitava Sen",
      authorRole: "Lead Reconciliation & Settlement Cell",
      authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      tags: ["Revenue", "Reconciliation", "Marketplace"],
      date: "05 Sep 2026",
      publishedAt: new Date("2026-09-05T14:15:00.000Z"),
      seoTitle: "Marketplace Reconciliation & Fee Leakage Audit Playbook | Good Life Sutra",
      seoDesc: "Discover how to audit ₹1Cr+ in uncredited marketplace deductions, dispute fraudulent returns, and recover lost cash flow with daily automated UTR matching.",
      canonicalUrl: "/insights/auditing-uncredited-marketplace-deductions",
      ogImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
      readTime: "8 min read"
    },
    {
      title: "Heavy & Bulky Reverse Logistics: Cutting Damage Rates From 14% to Under 0.5%",
      slug: "heavy-bulky-reverse-logistics-playbook",
      excerpt: "Specialized palletized linehaul networks, packaging reinforcement standards, and local technician doorstep testing protocols for heavy consumer appliances.",
      content: `### The Heavy Goods Transit Challenge\n\nShipping large items like kitchen chimneys, air coolers, inverters, and water heaters through standard parcel hubs inevitably causes severe denting and shattered glass.\n\n### Tactical Solutions for Fragile Shipments:\n\n* **Honeycombed Edge Protectors:** Custom molded pulp and corner cushions certified to ISTA drop standards.\n* **Technician Doorstep Verification:** Local service partners inspect installations to eliminate false 'defective' return requests.\n* **Direct Regional Refurbishment:** Salvaging returned goods locally rather than incurring expensive two-way cross-country freight.`,
      featuredImage: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Packaging and palletized handling for fragile home appliances",
      category: "Returns & Reverse Operations",
      status: "Draft",
      author: "Pooja Verma",
      authorRole: "VP Supply Chain & Warehousing",
      authorPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      tags: ["Returns", "Fulfilment", "Marketplace"],
      date: "18 Sep 2026",
      publishedAt: null,
      seoTitle: "Heavy & Bulky Reverse Logistics Playbook | Good Life Sutra",
      seoDesc: "How appliance brands mitigate high return rates, prevent transit breakage, and manage palletized reverse logistics across India.",
      canonicalUrl: "/insights/heavy-bulky-reverse-logistics-playbook",
      ogImage: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&auto=format&fit=crop&q=80",
      readTime: "5 min read"
    },
    {
      title: "Quick-Commerce for Appliances: How Blinkit, Zepto & JioMart Deliver in 15 Minutes",
      slug: "quick-commerce-consumer-appliances-playbook",
      excerpt: "Hyperlocal dark store inventory allocation strategies for high-rotation kitchen electronics and emergency home essentials.",
      content: `### The Rapid Rise of Instant Appliance Commerce\n\nQuick-commerce is no longer just for groceries. Mixers, kettles, irons, and room heaters are now routinely ordered on 15-minute delivery platforms.\n\n### Operating Strategies for Brands:\n\n* Selecting top 15% high-velocity SKUs suited for dark store shelf dimensions.\n* Real-time API stock syncing to avoid out-of-stock delisting penalties.\n* Dynamic localized promotional pricing during evening peak shopping hours.`,
      featuredImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Quick commerce delivery fleet and hyperlocal fulfillment",
      category: "Marketplace Operations",
      status: "Draft",
      author: "Rajeev Nair",
      authorRole: "Head of Marketplace Operations",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      tags: ["Quick Commerce", "Blinkit", "Zepto", "Growth"],
      date: "01 Oct 2026",
      publishedAt: null,
      seoTitle: "Quick Commerce for Appliances: 15-Min Delivery Playbook | Good Life Sutra",
      seoDesc: "How leading electronics and appliance brands leverage Blinkit, Zepto, and JioMart for instant hyperlocal sales expansion.",
      canonicalUrl: "/insights/quick-commerce-consumer-appliances-playbook",
      ogImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80",
      readTime: "6 min read"
    }
  ];

  for (const art of articlesData) {
    await prisma.article.upsert({
      where: { slug: art.slug },
      update: art,
      create: art,
    });
  }
  // 6. SEED FAQS
  const faqsData = [
    {
      id: "faq-1",
      question: "What services does Good Life provide?",
      answer: "Good Life provides marketplace operations, marketplace growth & advertising, inventory & stock planning, warehousing & fulfilment, revenue assurance & reconciliation, and returns & reverse operations.",
      category: "General",
      status: "Published",
      isPublished: true,
      orderIndex: 1,
      isFeatured: true
    },
    {
      id: "faq-2",
      question: "Who can work with Good Life?",
      answer: "Good Life works with brands and businesses looking to launch, improve, or scale their commerce operations across India's leading marketplace channels.",
      category: "General",
      status: "Published",
      isPublished: true,
      orderIndex: 2,
      isFeatured: true
    },
    {
      id: "faq-3",
      question: "Can Good Life help us launch our online marketplace presence?",
      answer: "Yes. Good Life provides end-to-end support for launching online commerce operations, establishing brand registry, creating optimized catalog listings, and configuring multi-state GST logistics.",
      category: "Launch Online",
      status: "Published",
      isPublished: true,
      orderIndex: 3,
      isFeatured: true
    },
    {
      id: "faq-4",
      question: "Can Good Life manage marketplace operations?",
      answer: "Yes. Marketplace Operations is one of Good Life's core capabilities, encompassing daily catalog hygiene, Buybox protection algorithms, performance marketing, and operational account compliance.",
      category: "Marketplace",
      status: "Published",
      isPublished: true,
      orderIndex: 4,
      isFeatured: true
    },
    {
      id: "faq-5",
      question: "Does Good Life provide warehousing and fulfilment support?",
      answer: "Yes. Warehousing & Fulfilment is delivered through our 12 regional fulfillment centers, securing Amazon Prime, Flipkart Assured, and sub-24hr doorstep delivery badges.",
      category: "Fulfilment",
      status: "Published",
      isPublished: true,
      orderIndex: 5,
      isFeatured: true
    },
    {
      id: "faq-6",
      question: "Does Good Life help with inventory planning?",
      answer: "Yes. Inventory & Stock Planning is one of the core capabilities, leveraging algorithmic sales velocity forecasting to prevent out-of-stock events and eliminate excess dead inventory.",
      category: "Inventory",
      status: "Published",
      isPublished: true,
      orderIndex: 6,
      isFeatured: false
    },
    {
      id: "faq-7",
      question: "Can Good Life help reduce revenue leakage?",
      answer: "Good Life provides Revenue Assurance & Reconciliation as a dedicated capability, forensic auditing marketplace fee deductions, volumetric weight overcharges, and recovering SAFE-T return claims.",
      category: "Revenue Assurance",
      status: "Published",
      isPublished: true,
      orderIndex: 7,
      isFeatured: true
    },
    {
      id: "faq-8",
      question: "Does Good Life handle returns and reverse operations?",
      answer: "Yes. Returns & Reverse Operations is one of the core capabilities, featuring packing station video verification, damage grading, repackaging, and claims dispute resolution.",
      category: "Returns",
      status: "Published",
      isPublished: true,
      orderIndex: 8,
      isFeatured: false
    },
    {
      id: "faq-9",
      question: "Can Good Life help with heavy and bulky products?",
      answer: "Yes. Heavy & Bulky Commerce is a specialised area within the Good Life offering, engineered specifically for large appliances, chimneys, cooktops, and high-capacity solar batteries with palletized freight.",
      category: "Heavy & Bulky Commerce",
      status: "Published",
      isPublished: true,
      orderIndex: 9,
      isFeatured: true
    },
    {
      id: "faq-10",
      question: "How can I get started with Good Life?",
      answer: "You can use the Commerce Diagnostic Tool or submit a direct enquiry to start a conversation with the Good Life team and benchmark your operational headroom.",
      category: "Getting Started",
      status: "Published",
      isPublished: true,
      orderIndex: 10,
      isFeatured: true
    }
  ];

  for (const faq of faqsData) {
    await prisma.fAQ.upsert({
      where: { id: faq.id },
      update: faq,
      create: faq,
    });
  }
  console.log(`✅ Upserted ${faqsData.length} FAQs in PostgreSQL.`);

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
