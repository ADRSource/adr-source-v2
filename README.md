This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

- Node.js ~22.17.1 (see `engines` in package.json)
- pnpm 8+

### Environment Setup

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Fill in the required environment variables in `.env.local`:

- **CMS_SPACE**: Your Hygraph space ID
- **CMS_ENV**: Your Hygraph environment (e.g., `master`)
- **CMS_PROD_TOKEN**: Hygraph production API token
- **CMS_PREVIEW_TOKEN**: Hygraph preview API token
- **CMS_WEBHOOK_SECRET**: Secret for validating webhook requests
- **DRAFT_SECRET**: Secret for enabling draft mode
- **NEXT_CMS_ASSET_ENV_ID**: Hygraph asset environment ID

### Installation

Install dependencies:

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
