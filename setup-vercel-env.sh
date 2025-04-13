#!/bin/bash

# This script helps set up environment variables in Vercel
# Usage: ./setup-vercel-env.sh <project-name>

if [ -z "$1" ]; then
  echo "Usage: ./setup-vercel-env.sh <project-name>"
  exit 1
fi

PROJECT_NAME=$1

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "Vercel CLI is not installed. Installing..."
  npm install -g vercel
fi

# Login to Vercel if not already logged in
vercel whoami &> /dev/null || vercel login

# Pull environment variables from .env.local
if [ -f .env.local ]; then
  echo "Setting up environment variables from .env.local..."
  
  # Read .env.local and set environment variables in Vercel
  while IFS= read -r line; do
    # Skip comments and empty lines
    [[ $line =~ ^#.*$ ]] && continue
    [[ -z $line ]] && continue
    
    # Extract key and value
    key=$(echo "$line" | cut -d '=' -f 1)
    value=$(echo "$line" | cut -d '=' -f 2-)
    
    # Set environment variable in Vercel
    echo "Setting $key..."
    vercel env add $key $PROJECT_NAME
  done < .env.local
  
  echo "Environment variables set up successfully!"
else
  echo ".env.local file not found. Please create it with your environment variables."
  exit 1
fi 