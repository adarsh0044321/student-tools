# Project Overview

## Project Name

Student Tools

## Purpose

Student Tools is a free, secure, and client-side online utility platform offering document/PDF manipulation tools and academic calculators for students. 

A core tenet of the project is **student data privacy**: unlike typical web-based converters that upload files to cloud servers, all documents, grades, and logs are processed locally inside the user's browser. Files never leave the student's device.

## Current Status

Fully functional and deployed on Vercel. Recently expanded with new study productivity tools (Study Planner and Flashcard Quizzer).

## Tech Stack

* **Frontend**: React (v18), Next.js (v14, App Router), TypeScript, Vanilla CSS variables.
* **Backend**: None (Serverless/static deployment on Vercel; all utilities operate client-side).
* **Infrastructure**: Vercel.
* **Languages**: TypeScript, HTML, CSS.
* **Dependencies**:
  * `pdf-lib`: PDF modification engine (merging, splitting, watermarking, protecting, etc.).
  * `pdfjs-dist`: Render PDF page viewports client-side onto canvas for thumbnails and OCR.
  * `@pdfsmaller/pdf-encrypt-lite`: Lightweight client-side encryption.
  * `docx`, `exceljs`, `xlsx`, `mammoth`: Reading/generating office files (.docx, .xlsx) in-browser.
  * `lucide-react`: UI icon set.

---

# Architecture

## High-Level Structure

All operations run in the client browser. Next.js statically pre-renders the routing metadata and JSON-LD schemas for maximum SEO indexability.

```
Next.js Page (Static Pre-rendered Router & SEO)
       ↓
ToolWrapper (Dynamic client-side wrapper, SSR disabled)
       ↓
 ┌─────┴────────────────────────────────────────┐
 ↓                                              ↓
Interactive Calculators (React UI Components)   PDF / Document Engines (Client-side scripts)
(e.g., CGPACalculator, StudyPlanner)           (utilize pdf-lib, exceljs, docx, jszip)
```

---

# Directory Map

```
student-tools/
├── app/                  # Next.js App Router (pages, metadata, layout)
│   ├── blog/             # SEO Blog posts list and dynamic slug routing pages
│   │   ├── [slug]/       # Individual blog post viewer
│   │   └── page.tsx      # Blog list page
│   ├── categories/       # Category page routing (e.g. /categories/organize)
│   ├── tools/            # Dynamic path-based routing for tools
│   │   └── [toolId]/     # page.tsx renders tools statically with generateStaticParams()
│   ├── layout.tsx        # Global layout configuration
│   ├── page.tsx          # Homepage Dashboard listing all utilities
│   ├── robots.ts         # Programmatic robots.txt output
│   └── sitemap.ts        # Programmatic sitemap.xml output
├── public/               # Static assets folder
│   ├── logo.png          # Circular brand logo icon
│   ├── favicon.svg       # Favicon linking to brand logo
│   └── icons.svg         # SVG icons fallback sheet
├── src/                  # Core application source
│   ├── components/       # Core layout components and wrapper interfaces
│   │   ├── calculators/  # Interactive tools & widgets (CGPA, Pomodoro, StudyPlanner, etc.)
│   │   ├── Ads.tsx       # Placement holders for script-injected banner and native partner ads
│   │   ├── HomeToolsList.tsx # Client-side search and category filtering of tools
│   │   └── Layout.tsx        # Main outer layout, theme toggles, and adblocker barrier detection
│   │   └── ToolWrapper.tsx   # Directs upload flows and mounts the correct tool engine
│   ├── tools/            # Pure TypeScript files executing heavy file parsing/compiling
│   ├── toolsList.ts      # Metadata, SEO descriptions, and configs for all tools
│   ├── types.ts          # TypeScript declarations and unions
│   ├── index.css         # Global design tokens and responsive utilities
│   └── App.css           # Layout utility overrides
├── vercel.json           # Vercel routing overrides and config
├── tsconfig.json         # TypeScript configuration
├── next.config.js        # Next.js compiler settings
└── .npmrc                # Node configuration forcing legacy dependency resolutions
```

---

# Features

## Completed Features

### PDF Manipulation & Office Converters
Client-side PDF organizers and file converters.
* **Implementation**: `src/tools/` and `src/tools/additionalTools.ts`.
* **Important packages**: `pdf-lib`, `pdfjs-dist`, `exceljs`, `docx`, `mammoth`, `jszip`.
* **Key Tools**: Merge PDF, Split PDF, Compress PDF, PDF to JPG, JPG to PDF, Rotate, Protect, Unlock, Watermark, Page Numbers, Organize, Word to PDF, Excel to PDF, PDF to Word, PDF to Excel, Remove Pages, Extract Pages, Scan to PDF, Repair, OCR, HTML to PDF, PDF to PDF/A, Crop PDF, Edit PDF, Sign PDF, Redact PDF, Compare PDF.

