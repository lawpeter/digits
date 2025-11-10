<img src="doc/landing.png" alt="Landing page screenshot">

## Installation

These steps get the project running locally. Put your screenshots in the `doc/` directory (for example `doc/landing.png`) so they appear in this file.

1. Install PostgreSQL and create a database (example for macOS / psql):

```bash
$ createdb digits
```

2. Clone the repository and install dependencies:

```bash
$ git clone <your-repo-url>
$ cd digits
$ npm install
```

3. Create a `.env` from `sample.env` (or `sample.env.example`) and set `DATABASE_URL` to point at your Postgres instance.

4. Apply Prisma migrations and generate the client (creates the tables defined in `prisma/schema.prisma`):

```bash
$ npx prisma migrate dev --name init
$ npx prisma generate
```

5. Seed the database (optional) using the provided seed script:

```bash
$ npx prisma db seed
```

6. Start the development server:

```bash
$ npm run dev
```

The app will be available at http://localhost:3000

## Quick walkthrough of pages

This project is a small contact manager (named "digits") built with Next.js (App Router), Prisma, React-Bootstrap, NextAuth, and React Hook Form. Below are the main pages and what they do.

### Landing page (home)
- File: `src/app/page.tsx`
- Shows the app landing content and a short description. The screenshot above should show this page.

### Add Contact
- Route: `/add` (file: `src/app/add/page.tsx`)
- Shows the `AddContactForm` component which collects: `firstName`, `lastName`, `address`, `image` (URL), and `description`. Submitting creates a new Contact in the database and redirects to `/list`.

### List Contacts
- Route: `/list` (file: `src/app/list/page.tsx`)
- Shows a responsive grid of `ContactCard` components. Each card displays contact info, a list of Notes, an Edit link (for DB contacts), and an `AddNoteForm` to add a new note for that contact.

### Edit (shared)
- Route: `/edit/[id]` (file: `src/app/edit/[id]/page.tsx`)
- This page detects whether the `id` belongs to a Contact (renders `EditContactForm`) or to a Stuff item (renders `EditStuffForm`) and shows the appropriate edit form.

### Admin
- Route: `/admin` (file: `src/app/admin/page.tsx`)
- Requires an ADMIN user. Shows `ContactCardAdmin` components that include owner information and notes for each contact.

### Authentication
- Routes under `src/app/auth/`: `signin`, `signup`, `signout`, `change-password`.
- NextAuth configuration is in `src/app/api/auth/[...nextauth]/route.ts` and `src/lib/authOptions.ts`.

### API / server helpers
- `src/lib/dbActions.ts` — server-side actions to add/edit/delete Stuff, Contacts, and Notes (functions such as `addContact`, `editContact`, `addNote`).
- `src/lib/prisma.ts` — Prisma client singleton.
- `src/lib/validationSchemas.ts` — Yup schemas for validating the Add/Edit forms.

## Components of note

- `src/components/ContactCard.tsx` — renders a contact card, its notes (`NoteItem`), an Edit link, and the `AddNoteForm`.
- `src/components/ContactCardAdmin.tsx` — same for admin view, shows owner.
- `src/components/AddContactForm.tsx` and `EditContactForm.tsx` — forms for creating/editing contacts.
- `src/components/AddNoteForm.tsx` and `src/components/NoteItem.tsx` — adding and rendering notes.
- `src/components/Navbar.tsx`, `Footer.tsx` — layout components.

## Notes and troubleshooting

- If you added the `Note` model in `prisma/schema.prisma`, run `npx prisma migrate dev --name note` and `npx prisma generate` to update the Prisma client before running the app.
- If you see TypeScript errors referencing `prisma.note` or types for `Note`, regenerate the Prisma client (`npx prisma generate`) after applying migrations.