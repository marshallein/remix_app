# eCommerce App with Remix and Prisma ORM

### Index

-  Tech stack used in this project.
-  How to set up and install this project (in full detail).

### Tech stack

-  [Remix](remix.run): a React framework used to build full-stack web applications.
-  [Prisma](https://www.prisma.io/): an ORM (Object Relational Mapping) that simplifies database interactions.
-  [Bootstrap](https://getbootstrap.com/): a CSS utility and component library.
-  [PostgreSQL](https://www.postgresql.org/): an open-source database used in this project.

### How to set up (local environment)

#### Prerequisites

-  Node.js (LTS 22.11.0 recommended). [Installation guide](https://nodejs.org/en/download/prebuilt-installer)
-  PostgreSQL database
-  Visual Studio Code (or any preferred editor)

#### Steps:

-  [Set up](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database) your PostgreSQL database.
-  Clone this project (or download it and open the folder in your file explorer).
-  Open the project with Visual Studio Code.

> **Important! Remember your PostgreSQL configuration (port, user, password, schema).**

-  Create the `.env` file.

![.env file](https://lh3.googleusercontent.com/pw/AP1GczMHQe7Q4Kj5tspNDyrAf1hgB1BPxsSVgUR9ufUpqibWJ0Df32_bW-lXyx2lRAtwHnyPJTkSaH5PDEQQBOlR7qHOyDdqjvnxnlGVV_4-KGIwzyKvVFw-LB7LQn3fOwNfneH4vt9fR-68-2goJikJaNQy=w376-h510-s-no-gm?authuser=0)

-  Add a `DATABASE_URL` value to `.env` and adjust it so it matches your PostgreSQL configuration. This value is your connection string; learn more [here](https://pris.ly/d/connection-strings).

![database_url](https://lh3.googleusercontent.com/pw/AP1GczPoOTjJVBoQdRhrCYV5zVLApfKcZiX3OAJELW5Wg8Z16IHSmf4s_oqtSpxrZSIcVRVf54JI8IsC4VLp5AjnlGOZJYj4OooJwdM5gGmLiLek2oUyw6knYH9GjB86YVMGT6ke_yqmLXjpgK0TABHv96cR=w720-h36-s-no-gm?authuser=0)

-  Add `SESSION_SECRET="supersecretvalue"` to `.env` as well; this is your session storage key.

-  `.env` should look like this:

> DATABASE_URL="postgresql://postgres:1234@localhost:5432/mydb?schema=public"
> SESSION_SECRET="supersecretvalue"

-  Open the terminal in VS Code:

   -  Check whether Node.js is available on your computer:
      `node -v`
   -  The output should look like this:

   > v18.17.1

   _Disclaimer: your installed version might differ; v22.11.0 is the recommended release._

   -  Install project dependencies:
      `npm install`
   -  Sync Prisma with the database:
      `npx prisma db push`
   -  Set up Snaplet seed:
      `npx @snaplet/seed init`
   -  Seed the database:
      `npx tsx prisma/seed/seed.ts`
   -  At this point you are ready to start the local server.

-  Run this command to start the server:
   > npm run dev

### Additional project information

-  **Folder structure**:
   -  `app/` contains Remix routes, components, and styles.
   -  `prisma/` holds `schema.prisma` plus seed scripts.
   -  `public/` includes static assets such as hero images and favicons.
-  **Environment tips**:
   -  When changing the Prisma schema, run `npx prisma generate` to refresh the client before starting the dev server.
   -  Keep a `.env.example` file (not committed here) that mirrors your environment variables to help teammates onboard quickly.
-  **Data management**:
   -  Use `npx prisma migrate dev --name your_migration` instead of `db push` when you are ready to persist schema changes with history.
   -  `npx prisma studio` opens a lightweight GUI to inspect or edit your PostgreSQL tables during development.

### Updating static images

All hard-coded image paths now live in `app/constants/images.ts`. Update this single file to change what shows up across the UI:

-  **Hero + sliders**: Replace the entries in `HOME_BANNER_IMAGES`, `LANDING_PAGE_IMAGE`, or `COLLECTION_POSTER_IMAGES` to adjust the homepage and product-page carousels.
-  **Branding**: Point `LOGO_IMAGE` and `FOOTER_BACKGROUND_IMAGE` at files inside `public/` to update the logo or footer artwork (`Header`, `Footer`, and other components import these automatically).
-  **Content sections**: Modify `REASON_IMAGE_PATHS` for the “Why choose us” icons and `PRODUCT_RECOMMENDATION_IMAGE` for the product detail recommendations.

When introducing a brand-new static asset, drop the file into `public/`, add an exported constant (or extend the relevant object) in `app/constants/images.ts`, then import that constant wherever the image is needed. This keeps the JSX free of repeated string literals and makes future swaps instant.

### Update the color scheme for branding

`tailwind.config.ts` consists the color scheme for the website, you can adjust and change the color from primary/ secondary color according to what you want to build your website.

```js
// update the color scheme by hex color in here
...
      extend: {
         colors: {
            primary: '#FAFFC5',
            secondary: '#A9BFA8',
            alternative_1: '#5E686D',
            alternative_2: '#3A3960',
         },
...

```

_ADVANCE: this setting will be appear when you using tailwind css to configure the background color (`bg-primary`), checkout TailwindCss Document for more information_

### Available npm scripts

| Command        | Description                                             |
| -------------- | ------------------------------------------------------- |
| `npm run dev`  | Starts Remix in development with Vite for fast refresh. |
| `npm run lint` | Runs ESLint to catch common code-quality issues.        |

### Troubleshooting checklist

-  **Cannot connect to the database**: verify that PostgreSQL is running and that the credentials in `DATABASE_URL` match `psql` access. If using Docker, expose the port (default `5432`) to the host.
-  **Prisma errors about missing migrations**: run `npx prisma migrate dev` and commit the generated `prisma/migrations` folder.
-  **Remix dev server not picking up Tailwind or CSS changes**: restart `npm run dev` to ensure Vite picks up new PostCSS configuration.
-  **TypeScript issues after upgrading dependencies**: delete the `.cache` directory (if created) and rerun `npm install` followed by `npm run dev`.
