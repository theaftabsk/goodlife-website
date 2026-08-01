# 🏛️ Good Life Sutra — Enterprise B2B Commerce Platform

> **Core Positioning**: *"You build the product and brand. We operate commerce."*  
> Good Life Sutra Pvt. Ltd. is India's Premier Commerce Operating Partner: providing single-point operational accountability for marketplace growth, OEM brand incubation, D2C storefront operations, B2B/institutional commerce, multi-state warehousing, and revenue settlement assurance.

---

## 🌟 Highlights & Key Features

- 🌐 **Public Website App (`website/`)**: Built with Next.js 16 (App Router), TypeScript, Vanilla CSS, and 25+ prerendered static pages with 0 build errors.
- ⚙️ **Standalone Admin CMS (`admin/`)**: Independent Next.js control panel (Port 3001) with 16 modules, Role-Based Access Control (RBAC), and 1-click CSV Lead Exports.
- 🚀 **Standalone API Server (`backend/`)**: Modular Node.js / Express MVC API v1 with Prisma ORM and local PostgreSQL support via pgAdmin 4.
- ⚡ **10-Step Commerce Diagnostic Engine**: Interactive assessment tool calculating real-time lead fit scores (0-100), strategic tags, and auto-dispatching webhooks to CRM.
- 🔍 **Bank-Grade SEO & Analytics**: Built-in Open Graph, Twitter Cards, Organization JSON-LD Schemas, GA4, GTM, dynamic `/sitemap.xml`, and `/robots.txt`.

---

## 📂 Multi-App Repository Structure

```
GOODLIFE/
│
├── website/                     # 🌐 Public Enterprise Website (Next.js 16 - Port 3000)
│   ├── src/app/                 # 25+ App Router Routes (Core, Solutions, Capabilities, Proof)
│   ├── src/components/          # Mega-Menu Header, Footer, Diagnostic Modal
│   ├── .env.example             # Website Environment Template
│   └── package.json             # Independent Website Dependencies
│
├── admin/                       # ⚙️ Standalone Admin CMS Application (Port 3001)
│   ├── src/app/                 # Full-Screen Dark Theme Layout & 16 Dashboard Modules
│   ├── .env.example             # Admin Environment Template
│   └── package.json             # Independent Admin Dependencies
│
└── backend/                     # 🚀 Standalone Express API Server & DB (Port 5000)
    ├── src/controllers/         # MVC Controllers (Leads, CMS, Health)
    ├── src/routes/v1/           # Express API v1 Router (/api/v1/health, /api/v1/leads)
    ├── prisma/
    │   └── schema.prisma        # PostgreSQL Schema (15+ Business Models)
    ├── server.js                # Express API Entry Point
    ├── .env.example             # Backend Environment Template
    └── package.json             # Backend Dependencies & Prisma ORM
```

---

## 🚀 Quick Start & Development Commands

### 1. Public Website Application
```bash
cd website
npm run dev      # Local Dev:   http://localhost:3000
npm run build    # Production:  31 static pages prerendered (0 errors)
```

### 2. Standalone Admin CMS Application
```bash
cd admin
npm run dev      # Local Dev:   http://localhost:3001
npm run build    # Production:  4 static pages prerendered (0 errors)
```

### 3. Backend API Server & Database
```bash
cd backend
npm run dev         # API Server:   http://localhost:5000/api/v1/health
npm run db:push     # Sync Schema:  Push schema to local PostgreSQL (goodlife_db)
npm run db:studio   # Visual DB:    Open Prisma Studio database manager
```

---

## 🗄️ Database Setup (Local PostgreSQL via pgAdmin 4)

1. Download and install [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) and [pgAdmin 4](https://www.pgadmin.org/download/pgadmin-4-windows/).
2. Open pgAdmin 4 and create a new database named **`goodlife_db`**.
3. Create `backend/.env` based on `backend/.env.example` and set your connection string:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/goodlife_db"
   ```
4. Run schema migration:
   ```bash
   cd backend
   npm run db:push
   ```

---

## 🗺️ 25-Page Sitemap Summary

- **Core Pages**: Homepage (`/`), About (`/about`), Contact (`/contact`), Careers (`/careers`), FAQs (`/faqs`), Privacy (`/privacy`), Terms (`/terms`), Cookies (`/cookies`), 404 (`/_not-found`).
- **Solution Pages**: Launch Online (`/solutions/launch-online`), Fix & Grow (`/solutions/fix-and-grow`), Scale Pan-India (`/solutions/scale-pan-india`), Brand Launch & Incubation (`/brand-launch-incubation`), D2C Commerce Operations (`/d2c-commerce-operations`).
- **Capability Pages**: Marketplace Operations, Marketplace Growth, Inventory Planning, Warehousing & Fulfilment, Revenue Assurance, Returns Operations, Multi-Platform Commerce (`/multi-platform-commerce`), B2B & Institutional Commerce (`/b2b-institutional-commerce`).
- **Specialised & Proof Pages**: Heavy & Bulky Commerce, Fulfilment Network Map, Agency Partner, Case Studies (`/case-studies`), Insights Journal (`/insights`).

---

## 🔒 License & Copyright

© 2026 **Good Life Sutra Pvt. Ltd.** All Rights Reserved.  
Designed and built as an Enterprise B2B Commerce Lead-Generation & Operations Platform.
