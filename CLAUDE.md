# GOOD LIFE SUTRA — ENTERPRISE COMMERCE PLATFORM BLUEPRINT (v5.0)

**Good Life Sutra Pvt. Ltd. — India's Premier Commerce Operating Partner**  
*Architecture*: 3 Standalone Stand-Alone Applications (`website/`, `admin/`, `backend/`)  
*Stack*: Next.js 16 · Express.js (MVC API v1) · PostgreSQL (Local via pgAdmin 4) · Prisma ORM

---

## 🎯 Core Brand Positioning
Good Life Sutra Pvt. Ltd. = India's Premier Commerce Operating Partner (single-point accountability for marketplace growth, OEM brand incubation, D2C storefront operations, B2B/institutional supply, 12-state warehousing & revenue settlement assurance).

---

## 🚀 Independent App Execution Commands

```bash
# 1. Main Public Website App (Port 3000)
cd website
npm run dev      # Local Dev:   http://localhost:3000
npm run build    # Production:  31 static pages prerendered (0 errors)

# 2. Standalone Admin CMS Application (Port 3001)
cd admin
npm run dev      # Local Dev:   http://localhost:3001
npm run build    # Production:  4 static pages prerendered (0 errors)

# 3. Standalone Backend API Server & Database (Port 5000)
cd backend
npm run dev         # API Server:   http://localhost:5000/api/v1/health
npm run db:push     # Sync Schema:  Push schema to local PostgreSQL (goodlife_db)
npm run db:studio   # Visual DB:    Open Prisma Studio database manager
```

---

## 📁 3 Standalone Project Directories

```
GOODLIFE/
│
├── website/                     # 🌐 Public Enterprise Website (Next.js 16 - Port 3000)
│   ├── src/app/                 # 25+ Next.js App Router Routes & Components
│   │   ├── layout.tsx           # Global Layout, Fonts, GA4, GTM, OG, Twitter & JSON-LD
│   │   ├── page.tsx             # 16-Section Enterprise Homepage
│   │   ├── sitemap.ts           # Dynamic /sitemap.xml (25+ routes)
│   │   ├── robots.ts            # /robots.txt (blocks /admin, /api)
│   │   ├── globals.css          # Design System Tokens & Smooth Scroll (90px Offset)
│   │   └── home.css             # Glassmorphism Cards & Micro-animations
│   ├── .env.example             # Website Environment Template
│   └── package.json             # Independent Website Dependencies
│
├── admin/                       # ⚙️ Standalone Admin CMS Application (Port 3001)
│   ├── src/app/                 # Full-Screen Dark Theme Admin Layout & Dashboard
│   │   ├── layout.tsx           # Isolated Admin Layout
│   │   ├── page.tsx             # 16-Module Admin CMS Dashboard (Leads, CMS, RBAC)
│   │   └── globals.css          # Admin UI Styling
│   ├── .env.example             # Admin Environment Template
│   └── package.json             # Independent Admin Dependencies
│
└── backend/                     # 🚀 Standalone Express API Server & DB (Port 5000)
    ├── src/                     # Controllers, Routes (/api/v1), Config
    ├── prisma/
    │   └── schema.prisma        # PostgreSQL Schema (15+ Business Models)
    ├── server.js                # Express API Entry Point
    ├── .env.example             # Backend Environment Template
    └── package.json             # Backend Dependencies & Prisma ORM
```

---

## 🗄️ Local PostgreSQL + pgAdmin Database Setup

```bash
# 1. Install PostgreSQL & pgAdmin 4:
#    PostgreSQL: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
#    pgAdmin 4:  https://www.pgadmin.org/download/pgadmin-4-windows/

# 2. Open pgAdmin 4 → Create new Database: goodlife_db

# 3. Fill in DATABASE_URL in backend/.env:
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/goodlife_db"

# 4. Push Schema & Open Prisma Studio:
cd backend
npm run db:push
npm run db:studio
```

---

## 🎨 Design System Tokens

| Token | Hex Value | Usage |
|:---|:---|:---|
| Primary Accent | `#2563EB` | Primary CTA Buttons, Icons, Active States |
| Secondary Accent | `#38BDF8` | Badges, Subtitles, Highlights, Links |
| Highlight Accent | `#60A5FA` | Category Headers, Borders, Glows |
| Background Deep | `#060B1A` | Hero Section, Card Backgrounds |
| Background Mid | `#080A12` | Main Page Background |
| Glass Card | `rgba(17, 24, 39, 0.7)` | Glassmorphism Container Cards |
| Text White | `#FFFFFF` | Main Headings & Titles |
| Text Light | `#E5E7EB` | Body Paragraphs |
| Text Muted | `#9CA3AF` | Subtext, Captions, Muted Descriptions |
