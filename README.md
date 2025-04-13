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

The following environment variables are required:

- `NEXT_PUBLIC_API_BASE_URL`: The base URL of your API (e.g., https://api.helpert.com)
- `NEXT_PUBLIC_APP_URL`: The URL of your application (e.g., https://helpert.com)

### Setting Environment Variables in Vercel

1. Go to your project in the Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add the required environment variables
4. Redeploy your application

## Troubleshooting

If you encounter build errors:

1. Check the Vercel build logs
2. Ensure all environment variables are set correctly
3. Verify that your Next.js version is compatible with Vercel

## License

[MIT](LICENSE)
