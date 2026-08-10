# Centroxy Joy Portal - Frontend Architecture & Technical Context

This document provides a comprehensive technical overview and architecture summary of the **Centroxy Joy Portal** frontend codebase.

---

## 1. Project Overview

**Centroxy Joy Portal** is a modern, interactive corporate digital signage and employee engagement portal built for **Centroxy**. It operates as a dual-purpose application:
1. **Public Kiosk Display (`/`)**: An automated, ambient full-screen digital signage slider displaying corporate announcements, employee birthdays, employee of the month recognitions, upcoming events, customer welcomes, and industry news.
2. **Admin Management Portal (`/admin/*`)**: A content management system (CMS) dashboard enabling administrators to create, schedule, template, publish, and manage items across 8 domain modules.

---

## 2. Technology Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19 & React DOM 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with CSS Variables & Glassmorphism design system
- **Animations**: Framer Motion 12
- **Carousel & Slider**: Swiper 14 (Autoplay & Fade effects)
- **Icons**: Lucide React
- **State & Storage**: Browser IndexedDB (`CentralxyDB`), Custom Session Subscription Store
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast & Sonner
- **Charts**: ApexCharts & React-ApexCharts

---

## 3. Directory & File Structure

```
centroxy-joy-portal/
├── public/                     # Static assets, SVG logos, public images
├── src/
│   ├── app/                    # Next.js App Router pages & layouts
│   │   ├── layout.tsx          # Root app layout & providers
│   │   ├── page.tsx            # Public Display Screen route (/)
│   │   ├── providers.tsx       # React Theme & Toast providers
│   │   └── admin/              # Admin Portal routes
│   │       ├── layout.tsx      # Admin dashboard layout
│   │       ├── page.tsx        # Main Admin landing page
│   │       ├── login/          # Admin Login route (/admin/login)
│   │       ├── dashboard/      # Analytics & summary overview
│   │       ├── announcements/  # Announcement module page & actions
│   │       ├── birthdays/      # Birthdays module page & actions
│   │       ├── customers/      # New Customers module page & actions
│   │       ├── employees/      # Employee of the Month module
│   │       ├── events/         # Upcoming Events module
│   │       ├── news/           # Industry News module
│   │       ├── participation/  # Employee Achievements module
│   │       ├── settings/       # Portal & Display Settings
│   │       ├── thoughts/       # Thought of the Day module
│   │       └── zoho/           # Zoho integration module
│   ├── components/             # Reusable UI & Feature components
│   │   ├── Auth/               # Generic authentication UI components
│   │   ├── Breadcrumbs/        # Navigation breadcrumb bars
│   │   ├── Charts/             # ApexCharts wrappers & widgets
│   │   ├── FormElements/       # Custom input & select controls
│   │   ├── Layouts/            # Header, Sidebar, and Page wrappers
│   │   └── centroxy/           # Domain-specific components
│   │       ├── admin/          # Admin UI (Dialogs, Cards, Gallery, Headers)
│   │       ├── display/        # Kiosk display (DisplayScreen, Slide, LogoAccess)
│   │       └── modules/        # Module lists, forms, and template builders
│   ├── hooks/                  # Custom React hooks (e.g. useLongPress)
│   ├── lib/                    # Client libraries & utilities
│   │   ├── auth/               # Custom client auth state (auth-client.ts)
│   │   ├── db/                 # Browser IndexedDB layer (indexeddb.ts)
│   │   └── utils.ts            # Formatting & classname merge helpers
│   ├── services/               # API & Data Abstraction Layer
│   │   └── centroxy/           # Typed services for modules & authentication
│   └── types/
│       └── centroxy/index.ts   # TypeScript interfaces & domain data types
├── context.md                  # System & Architecture context document (This file)
├── package.json                # Dependencies & npm scripts
└── tsconfig.json               # TypeScript configuration
```

---

## 4. Key Workflows & Features

### 4.1 Public Kiosk Display & Hidden Admin Access
- **Display Screen (`/`)**: Located in `src/app/page.tsx`, renders `DisplayScreen.tsx`.
- **Auto-sliding Carousel**: Uses Swiper with fade effects and autoplay delay (8 seconds per slide) to cycle through published slides.
- **Hidden Kiosk Gesture (`LogoAccess.tsx`)**:
  - Located in `src/components/centroxy/display/LogoAccess.tsx`.
  - Designed for unattended TV/kiosk displays where no visible admin button is shown.
  - Users enter the admin area by holding down (long-pressing) the Centroxy logo for **5 seconds**.
  - A radial SVG progress bar animates smoothly around the logo while pressed. Once 100% complete, it redirects to `/admin/login`.

### 4.2 Authentication & Login System
- **Login Route (`/admin/login`)**:
  - Implemented in `src/app/admin/login/page.tsx`.
  - Features a glassmorphic card design with dark gradient backgrounds (`bg-slate-900`), Framer Motion entrance animation, username/password fields, password visibility toggle (`Eye`/`EyeOff`), and "Remember Me" state.
- **Authentication Service (`auth.service.ts`)**:
  - `src/services/centroxy/auth.service.ts` provides `login` and `logout` service functions.
- **Client Session Manager (`auth-client.ts`)**:
  - `src/lib/auth/auth-client.ts` manages client-side user sessions (`useSession`, `signIn`, `signUp`, `signOut`, `updateUser`).
  - Supports offline-ready fallback demo user session context (`David Jhon`, `Frontend User`).

### 4.3 Content Management Modules (8 Core Domains)
The portal handles 8 specific module categories defined in `src/types/centroxy/index.ts`:
1. **Thought of the Day (`thoughts`)**: Daily quotes, authors, date ranges, template options (*minimal, glass, corporate*).
2. **Birthdays (`birthdays`)**: Employee birthday greetings, photo, department, designation, and custom templates (*classic, celebration, corporate, premium, modern*).
3. **Employee of the Month (`employees`)**: Award recognitions, achievements, photos, and spotlight templates (*award, spotlight, corporate, premium*).
4. **New Customers (`customers`)**: Client onboarding banners, company logo, project names, and templates (*classic, corporate, modern*).
5. **Company Announcements (`announcements`)**: Critical updates, banner images, priority ratings (*low, medium, high, critical*), and templates (*notice, banner, breaking-news, corporate*).
6. **Upcoming Events (`events`)**: Internal/external events, venue, schedule, banner, and templates (*event-card, poster, timeline, corporate*).
7. **Participation & Achievements (`participation`)**: Employee contest achievements and gallery cards (*achievement, gallery, award*).
8. **Industry & Company News (`news`)**: News articles, headlines, external sources, and publish dates (*news-card, magazine, corporate*).

### 4.4 Data Persistence & Service Layer
- **IndexedDB (`src/lib/db/indexeddb.ts`)**:
  - Uses `CentralxyDB` database with individual stores for each of the 8 module keys.
  - Implements full asynchronous CRUD operations (`addItem`, `updateItem`, `getItem`, `getAllItems`, `deleteItem`, `clearStore`).
- **Module Service Abstraction (`src/services/centroxy/module-service.ts`)**:
  - Generic service handling data fetching, pagination, searching, and filtering by publication status (`draft`, `scheduled`, `published`, `archived`).
  - Converts active module records into formatted `DisplaySlide` instances for consumption by the kiosk display slider.

---

## 5. Development & Execution Scripts

- **Development Server**: `npm run dev` (Starts Next.js dev server on http://localhost:3000)
- **Production Build**: `npm run build`
- **Start Production**: `npm run start`
- **Linting**: `npm run lint`
