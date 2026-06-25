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
│   ├── tools/            # Dynamic path-based routing for tools
│   │   └── [toolId]/     # page.tsx renders tools statically with generateStaticParams()
│   ├── layout.tsx        # Global layout configuration
│   └── page.tsx          # Homepage Dashboard listing all utilities
├── src/                  # Core application source
│   ├── components/       # Core layout components and wrapper interfaces
│   │   ├── calculators/  # Interactive tools & widgets (CGPA, Pomodoro, StudyPlanner, etc.)
│   │   ├── Ads.tsx       # Placement holders for sponsorship ads
│   │   ├── HomeToolsList.tsx # Client-side search and category filtering of tools
│   │   └── ToolWrapper.tsx   # Directs upload flows and mounts the correct tool engine
│   ├── tools/            # Pure TypeScript files executing heavy file parsing/compiling
│   ├── toolsList.ts      # Metadata, SEO descriptions, and configs for all tools
│   ├── types.ts          # TypeScript declarations and unions
│   └── index.css         # Global design tokens and responsive utilities
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

### Study Planner (New)
Personalized daily revision timetable generator.
* **Implementation**: [StudyPlanner.tsx](file:///c:/Users/JAISINGH/.gemini/antigravity-ide/scratch/student-tools/src/components/calculators/StudyPlanner.tsx).
* **Logic**: Distributes subjects across exam-countdown days proportionally to subject difficulty (Hard gets 3x, Medium gets 2x, Easy gets 1x study sessions). Divides days into 2-hour blocks with break tips.
* **Features**: Printing styles and CSV downloads.

### Flashcard Quizzer (New)
Active recall flashcard study manager.
* **Implementation**: [FlashcardsQuizzer.tsx](file:///c:/Users/JAISINGH/.gemini/antigravity-ide/scratch/student-tools/src/components/calculators/FlashcardsQuizzer.tsx).
* **Modes**:
  * *Review Mode*: 3D-perspective CSS flipping cards with self-confidence grading.
  * *Quiz Mode*: Score-based MCQ quiz where wrong options are dynamically extracted from other cards in the deck.
* **Features**: Save to LocalStorage, JSON import/export, and pre-populated sample decks.

---

# Change Log

## 2026-06-24

### Added
* `StudyPlanner.tsx` calculator component in `src/components/calculators/`.
* `FlashcardsQuizzer.tsx` calculator component in `src/components/calculators/`.

### Modified
* `src/types.ts`: Added `'study-planner'` and `'flashcards'` to `ToolId` union.
* `src/toolsList.ts`: Appended configurations and SEO data for `'study-planner'` and `'flashcards'`.
* `src/components/ToolWrapper.tsx`: Imported the new components, handled them inside `renderCalculator()`, and set `maxWidth` to `900px` for these tools to avoid layout squishing.

### Reason
* Expanded the platform with study aids to increase retention and daily usage from student users, while retaining the platform's offline-first, client-side privacy.

---

# Known Issues

## Client-Side Resource Limits
* **Description**: Since all file compression and conversion algorithms run entirely inside the client's browser engine, extremely large textbooks (e.g. >100MB scans) can exceed the browser memory heap limit or hang thread performance.
* **Impact**: Medium (only affects extremely heavy PDF files).
* **Potential Solution**: Implement memory paging or slice file chunks, or show warnings to users before compiling large files.
* **Priority**: Low

---

# Technical Decisions

## Decision: 100% Client-Side Conversion
* **Date**: Project Inception
* **Decision**: Eliminate backend servers for file processing and compile everything in the browser runtime.
* **Reasoning**:
  * Zero server costs for PDF processing (which is CPU intensive).
  * High trustworthiness: school transcripts, coursework, and assignments remain private as files are never uploaded.
* **Consequences**:
  * *Pros*: Infinite horizontal scalability, zero backend server hosting costs, absolute student privacy, near-instant speed on standard file sizes.
  * *Cons*: Relies entirely on client CPU/RAM, impossible to easily run complex server-side engines (like LibreOffice/Unoconv for exact PPTX/DOCX renderings), meaning Word/PPT converters use custom HTML-to-PDF mock renderers.

---

# Agent Notes

* **SSR Warning**: The `ToolWrapper.tsx` component is dynamically imported with `{ ssr: false }` inside `app/tools/[toolId]/page.tsx`. This is because document processors and window APIs (like Web Audio, localStorage, canvas rendering) rely on browser-only globals. Do not import `ToolWrapper` statically.
* **Icon Resolution**: Icons are dynamically resolved in `HomeToolsList.tsx` using `Icons[tool.iconName]`. When adding a new tool to `toolsList.ts`, make sure the icon name matches a valid, standard Lucide React icon.
* **CSS variables**: Styling relies heavily on custom design tokens in `src/index.css`. Avoid hardcoding hex values where variables like `var(--border-color)` or `var(--white)` should be used.

---

# Development Workflow

### Run Dev Server
```bash
npm run dev
```

### Build Project
```bash
npm run build
```

### Linting
```bash
npm run lint
```

---

# Dependency Notes

* **Package**: `pdf-lib`
  * **Purpose**: Modifies, writes, merges, and inspects PDF documents client-side.
  * **Do Not Replace Because**: Crucial to almost all PDF organize and security features.
* **Package**: `pdfjs-dist`
  * **Purpose**: Renders PDF pages to Canvas, enabling thumbnail previews and client-side OCR.
  * **Do Not Replace Because**: Essential for visual previews in Split/Organize modules.

---

# API Reference Summary

No backend APIs are hosted. Static mapping routes are rendered by Next.js using dynamic routing parameters.

---

# Database Schema Summary

No database is used. The platform uses HTML5 `localStorage` to save custom user configurations, study schedules, and flashcard decks on the student's own browser partition.

---

# AI Context Summary

1. **What the project does**: Offline-first Next.js web application providing client-side PDF converters and calculators.
2. **Current architecture**: Statically compiled Next.js front-end with SSR disabled on core utility wrappers.
3. **Recent major changes**: Integrated Study Planner and Flashcard Quizzer.
4. **Active bugs**: None; large files may hit browser memory limits.
5. **Next priorities**: Enhance office document conversion quality (Word/PPT) using client-side WebAssembly parser bindings.
6. **Important warnings**: Always import browser components dynamically to prevent server-side rendering breaks on window objects.

---

# Last Updated

* **Timestamp**: 2026-06-25 14:00 UTC
* **Updated By**: Antigravity AI Agent
* **Summary**: Created the project brain state documentation `BRAIN.md` reflecting the overall architecture, tech stack, directory maps, and the recently integrated Study Planner and Flashcard Quizzer features.
