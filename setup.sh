#!/bin/bash

# Modern Portfolio Template Setup Script
# This script sets up a new project with all dependencies and configurations

echo "🚀 Setting up Modern Portfolio Template..."

# Check if project name is provided
if [ -z "$1" ]; then
    echo "❌ Please provide a project name"
    echo "Usage: ./setup.sh my-new-project"
    exit 1
fi

PROJECT_NAME=$1
PROJECT_DIR="/Users/thomasgriggs/Development/$PROJECT_NAME"

echo "📁 Creating project directory: $PROJECT_DIR"

# Create project directory
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# Copy template files
echo "📋 Copying template files..."
cp -r /Users/thomasgriggs/Development/modern-portfolio-template/* "$PROJECT_DIR/"

# Update package.json with project name
echo "📝 Updating package.json..."
sed -i '' "s/modern-portfolio-template/$PROJECT_NAME/g" package.json

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Initialize git repository
echo "🔧 Initializing git repository..."
git init
git add .
git commit -m "Initial commit: Modern Portfolio Template"

echo "✅ Project setup complete!"
echo ""
echo "Next steps:"
echo "1. cd $PROJECT_DIR"
echo "2. npm run dev"
echo "3. Open http://localhost:4321"
echo ""
echo "To add Sanity CMS:"
echo "1. npm install @sanity/client @sanity/image-url"
echo "2. npx @sanity/cli init"
echo "3. Update src/lib/sanity.ts with your project ID"
echo ""
echo "Happy coding! 🎉"
