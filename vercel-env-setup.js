#!/usr/bin/env node

/**
 * This script sets up environment variables in Vercel
 * Usage: node vercel-env-setup.js <project-name>
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get project name from command line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error('Error: Project name is required');
  console.log('Usage: node vercel-env-setup.js <project-name>');
  process.exit(1);
}

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
} catch (error) {
  console.log('Installing Vercel CLI...');
  execSync('npm install -g vercel', { stdio: 'inherit' });
}

// Login to Vercel if not already logged in
try {
  execSync('vercel whoami', { stdio: 'ignore' });
} catch (error) {
  console.log('Logging in to Vercel...');
  execSync('vercel login', { stdio: 'inherit' });
}

// Read .env.local file
const envFilePath = path.join(process.cwd(), '.env.local');
let envVars = {};

if (fs.existsSync(envFilePath)) {
  console.log('Reading environment variables from .env.local...');
  const envFileContent = fs.readFileSync(envFilePath, 'utf8');
  
  // Parse .env.local file
  envFileContent.split('\n').forEach(line => {
    // Skip comments and empty lines
    if (line.startsWith('#') || !line.trim()) return;
    
    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=').trim();
    
    if (key && value) {
      envVars[key.trim()] = value;
    }
  });
} else {
  console.log('.env.local file not found. Using default values...');
  envVars = {
    NEXT_PUBLIC_API_BASE_URL: 'https://api.helperts.com',
    NEXT_PUBLIC_APP_URL: 'https://helperts.com'
  };
}

// Set environment variables in Vercel
console.log(`Setting up environment variables for project: ${projectName}`);
Object.entries(envVars).forEach(([key, value]) => {
  console.log(`Setting ${key}...`);
  try {
    execSync(`vercel env add ${key} ${projectName}`, { stdio: 'inherit' });
    console.log(`✅ ${key} set successfully`);
  } catch (error) {
    console.error(`❌ Failed to set ${key}: ${error.message}`);
  }
});

console.log('\nEnvironment variables setup complete!');
console.log('You may need to redeploy your project for the changes to take effect.');
console.log('Run: vercel deploy'); 