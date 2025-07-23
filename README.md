# Newbie Interpreter

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

A Vietnamese programming language interpreter built with Next.js that runs entirely in the browser.

**Live Demo**: [https://binhphanhai.github.io/newbie-interpreter/](https://binhphanhai.github.io/newbie-interpreter/)

## Features

- Interactive code editor with syntax highlighting
- Real-time code interpretation
- Example programs to get started
- Completely client-side - no server required
- Static deployment friendly

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Deployment

This project is configured for GitHub Pages deployment:

### Build and Deploy

```bash
# Build the static export
npm run export

# Deploy to GitHub Pages
npm run deploy
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Project Structure

- `component/` - React components for the UI
- `helper/` - Core interpreter logic including lexer, parser, and AST
- `examples/` - Sample programs in the custom language
- `pages/` - Next.js pages and routing

## Language Examples

Check out the `examples/` directory for sample programs including:

- Fibonacci sequence calculation
- Prime number checking
- Even/odd number verification
- Square root calculation
