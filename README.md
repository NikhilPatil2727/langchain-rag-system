This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.





rag-nextjs-app/
├── 📁 app/                    # Next.js App Router
│   ├── layout.jsx            # Root layout
│   ├── page.jsx              # Home page (Hero, Features, CTA)
│   ├── globals.css           # Tailwind styles
│   └── chat/
│       └── page.jsx          # Chat interface page
│
├── 📁 components/            # Reusable UI components
│   ├── Navbar.jsx           # Navigation bar with logo
│   ├── Hero.jsx             # Landing page hero
│   ├── Features.jsx         # 6 feature cards
│   └── ChatInterface.jsx    # Interactive chat UI
│
├── 📁 actions/              # Server Actions (no API routes!)
│   ├── indexing.js         # PDF indexing action
│   └── chat.js             # Chat query action
│
├── 📁 lib/                  # Shared utilities
│   └── config.js           # AI model configs
│
├── 📁 scripts/              # CLI scripts
│   └── index-pdf.js        # Standalone indexing
│
├── 📁 public/               # Static files
│   └── README.txt          # Place Node.pdf here!
│
├── Config Files
│   ├── package.json        # Dependencies
│   ├── .env.local         # API keys (fill this!)
│   ├── next.config.js     # Next.js config
│   ├── tailwind.config.js # Tailwind theme
│   └── .gitignore         # Git rules
│
└── Documentation
    ├── START_HERE.md      # 👈 Read this first!
    ├── README.md          # Full documentation
    ├── SETUP.md           # Quick setup guide
    └── FILE_STRUCTURE.md  # Detailed structure