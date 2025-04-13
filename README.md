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

#### Option 1: Using the Vercel Dashboard

1. Go to your project in the Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add the required environment variables
4. Redeploy your application

#### Option 2: Using the Setup Script

We've provided a script to help you set up environment variables in Vercel:

```bash
# Using the Node.js script
node vercel-env-setup.js your-project-name

# Or using the bash script
./setup-vercel-env.sh your-project-name
```

Replace `your-project-name` with the name of your Vercel project.

## Troubleshooting

If you encounter build errors:

1. Check the Vercel build logs
2. Ensure all environment variables are set correctly
3. Verify that your Next.js version is compatible with Vercel

### Common Issues

#### Missing Environment Variables

If you see an error like `NEXT_PUBLIC_API_BASE_URL is not defined in the environment variables`:

1. Make sure you've set the environment variables in Vercel
2. Try redeploying your application
3. If the issue persists, check that the environment variables are correctly named

## License

[MIT](LICENSE)
