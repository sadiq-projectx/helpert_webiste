# Helpert Website

A Next.js application for the Helpert platform.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Deployment to Vercel

This project is configured for easy deployment to Vercel:

1. Push your code to GitHub
2. Import your repository in the Vercel dashboard
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

## Environment Variables

The following environment variables may be required:

- `NEXT_PUBLIC_API_URL`: The URL of your API
- `NEXT_PUBLIC_APP_URL`: The URL of your application

## Troubleshooting

If you encounter build errors:

1. Check the Vercel build logs
2. Ensure all environment variables are set correctly
3. Verify that your Next.js version is compatible with Vercel

## License

[MIT](LICENSE)