### Academic Calculators & study utilities
Interactive widget dashboards for grades and schedules.
* **Implementation**: `src/components/calculators/`.
* **Key Tools**: CGPA Calculator, Attendance Calculator, Percentage Calculator, Marks Calculator, Grade Calculator, GPA to Percentage, Unit Converter, Scientific Calculator, Age Calculator, Exam Countdown.

### Study Planner
Personalized daily revision timetable generator.
* **Implementation**: [StudyPlanner.tsx](file:///c:/Users/JAISINGH/.gemini/antigravity-ide/scratch/student-tools/src/components/calculators/StudyPlanner.tsx).
* **Logic**: Distributes subjects across exam-countdown days proportionally to subject difficulty (Hard gets 3x, Medium gets 2x, Easy gets 1x study sessions). Divides days into 2-hour blocks with break tips.
* **Features**: Printing styles and CSV downloads.

### Flashcard Quizzer
Active recall flashcard study manager.
* **Implementation**: [FlashcardsQuizzer.tsx](file:///c:/Users/JAISINGH/.gemini/antigravity-ide/scratch/student-tools/src/components/calculators/FlashcardsQuizzer.tsx).
* **Modes**:
  * *Review Mode*: 3D-perspective CSS flipping cards with self-confidence grading.
  * *Quiz Mode*: Score-based MCQ quiz where wrong options are dynamically extracted from other cards in the deck.
* **Features**: Save to LocalStorage, JSON import/export, and pre-populated sample decks.

---

# Change Log (Project History)

## 2026-06-25

### Added
* `BRAIN.md` persistent memory documentation created to record overall system architecture and evolution. (Updated to include full version control history and release details).

## 2026-06-24

### Added
* `StudyPlanner.tsx` component to `src/components/calculators/`.
* `FlashcardsQuizzer.tsx` component to `src/components/calculators/`.

### Modified
* `src/types.ts`: Added `'study-planner'` and `'flashcards'` to `ToolId` union.
* `src/toolsList.ts`: Appended configurations and SEO definitions for the two new tools.
* `src/components/ToolWrapper.tsx`: Imported the new components, handled them inside `renderCalculator()`, and expanded `maxWidth` constraints to `900px` for both tools.

### Reason
* Expanded the platform with study aids to increase daily student user retention, maintaining the platform's offline-first, client-side privacy.

## 2026-06-13

### Modified (Major Refactor & Migration)
* **Vite-to-Next.js App Router Migration**: Replaced the entire front-end routing framework.
  * Deleted `index.html`, `src/App.tsx`, `src/main.tsx`, `src/pages/Home.tsx`, `tsconfig.app.json`, `tsconfig.node.json`, and `vite.config.ts`.
  * Added Next.js configuration and App Router directories (`app/page.tsx`, `app/layout.tsx`, `app/tools/[toolId]/page.tsx`, `app/blog/[slug]/page.tsx`, etc.).
  * Configured `generateStaticParams()` to pre-render dynamic paths at build time.
* **12 Academic Widgets**: Integrated 12 browser calculators (GPA, Marks, Pomodoro, etc.) in `src/components/calculators/`.
* **Programmatic SEO**: Implemented robots, sitemaps, JSON-LD Schema (Breadcrumb & SoftwareApplication structures), and dynamic metadata tags.
* **Navigation Overhaul**: Fixed navigation routing states when returning to the dashboard.
* **Monetization & Adblocker Protection**:
  * Integrated popunder, socialbar, banner, native, and smartlink ads from monetization sponsors to support serverless hosting.
  * Implemented client-side adblocker detection with a modal barrier.

### Reason
* Swapped frameworks to optimize search engine ranking indexability and metadata rendering. Added local widgets to increase student utility footprint, and integrated monetization structures to cover hosting and operational costs.

## Earlier Commits

### Modified
* Favicon changed to the official branded circular logo.
* Added dark/light theme mode using CSS variables and local storage states.
* Configured `vercel.json` and added `.npmrc` to bypass node peer-dependency conflicts during static builds.

---

# Bug Fixes & Hotfixes

## Vite-to-Next Routing Glitches
* **Problem**: Back-navigation buttons inside tools resulted in page crashes or routing loops.
* **Root Cause**: Next.js App Router client routing cache conflicts and inconsistent history back routing.
* **Fix**: Re-coded navigation buttons to use explicit routing (`/`) or simple history back handlers, bypassing standard cached routing issues.

## Vercel Build Dependency Conflicts
* **Problem**: Vercel deployment builds failed due to strict NPM peer dependency resolution conflicts (specifically regarding library requirements in pdfJS and react configurations).
* **Root Cause**: NPM v7+ strict peer-dependency checks aborted installation due to older react wrappers in certain document libraries.
* **Fix**: Added `.npmrc` setting `legacy-peer-deps=true` in the project root to force installation of peer dependencies, resolving Vercel build failures.

---

# Known Issues

## 🛡️ Adblocker Modal Barrier (Critical Design Caveat)
* **Description**: `src/components/Layout.tsx` runs a client-side verification function `checkAdblock`. It appends a dummy element containing ad-typical classnames (`ads advertisement ad-zone doubleclick banner-ad pub_300x250`) to the body, waits 1.5 seconds, and evaluates if the element's height is zero (which happens if blocked by adblock extensions). If blocked, it launches a modal overlay blocking all user interactions.
* **Impact**: High. Students using adblockers cannot use the site at all until they whitelist the domain.
* **How to test / modify**: If tweaking the layout, be aware of this detection script. If you need to debug without ads, temporarily disable the adblock check in `Layout.tsx` by commenting out the `setAdblockActive(true)` line.

## Client-Side CPU and Memory Heap Limitations
* **Description**: Document engines (especially `pdf-lib` and `xlsx`) run completely in the browser thread. Parsing or converting heavy files (>50MB scanned guides) can cause browser freezes or memory crashes.
* **Impact**: Medium (only on very large files).
* **Prevention**: Notify users when files are heavy before starting compilation.

---

# Technical Decisions

## Vite vs. Next.js Migration
* **Date**: 2026-06-13
* **Decision**: Migrate completely from Vite to Next.js App Router.
* **Reasoning**: Vite works great for SPAs, but lacks SEO advantages. Because the platform relies heavily on search engine indexing for utilities (e.g. searching "merge pdf online free"), Next.js's ability to statically pre-render meta headers and schema markup for every tool path is crucial.
* **Consequences**:
  * *Pros*: Vastly superior search engine rankings, dynamic breadcrumbs/FAQ schema injection, faster initial load times.
  * *Cons*: Requires dynamic imports `{ ssr: false }` for all components that access browser globals (e.g. `window`, `localStorage`, `document`), adding minor wrapper complexity.

---

# Agent Notes & Development Constraints

* **🚨 CRITICAL: Browser Globals & SSR**: Next.js pre-renders code on the server during the build. Since almost all calculators and tools access browser-only APIs (`window`, `document`, `localStorage`, canvas contexts, `AudioContext`), they **will crash** the Next.js server-side build if imported statically.
  * **Rule**: Always import `ToolWrapper` dynamically with `{ ssr: false }` in `app/tools/[toolId]/page.tsx`. Keep calculators encapsulated inside wrappers that only mount on the client side.
* **Layout Width Overrides**: The default width wrapper for tools inside `ToolWrapper.tsx` is `640px`. However, the Study Planner and Flashcard Quizzer require more horizontal space. We added an override condition: `maxWidth: ['study-planner', 'flashcards'].includes(toolConfig.id) ? '900px' : '640px'`. Adjust this list if you introduce other grid-heavy widgets.
* **Sponsorship Script Injections**:
  * Global ad scripts are loaded in `app/layout.tsx` headers (`heavenlysuspicious.com`).
  * Ad placeholders are rendered dynamically inside `src/components/Ads.tsx`. Do not delete or break these components, as they ensure serverless costs are funded.
* **Lucide Icon Mapping**: Homepage lists icons dynamically using `* as Icons` in `HomeToolsList.tsx`. When adding new tools, ensure the `iconName` specified in `toolsList.ts` maps exactly to a valid export in the `lucide-react` package.

---

# Development & Operational Workflow

### Dependency Resolutions (.npmrc)
* Keep `.npmrc` with `legacy-peer-deps=true` intact. Removing it will break Vercel deployment builds due to package clashes.

### Local Development
```bash
npm run dev
```

### Static Build & Type Check
```bash
npm run build
```

---

# Database Schema Summary

The application is entirely serverless and database-free. 
* **State Persistence**: Student datasets (grades, countdowns, schedules, custom flashcard decks) are saved locally on the client's device using HTML5 `localStorage` APIs.
* **Key Storage Keys**:
  * `theme`: Stores theme state (`light` | `dark`).
  * `student_flashcards_decks`: Stores serialized JSON list of flashcard decks.

---

# AI Context Summary

1. **What the project does**: Client-side document editor and student utility site.
2. **Current architecture**: Statically compiled Next.js App Router with client-only tool wrappers.
3. **Recent major changes**: Migrated from Vite to Next.js; added 14 academic widgets (including Study Planner and Flashcard Quizzer); integrated ads & adblocker block screen.
4. **Active issues**: Strict adblock detection overlay blocks the site if ad blockers are on. Heavy PDFs can crash browser tab memory.
5. **Next priorities**: Build client-side image editing tools and implement PDF form filling improvements.
6. **Important warnings**: Never import client-side utilities statically; use `{ ssr: false }`. Keep `.npmrc` peer dependency overrides.

---

# Last Updated

* **Timestamp**: 2026-06-25 14:05 UTC
* **Updated By**: Antigravity AI Agent
* **Summary**: Expanded `BRAIN.md` with complete historical commit details, including the Vite-to-Next.js migration, adblocker modal barriers, build hacks (`.npmrc`), and crucial serverless/static runtime constraints for future agents.
