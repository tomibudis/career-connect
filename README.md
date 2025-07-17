# Career Connect

A modern job board platform built with Next.js, TypeScript, and Supabase. This project enables users to browse, post, and manage job listings with a clean UI and robust authentication.

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v20+ recommended)
- npm or yarn
- Supabase account (for backend)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/career-connect.git
cd career-connect
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🧑‍💻 Approach

- **Modern Stack**: Built with Next.js App Router, React, and TypeScript for type safety and scalability.
- **Authentication**: Uses Supabase Auth for secure user sign-up, login, and session management.
- **Job Management**: Authenticated users can create, edit, and delete job postings. Public users can browse and filter jobs.
- **Component-Driven**: UI is composed of reusable components for forms, tables, dialogs, and more.
- **API Routes**: Next.js API routes handle backend logic and integrate with Supabase.

---

## 🏗️ Architecture Overview

```
career-connect/
├── src/
│   ├── app/                # Next.js app directory (routing, pages, layouts)
│   │   ├── (auth)/         # Authenticated routes (dashboard, job management)
│   │   ├── (public)/       # Public routes (job listings, login, signup)
│   │   └── api/            # API routes (e.g., auth confirmation)
│   ├── components/         # Reusable UI and feature components
│   ├── constants/          # Static data (job types, locations)
│   ├── context/            # React context providers (user, global state)
│   ├── hooks/              # Custom React hooks (queries, mutations)
│   ├── lib/                # Utility functions and Supabase client setup
│   └── middleware.ts       # Next.js middleware (auth, redirects)
├── tailwind.config.ts      # Tailwind CSS configuration
└── ...                     # Config files, README, etc.
```

## 🙏 What would you improve if given more time?

- Enhance the homepage UI to create a visually stunning and engaging experience that attracts more users
- Expand authentication options to include login with Google, GitHub, and Apple, and implement a "forgot password" feature
- Add feature to apply job
- Add feature save job
- Add new toolbar leverage AI to writing or correction wording on job description
- Add advance filter on homepage
- Add recommendation job on detail page
