## Project Overview

This is a boilerplate for a Next.js project integrated with Drizzle ORM and Auth.js (NextAuth.js) for seamless authentication using custom credentials and JWT tokens. It includes a predefined user schema, along with functional login and registration pages.

### Tech Stack:
- [Next.js v14](https://nextjs.org/docs/14/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Auth.js (NextAuth v5)](https://authjs.dev/) for authentication
- [ShadCN UI with Tailwind CSS](https://ui.shadcn.com/) for components & styling
- [React Hook Form](https://www.react-hook-form.com/) + [Zod](https://zod.dev/) for form validation
- [Tanstack Query (React Query)](https://tanstack.com/query/latest/) for data fetching
- PostgreSQL (via Docker Compose)

### Features:
- Predefined user schema
- Ready-to-use login and registration pages
- Custom credential-based authentication with JWT token support


## Useful commands
### Database
To start/crate the database, run:
```bash
pnpm db:dev
```
To destroy the database, run:
```bash
pnpm db:down
```
To see the studio to manage/see the database, run:
```bash
pnpm db:studio
# then open https://local.drizzle.studio/
```
To create a migration file, run:
```bash
pnpm db:makemigrations
```
To apply the migrations, run:
```bash
pnpm db:migrate
```

## Initial setup
```bash
pnpm install
pnpm db:dev
pnpm db:migrate
```

## Development
```bash
pnpm dev:db # Start the database
pnpm dev # Start the development server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
