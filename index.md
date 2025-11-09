![](https://github.com/ics-software-engineering/nextjs-application-template/raw/main/doc/landing-page.png)

nextjs-application-template is a sample Next.js 14 application that illustrates:

- A standard directory layout using 'src/' as recommended in the [Next.js Project Structure](https://nextjs.org/docs/getting-started/project-structure) guide.
- [Bootstrap 5 React](https://react-bootstrap.github.io/) for user interface.
- [React Hook Form](https://www.react-hook-form.com/) for form development.
- Authorization, authentication, and registration using [NextAuth.js](https://next-auth.js.org/).
- Initialization of users and data from a settings file.
- Alerts regarding success or failure of DB updates using [Sweet Alert](https://sweetalert.js.org/).
- Quality assurance using [ESLint](http://eslint.org) with packages to partially enforce the [Next.js ESLint rules](https://nextjs.org/docs/app/building-your-application/configuring/eslint) and the [AirBnB Javascript Style Guide](https://github.com/airbnb/javascript).

The goal of this template is to help you get quickly started doing Next.js development by providing a reasonable directory structure for development and deployment, a set of common extensions to the core framework, and boilerplate code to implement basic page display, navigation, forms, roles, and database manipulation.

To keep this codebase simple and small, some important capabilities are intentionally excluded from this template:

- Unit Testing
- Security
- Deployment

Examples of the these capabilities will be provided elsewhere.

## Installation

First, [install PostgreSQL](https://www.postgresql.org/download/). Then create a database for your application.

```

$ createdb nextjs-application-template
Password:
$

```

Second, go to [https://github.com/ics-software-engineering/nextjs-application-template](https://github.com/ics-software-engineering/nextjs-application-template), and click the "Use this template" button. Complete the dialog box to create a new repository that you own that is initialized with this template's files.

Third, go to your newly created repository, and click the "Clone or download" button to download your new GitHub repo to your local file system. Using [GitHub Desktop](https://desktop.github.com/) is a great choice if you use MacOS or Windows.

Fourth, cd into the directory of your local copy of the repo, and install third party libraries with:

```

$ npm install

```

Fifth, create a `.env` file from the `sample.env`. Set the `DATABASE_URL` variable to match your PostgreSQL database that you created in the first step. See the Prisma docs [Connect your database](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgresql). Then run the Prisma migration `npx prisma migrate dev` to set up the PostgreSQL tables.

```

$ npx prisma migrate dev
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "<your database name>", schema "public" at "localhost:5432"

Applying migration `20240708195109_init`

The following migration(s) have been applied:

migrations/
└─ 20240708195109_init/
└─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (v5.16.1) to ./node_modules/@prisma/client in 51ms

$

```

Then seed the database with the `/config/settings.development.json` data using `npx prisma db seed`.

```

$ npx prisma db seed
Environment variables loaded from .env
Running seed command `ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts` ...
Seeding the database
Creating user: admin@foo.com with role: ADMIN
Creating user: john@foo.com with role: USER
Adding stuff: Basket (john@foo.com)
Adding stuff: Bicycle (john@foo.com)
Adding stuff: Banana (admin@foo.com)
Adding stuff: Boogie Board (admin@foo.com)

🌱 The seed command has been executed.
$

```

## Running the system

Once the libraries are installed and the database seeded, you can run the application by invoking the "dev" script in the [package.json file](https://github.com/ics-software-engineering/nextjs-application-template/blob/master/app/package.json):

```

$ npm run dev

> nextjs-application-template-1@0.1.0 dev
> next dev

▲ Next.js 14.2.4

- Local: http://localhost:3000
- Environments: .env

✓ Starting...
✓ Ready in 1619ms

```

### Viewing the running app

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000). You can login using the credentials in [settings.development.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config/settings.development.json), or else register a new account.

### ESLint

You can verify that the code obeys our coding standards by running ESLint over the code in the src/ directory with:
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
- Put your screenshots in `doc/` and reference them with an `<img>` tag, for example:

```html
<img src="doc/landing.png" alt="Landing page screenshot">
```

If you'd like, I can add example screenshots (small thumbnails) to the `doc/` folder and update this file with those names — just upload the images and tell me the filenames.

---

If you want me to also run the database migration and then run type/lint checks here, give me permission to run commands in the workspace and I'll execute the migration and fix any follow-up issues.
    StuffItemAdmin.tsx # Row in the admin list stuff page.
